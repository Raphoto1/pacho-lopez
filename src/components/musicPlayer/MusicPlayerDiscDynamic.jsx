import React from "react";

export default function MusicPlayerDiscDynamic(url) {
  return (
    <div className='p-4 w-full'>
      <iframe
        data-testid='embed-iframe'
        style={{ borderRadius: "12px" }}
        src={url.url}
        width='100%'
        height='352'
        frameBorder='0'
        allowFullScreen
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'></iframe>
    </div>
  );
}
