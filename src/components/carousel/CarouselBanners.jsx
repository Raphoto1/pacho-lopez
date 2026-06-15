'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselBanners({ carouselImages }) {
  if (!Array.isArray(carouselImages) || carouselImages.length === 0) {
    return null;
  }

  return (
    <div className="relative">
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
          centerMode={false}
          className="carousel-container"
        >
          {carouselImages.map((image, index) => (
            <div key={image.id || image.src || index}>
              <img 
                src={image.src}
                alt={image.alt || `Pacho Lopez - Banner ${index + 1}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
