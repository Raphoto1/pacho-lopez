"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

import { AiOutlineSpotify } from "react-icons/ai";
import { SiAmazonmusic } from "react-icons/si";
import { RiSoundcloudLine } from "react-icons/ri";
import { FaDeezer } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

export default function HeroImage({ imageUrl, imageUrls = [] }) {
  const galleryImages = useMemo(() => {
    const source = [
      ...imageUrls.filter((url) => typeof url === "string" && url.trim()),
      typeof imageUrl === "string" ? imageUrl.trim() : "",
    ];

    const unique = Array.from(new Set(source.filter(Boolean)));
    return unique.length > 0 ? unique : ["/img/photos/pacho2.jpg"];
  }, [imageUrl, imageUrls]);

  const [index, setIndex] = useState(0);
  const activeImage = galleryImages[index] || galleryImages[0];

  useEffect(() => {
    setIndex(0);
  }, [galleryImages]);

  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section className='hero min-h-screen relative z-0'>
      <div className='hero-overlay absolute inset-0 overflow-hidden'>
        <img 
          src={activeImage}
          alt='artist' 
          className='w-full h-full object-cover scale-110 blur-lg brightness-50'
        />
        <img
          src={activeImage}
          alt='Poster del tour'
          className='absolute inset-0 w-full h-full object-contain p-4 md:p-10'
        />
      </div>

      {galleryImages.length > 1 && (
        <>
          <button
            type='button'
            onClick={goPrev}
            className='btn btn-circle btn-sm md:btn-md absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 border-none text-white hover:bg-black/70'
            aria-label='Poster anterior'
          >
            ❮
          </button>

          <button
            type='button'
            onClick={goNext}
            className='btn btn-circle btn-sm md:btn-md absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 border-none text-white hover:bg-black/70'
            aria-label='Poster siguiente'
          >
            ❯
          </button>

          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
            {galleryImages.map((_, dotIndex) => (
              <button
                key={`dot-${dotIndex}`}
                type='button'
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 rounded-full transition-all ${dotIndex === index ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
                aria-label={`Ir al poster ${dotIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className='hero-content w-full justify-start relative z-10'>
        <div className='flex flex-col gap-4'>
          <a href='https://open.spotify.com/intl-es/track/4bgvm7beLzAIs8N5tt6mEt?si=32cb193f0a564076' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <AiOutlineSpotify size={25} />
          </a>
          <a href='https://music.amazon.com.mx/tracks/B0CMK45DYK?marketplaceId=A1AM78C64UM0Y8&musicTerritory=MX&ref=dm_sh_Y3f13pVMRr2UjbzeUSnLikQXJ' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <SiAmazonmusic size={25} />
          </a>
          <a href='https://soundcloud.com/pacho-lopez-parra/cumbia-mestiza?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <RiSoundcloudLine size={25} />
          </a>
          <a href='https://link.deezer.com/s/30uaTVbmVKOZwilSUfqyg' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FaDeezer size={25} />
          </a>
          <a href='https://www.youtube.com/@pacholopezoficial' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FiYoutube size={25} />
          </a>
        </div>
      </div>
      <div className='w-20 h-20 absolute end-10 bottom-10 z-10'>
        <a href='https://wa.me/5214731520717?' target='_blank'>
          <img src='/icons/WhatsApp.svg.webp' alt='' />
        </a>
      </div>
    </section>
  );
}
