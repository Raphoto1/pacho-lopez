import { NextResponse } from "next/server";
import { createPoster, deletePoster, getAllPosters, popAllPosters } from "@/dao/dao";
import { uploadToBlob, deleteFromBlob, BLOB_FOLDERS } from "@/utils/blob";

// Delete all previous posters from Blob (only those uploaded to Blob, not external links)
async function purgePreviousPosters() {
  const previous = await popAllPosters();
  await Promise.allSettled(
    previous
      .filter((p) => p.filename) // skip link-only entries
      .map((p) => deleteFromBlob(p.url))
  );
}

export async function GET() {
  try {
    const posters = await getAllPosters();
    return NextResponse.json({ posters }, { status: 200 });
  } catch (error) {
    console.error("Error getting posters:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // ── Link-only mode ──────────────────────────────────────────
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { url, title = "" } = body;

      if (!url || typeof url !== "string") {
        return NextResponse.json({ message: "Se requiere una URL" }, { status: 400 });
      }

      try {
        new URL(url);
      } catch {
        return NextResponse.json({ message: "La URL no es válida" }, { status: 400 });
      }

      await purgePreviousPosters();
      const result = await createPoster({ filename: "", url, title });
      return NextResponse.json(
        { message: "Poster guardado", id: result.insertedId, url },
        { status: 201 }
      );
    }

    // ── File upload mode ────────────────────────────────────────
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title") || "";

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Se requiere un archivo" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Formato no permitido. Solo JPG, PNG, WebP o GIF." },
        { status: 400 }
      );
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { message: "Archivo muy grande. El tamano maximo permitido es 10 MB." },
        { status: 400 }
      );
    }

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const blob = await uploadToBlob(BLOB_FOLDERS.posters, safeName, file.stream(), {
      contentType: file.type,
    });

    await purgePreviousPosters();

    const result = await createPoster({
      filename: safeName,
      url: blob.url,
      title,
    });

    return NextResponse.json(
      { message: "Poster subido", id: result.insertedId, url: blob.url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading poster:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "id es requerido" }, { status: 400 });
    }

    const poster = await deletePoster(id);

    if (!poster) {
      return NextResponse.json({ message: "Poster no encontrado" }, { status: 404 });
    }

    await deleteFromBlob(poster.url);

    return NextResponse.json({ message: "Poster eliminado" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting poster:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
