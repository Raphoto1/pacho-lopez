"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

function moveItem(list, fromIndex, toIndex) {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function CarouselPhotosManager() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [localPreviews, setLocalPreviews] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDropzoneActive, setIsDropzoneActive] = useState(false);
  const [draggingId, setDraggingId] = useState("");
  const filesRef = useRef(null);

  const fetchPhotos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/carousel-photos");
      if (!res.ok) throw new Error("No se pudieron cargar las fotos del carousel");

      const data = await res.json();
      setPhotos(data?.photos || []);
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useEffect(() => {
    return () => {
      localPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [localPreviews]);

  useEffect(() => {
    localPreviews.forEach((url) => URL.revokeObjectURL(url));
    const previews = pendingFiles.map((file) => URL.createObjectURL(file));
    setLocalPreviews(previews);
  }, [pendingFiles]);

  const saveOrder = async (orderedPhotos) => {
    setIsSavingOrder(true);
    setFeedback({ type: "", message: "" });

    try {
      const orderedIds = orderedPhotos.map((photo) => String(photo._id));
      const res = await fetch("/api/admin/carousel-photos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo guardar el nuevo orden");

      setFeedback({ type: "success", message: "Orden actualizado" });
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
      await fetchPhotos();
    } finally {
      setIsSavingOrder(false);
    }
  };

  const syncSelectedFiles = (fileList) => {
    const files = Array.from(fileList || []);
    setPendingFiles(files);
  };

  const handleFilesChange = (event) => {
    syncSelectedFiles(event.target.files);
  };

  const handleRemovePreview = (indexToRemove) => {
    setPendingFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const resetInput = () => {
    setPendingFiles([]);
    if (filesRef.current) filesRef.current.value = "";
  };

  const handleDropzoneDrop = (event) => {
    event.preventDefault();
    setIsDropzoneActive(false);
    if (isUploading) return;

    const droppedFiles = event.dataTransfer?.files;
    if (!droppedFiles || droppedFiles.length === 0) return;

    syncSelectedFiles(droppedFiles);
  };

  const handleDropzoneDragOver = (event) => {
    event.preventDefault();
    if (!isDropzoneActive) setIsDropzoneActive(true);
  };

  const handleDropzoneDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setIsDropzoneActive(false);
  };

  const handleBatchUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    setFeedback({ type: "", message: "" });

    try {
      const files = pendingFiles;
      if (files.length === 0) {
        setFeedback({ type: "error", message: "Selecciona al menos una imagen" });
        return;
      }

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("/api/admin/carousel-photos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo cargar el lote");

      setFeedback({ type: "success", message: data?.message || "Lote cargado correctamente" });
      resetInput();
      await fetchPhotos();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragStartPhoto = (event, id) => {
    setDraggingId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOverPhoto = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDropPhoto = async (event, targetId) => {
    event.preventDefault();

    const sourceId = event.dataTransfer.getData("text/plain") || draggingId;
    setDraggingId("");
    if (!sourceId || sourceId === targetId) return;

    const fromIndex = photos.findIndex((photo) => String(photo._id) === sourceId);
    const toIndex = photos.findIndex((photo) => String(photo._id) === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const reordered = moveItem(photos, fromIndex, toIndex);
    setPhotos(reordered);
    await saveOrder(reordered);
  };

  const handleDragEndPhoto = () => {
    setDraggingId("");
  };

  const handleDeleteOne = async (id) => {
    if (!window.confirm("¿Eliminar esta imagen del carousel?")) return;

    setFeedback({ type: "", message: "" });
    try {
      const res = await fetch(`/api/admin/carousel-photos?id=${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo eliminar la imagen");

      setFeedback({ type: "success", message: "Imagen eliminada" });
      await fetchPhotos();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("¿Eliminar todas las imagenes del carousel?")) return;

    setFeedback({ type: "", message: "" });
    try {
      const res = await fetch("/api/admin/carousel-photos?all=true", { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudieron eliminar las imagenes");

      setFeedback({ type: "success", message: "Carousel vaciado" });
      await fetchPhotos();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  const hasPhotos = photos.length > 0;
  const previewCount = localPreviews.length;

  return (
    <div className="mt-8 rounded-2xl border border-base-content/20 bg-base-100/70 p-6 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4">Carousel de Fotos (Batch)</h2>

      {feedback.message && (
        <p className={`mb-4 text-sm ${feedback.type === "error" ? "text-error" : "text-success"}`}>
          {feedback.message}
        </p>
      )}

      <form onSubmit={handleBatchUpload} className="max-w-2xl flex flex-col gap-4 mb-8">
        <div
          className={`rounded-xl border-2 border-dashed p-4 transition ${
            isDropzoneActive ? "border-primary bg-primary/10" : "border-base-content/30"
          }`}
          onDragOver={handleDropzoneDragOver}
          onDragLeave={handleDropzoneDragLeave}
          onDrop={handleDropzoneDrop}
        >
          <label className="form-control cursor-pointer">
            <span className="label-text mb-2">Subir lote de imagenes</span>
            <input
              ref={filesRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="file-input file-input-bordered w-full"
              onChange={handleFilesChange}
            />
            <span className="label-text-alt mt-1 text-base-content/50">
              Arrastra y suelta imagenes aqui o usa el selector. Hasta 30 imagenes por lote.
            </span>
          </label>
        </div>

        {previewCount > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-base-content/70">Vista previa del lote: {previewCount} imagen(es).</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {localPreviews.map((previewUrl, index) => (
                <div
                  key={`${previewUrl}-${index}`}
                  className="relative aspect-video overflow-hidden rounded-md border border-base-content/20 bg-black/70"
                >
                  <Image
                    src={previewUrl}
                    alt={`Preview ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="120px"
                  />
                  <button
                    type="button"
                    className="btn btn-xs btn-circle btn-error absolute top-1 right-1"
                    onClick={() => handleRemovePreview(index)}
                    disabled={isUploading}
                    aria-label={`Eliminar preview ${index + 1}`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={isUploading}>
            {isUploading ? "Cargando lote..." : "Subir batch"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={resetInput} disabled={isUploading}>
            Limpiar
          </button>
          <button
            type="button"
            className="btn btn-outline btn-error ml-auto"
            onClick={handleDeleteAll}
            disabled={!hasPhotos || isUploading}
          >
            Vaciar carousel
          </button>
        </div>

        {isSavingOrder && <p className="text-sm text-base-content/60">Guardando nuevo orden...</p>}
      </form>

      <div className="collapse collapse-arrow rounded-xl border border-base-content/20 bg-base-100/60">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium flex items-center justify-between gap-3">
          <span>Imagenes activas ({photos.length})</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 opacity-70"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <div className="collapse-content">
          {isLoading ? (
            <p className="text-sm text-base-content/60">Cargando...</p>
          ) : !hasPhotos ? (
            <p className="text-sm text-base-content/60 italic">No hay imagenes cargadas en el carousel.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <div
                  key={String(photo._id)}
                  draggable
                  onDragStart={(event) => handleDragStartPhoto(event, String(photo._id))}
                  onDragOver={handleDragOverPhoto}
                  onDrop={(event) => handleDropPhoto(event, String(photo._id))}
                  onDragEnd={handleDragEndPhoto}
                  className={`rounded-xl border bg-base-200/50 p-3 cursor-move transition ${
                    draggingId === String(photo._id)
                      ? "border-primary shadow-lg opacity-70"
                      : "border-base-content/20"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-base-content/20 bg-black/70">
                    <Image
                      src={photo.url}
                      alt={photo.title || `Carousel photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs text-base-content/60 mt-2 truncate">#{index + 1}</p>
                  <p className="text-[11px] text-base-content/50">Arrastra para reordenar</p>
                  <button
                    type="button"
                    className="btn btn-xs btn-error btn-outline mt-2"
                    onClick={() => handleDeleteOne(String(photo._id))}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
