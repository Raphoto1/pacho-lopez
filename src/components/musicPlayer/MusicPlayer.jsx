import React from "react";

export default function MusicPlayer() {
  return (
    <div className="p-4">

      <iframe
        data-testid='embed-iframe'
        style={{ borderRadius: "12px" }}
        src='https://open.spotify.com/embed/artist/5nIBG9wi2DrNHj2Oxu2EZ7?utm_source=generator&theme=0'
        width='100%'
        height='152'
        frameBorder='0'
        allowFullScreen
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'></iframe>
    </div>
  );
}
