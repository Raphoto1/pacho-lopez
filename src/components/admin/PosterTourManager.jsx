"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PosterTourManager() {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [mode, setMode] = useState("file"); // "file" | "link"
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const fetchPosters = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/posters");
      if (!res.ok) throw new Error("No se pudieron cargar los posters");
      const data = await res.json();
      setPosters(data?.posters || []);
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosters();
  }, [fetchPosters]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setTitle("");
    setLinkUrl("");
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setFeedback({ type: "", message: "" });

    try {
      let res;

      if (mode === "link") {
        if (!linkUrl.trim()) {
          setFeedback({ type: "error", message: "Ingresa una URL" });
          return;
        }
        res = await fetch("/api/admin/posters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: linkUrl.trim(), title: title.trim() }),
        });
      } else {
        const file = fileRef.current?.files?.[0];
        if (!file) {
          setFeedback({ type: "error", message: "Selecciona una imagen" });
          return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title.trim());
        res = await fetch("/api/admin/posters", { method: "POST", body: formData });
      }

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Error al guardar el poster");

      setFeedback({ type: "success", message: "Poster guardado correctamente" });
      resetForm();
      await fetchPosters();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este poster?")) return;
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch(`/api/admin/posters?id=${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Error al eliminar el poster");

      setFeedback({ type: "success", message: "Poster eliminado" });
      await fetchPosters();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-base-content/20 bg-base-100/70 p-6 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4">Posters de Conciertos</h2>

      {feedback.message && (
        <p className={`mb-4 text-sm ${feedback.type === "error" ? "text-error" : "text-success"}`}>
          {feedback.message}
        </p>
      )}

      {/* Specs + reference */}
      <div className="flex flex-wrap gap-6 mb-8 items-start">
        {/* Vertical */}
        <div className="rounded-xl border border-base-content/20 bg-base-200 p-4 text-sm space-y-1 min-w-48">
          <p className="font-semibold mb-2">Poster vertical</p>
          <p><span className="text-base-content/60">Dimensiones:</span> <strong>1035 × 1600 px</strong></p>
          <p><span className="text-base-content/60">Proporción:</span> <strong>2:3</strong></p>
          <p><span className="text-base-content/60">Formatos:</span> JPG, PNG, WebP</p>
          <p><span className="text-base-content/60">Peso máximo:</span> 10 MB</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-base-content/60">Referencia vertical</p>
          <div className="relative w-28 h-44 rounded-lg overflow-hidden border border-base-content/20 shadow">
            <Image
              src="/img/posters/poster.jpg"
              alt="Poster vertical de referencia"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <p className="text-xs text-base-content/40">poster.jpg · 1035×1600</p>
        </div>

        <div className="w-px self-stretch bg-base-content/10 hidden sm:block" />

        {/* Horizontal */}
        <div className="rounded-xl border border-base-content/20 bg-base-200 p-4 text-sm space-y-1 min-w-48">
          <p className="font-semibold mb-2">Poster horizontal</p>
          <p><span className="text-base-content/60">Dimensiones:</span> <strong>1920 × 1080 px</strong></p>
          <p><span className="text-base-content/60">Proporción:</span> <strong>16:9</strong></p>
          <p><span className="text-base-content/60">Formatos:</span> JPG, PNG, WebP</p>
          <p><span className="text-base-content/60">Peso máximo:</span> 10 MB</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-base-content/60">Referencia horizontal</p>
          <div className="relative w-44 h-24 rounded-lg overflow-hidden border border-base-content/20 shadow">
            <Image
              src="/img/posters/posterWide.png"
              alt="Poster horizontal de referencia"
              fill
              className="object-cover"
              sizes="176px"
            />
          </div>
          <p className="text-xs text-base-content/40">posterWide.png · 1920×1080</p>
        </div>
      </div>

      {/* Current active poster */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Poster activo</h3>
        {isLoading ? (
          <p className="text-sm text-base-content/60">Cargando...</p>
        ) : posters.length === 0 ? (
          <p className="text-sm text-base-content/60 italic">No hay poster activo. Sube uno a continuación.</p>
        ) : (
          <div className="flex flex-wrap gap-6 items-start">
            <div className="relative w-40 h-56 rounded-xl overflow-hidden border-2 border-primary shadow-lg shrink-0">
              <Image
                src={posters[0].url}
                alt={posters[0].title || "Poster activo"}
                fill
                className="object-cover"
                sizes="160px"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-content text-xs text-center py-1 font-semibold">
                Activo
              </span>
            </div>
            <div className="text-sm space-y-1 self-center">
              {posters[0].title && <p><span className="text-base-content/60">Título:</span> <strong>{posters[0].title}</strong></p>}
              <p><span className="text-base-content/60">URL:</span>{" "}
                <a href={posters[0].url} target="_blank" rel="noopener noreferrer" className="link link-primary break-all">
                  {posters[0].url}
                </a>
              </p>
              <p className="text-base-content/50 text-xs pt-1">Al subir un nuevo poster este será reemplazado automáticamente.</p>
              <button
                type="button"
                className="btn btn-xs btn-error btn-outline mt-2"
                onClick={() => handleDelete(String(posters[0]._id))}
              >
                Eliminar poster actual
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload form */}
      <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-8 max-w-md">
        {/* Mode toggle */}
        <div className="tabs tabs-box w-fit">
          <button
            type="button"
            className={`tab ${mode === "file" ? "tab-active" : ""}`}
            onClick={() => { setMode("file"); resetForm(); }}
          >
            Subir archivo
          </button>
          <button
            type="button"
            className={`tab ${mode === "link" ? "tab-active" : ""}`}
            onClick={() => { setMode("link"); resetForm(); }}
          >
            Solo link
          </button>
        </div>

        <label className="form-control">
          <span className="label-text mb-2">Título (opcional)</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Festival de Verano 2026"
          />
        </label>

        {mode === "file" ? (
          <>
            <label className="form-control">
              <span className="label-text mb-2">Imagen del poster</span>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
            </label>

            {preview && (
              <div className="relative w-40 h-56 rounded-lg overflow-hidden border border-base-content/20">
                <Image src={preview} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </>
        ) : (
          <label className="form-control">
            <span className="label-text mb-2">URL del poster</span>
            <input
              type="url"
              className="input input-bordered w-full"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              required
            />
            <span className="label-text-alt mt-1 text-base-content/50">Enlace externo o de otra fuente</span>
          </label>
        )}

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary" disabled={isUploading}>
            {isUploading ? "Guardando..." : mode === "file" ? "Subir poster" : "Guardar link"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={resetForm} disabled={isUploading}>
            Limpiar
          </button>
        </div>
      </form>

    </div>
  );
}

