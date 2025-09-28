'use client';
import { useEffect, useState } from 'react';

const slides = [
  { id: 1, image: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp', text: 'La cumbia mestiza en vivo y músicos invitados' },
  { id: 2, image: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp', text: 'Texto del Slide 2' },
  { id: 3, image: 'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp', text: 'Texto del Slide 3' },
];

export default function CarouselLong() {
 const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="carousel w-full relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item w-full transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0 absolute'
            }`}
          >
            <div className="relative w-full h-[200px] sm:h-[200px] md:h-[400px]">
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0  flex items-center justify-end">
                <h2 className="text-white text-2xl font-bold text-center px-5 uppercase">{slide.text}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="relative bottom-10 left-1/2 flex gap-2 z-20 overflow-hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`btn btn-xs rounded-full w-4 h-4 border-1 border-white ${
              index === activeIndex ? 'bg-white' : 'bg-base-300'
            }`}
          />
        ))}
      </div>
    </div>
  );

}
