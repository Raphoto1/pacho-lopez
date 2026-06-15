import { NextResponse } from "next/server";
import {
  createCarouselPhotosBatch,
  deleteCarouselPhoto,
  getAllCarouselPhotos,
  popAllCarouselPhotos,
  updateCarouselPhotosOrder,
} from "@/dao/dao";
import { uploadToBlob, deleteFromBlob, BLOB_FOLDERS } from "@/utils/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB per image
const MAX_BATCH = 52;

export async function GET() {
  try {
    const photos = await getAllCarouselPhotos();
    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    console.error("Error getting carousel photos:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files").filter((file) => file && typeof file !== "string");

    if (files.length === 0) {
      return NextResponse.json({ message: "Selecciona al menos una imagen" }, { status: 400 });
    }

    if (files.length > MAX_BATCH) {
      return NextResponse.json(
        { message: `El lote excede el maximo permitido de ${MAX_BATCH} imagenes` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { message: "Formato no permitido. Solo JPG, PNG, WebP o GIF." },
          { status: 400 }
        );
      }

      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { message: "Archivo muy grande. El tamano maximo permitido por imagen es 10 MB." },
          { status: 400 }
        );
      }
    }

    const batchId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const uploaded = await Promise.all(
      files.map(async (file, index) => {
        const safeName = `${Date.now()}-${index}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

        const blob = await uploadToBlob(BLOB_FOLDERS.photos, safeName, file.stream(), {
          contentType: file.type,
        });

        return {
          filename: safeName,
          url: blob.url,
          batchId,
          position: index,
        };
      })
    );

    const result = await createCarouselPhotosBatch(uploaded);

    return NextResponse.json(
      {
        message: `${uploaded.length} imagen(es) agregadas al carousel`,
        insertedCount: result.insertedCount,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading carousel photos batch:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const clearAll = searchParams.get("all") === "true";

    if (clearAll) {
      const photos = await popAllCarouselPhotos();
      await Promise.allSettled(photos.map((photo) => deleteFromBlob(photo.url)));

      return NextResponse.json(
        { message: "Se eliminaron todas las imagenes del carousel" },
        { status: 200 }
      );
    }

    if (!id) {
      return NextResponse.json({ message: "id es requerido" }, { status: 400 });
    }

    const photo = await deleteCarouselPhoto(id);
    if (!photo) {
      return NextResponse.json({ message: "Imagen no encontrada" }, { status: 404 });
    }

    await deleteFromBlob(photo.url);

    return NextResponse.json({ message: "Imagen eliminada" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting carousel photo:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const orderedIds = body?.orderedIds;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ message: "orderedIds es requerido" }, { status: 400 });
    }

    await updateCarouselPhotosOrder(orderedIds);

    return NextResponse.json({ message: "Orden del carousel actualizado" }, { status: 200 });
  } catch (error) {
    console.error("Error updating carousel order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
