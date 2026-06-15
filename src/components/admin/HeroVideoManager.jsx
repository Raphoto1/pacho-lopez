"use client";

import { useCallback, useEffect, useState } from "react";

function buildYoutubeEmbedUrl(urlString) {
  if (!urlString) return null;

  try {
    const url = new URL(urlString);
    const host = url.hostname.replace("www.", "").toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") || "";
      } else if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/")) {
        const parts = url.pathname.split("/").filter(Boolean);
        videoId = parts[1] || "";
      }
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  } catch {
    return null;
  }
}

export default function HeroVideoManager() {
  const [heroVideo, setHeroVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const fetchHeroVideo = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/hero-video");
      if (!res.ok) throw new Error("No se pudo cargar el video del hero");

      const data = await res.json();
      const current = data?.heroVideo || null;
      setHeroVideo(current);
      setVideoUrl(current?.url || "");
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeroVideo();
  }, [fetchHeroVideo]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/admin/hero-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl.trim() }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo guardar el video");

      setFeedback({ type: "success", message: "Video del hero guardado correctamente" });
      await fetchHeroVideo();
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar el video del hero?")) return;

    setIsSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/admin/hero-video", { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "No se pudo eliminar el video");

      setFeedback({ type: "success", message: "Video del hero eliminado" });
      setHeroVideo(null);
      setVideoUrl("");
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const embedUrl = buildYoutubeEmbedUrl(heroVideo?.url);

  return (
    <div className="mt-8 rounded-2xl border border-base-content/20 bg-base-100/70 p-6 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-semibold mb-4">Hero Video (YouTube)</h2>

      {feedback.message && (
        <p className={`mb-4 text-sm ${feedback.type === "error" ? "text-error" : "text-success"}`}>
          {feedback.message}
        </p>
      )}

      {isLoading ? (
        <p className="text-sm text-base-content/60">Cargando...</p>
      ) : (
        <>
          <form onSubmit={handleSave} className="flex flex-col gap-4 max-w-2xl">
            <label className="form-control">
              <span className="label-text mb-2">URL de YouTube</span>
              <input
                type="url"
                className="input input-bordered w-full"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              <span className="label-text-alt mt-1 text-base-content/50">
                Acepta links de watch, youtu.be, embed y shorts.
              </span>
            </label>

            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar video"}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-error"
                onClick={handleDelete}
                disabled={isSaving || !heroVideo}
              >
                Eliminar
              </button>
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Video activo</h3>
            {!heroVideo ? (
              <p className="text-sm text-base-content/60 italic">No hay video configurado.</p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm break-all">
                  <span className="text-base-content/60">URL:</span>{" "}
                  <a href={heroVideo.url} target="_blank" rel="noopener noreferrer" className="link link-primary">
                    {heroVideo.url}
                  </a>
                </p>

                {embedUrl && (
                  <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-base-content/20">
                    <iframe
                      className="w-full h-full"
                      src={embedUrl}
                      title="Preview Hero Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
