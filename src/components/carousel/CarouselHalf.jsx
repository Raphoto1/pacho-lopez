'use client'
import React, { useState, useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselHalf() {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCenterSlidePercentage(100); // 1 imagen en móvil
      } else {
        setCenterSlidePercentage(50); // 2 imágenes en desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Texto superpuesto */}
      <div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 text-center text-4xl md:text-5xl lg:text-6xl text-yellow-500 drop-shadow-lg"
        style={{ 
          fontFamily: "gandur-new, sans-serif",
          fontWeight: 700,
          fontStyle: "normal",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        P A R C E R O S
      </div>

      {/* Carousel */}
      <div className="w-full max-w-full mx-auto">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          interval={4000}
          transitionTime={600}
          swipeable={true}
          emulateTouch={true}
          showArrows={true}
          dynamicHeight={false}
          stopOnHover={true}
          centerMode={true}
          centerSlidePercentage={centerSlidePercentage}
          className="carousel-container"
        >
          <div>
            <img 
              src="/img/photos/carousel1/photo1.png" 
              alt="Pacho López - Slide 1"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
            />
          </div>
          <div>
            <img 
              src="/img/photos/carousel1/photo2.png" 
              alt="Pacho López - Slide 2"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
            />
          </div>
          <div>
            <img 
              src="/img/photos/carousel1/photo1.png" 
              alt="Pacho López - Slide 3"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
            />
          </div>
          <div>
            <img 
              src="/img/photos/carousel1/photo2.png" 
              alt="Pacho López - Slide 4"
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}
