"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
export default function Carousel3d() {
  const images = [
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
    "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
    "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = 320; // Ajusta según el ancho de tus ítems
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        if (carouselRef.current.scrollLeft >= maxScroll - scrollAmount) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
<div className="flex justify-center">
      <div className='w-3/4 flex justify-center relative'>
        {/* Flecha izquierda */}
        <button onClick={scrollLeft} className='absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle z-10'>
          ❮
        </button>
  
        {/* Carrusel horizontal */}
        <div ref={carouselRef} className='carousel carousel-center rounded-box w-full space-x-4 px-4 py-6 overflow-x-auto scroll-smooth'>
          {images.map((src, index) => (
            <div key={index} className='carousel-item flex-shrink-0'>
              <img src={src} alt={`Slide ${index + 1}`} className='rounded-box rounded-2xl w-[300px] h-[300px] object-cover' />
            </div>
          ))}
        </div>
  
        {/* Flecha derecha */}
        <button onClick={scrollRight} className='absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle z-10'>
          ❯
        </button>
      </div>
</div>
  );
}
