import React from "react";

export default function MusicPlayerDisc() {
  return (
    <div className='p-4'>
      <iframe
        data-testid='embed-iframe'
        style={{ borderRadius: "12px" }}
        src='https://open.spotify.com/embed/album/3slO3uTViaxwHzbcAJhRqu?utm_source=generator'
        width='100%'
        height='352'
        frameBorder='0'
        allowFullScreen
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'></iframe>
    </div>
  );
}
