import { NextResponse } from "next/server";
import { uploadToBlob, BLOB_FOLDERS } from "@/utils/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);

    if (Number.isFinite(contentLength) && contentLength > MAX_SIZE + 1024 * 1024) {
      return NextResponse.json(
        { message: "Archivo muy grande. El tamano maximo permitido es 10 MB." },
        { status: 413 }
      );
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { message: "No se pudo procesar el archivo. Verifica el archivo enviado." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const folder = formData.get("folder") || "admin";

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Se requiere un archivo" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Formato no permitido. Solo JPG, PNG, WebP o GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "Archivo muy grande. El tamano maximo permitido es 10 MB." },
        { status: 400 }
      );
    }

    const validFolder = BLOB_FOLDERS[folder] ?? BLOB_FOLDERS.admin;
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const blob = await uploadToBlob(validFolder, safeName, file.stream(), {
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
