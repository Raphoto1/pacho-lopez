'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselPhotos({ carouselImages }) {
  return (
    <div className="relative w-screen h-screen">
      {/* Carousel */}
      <div className="w-full h-full">
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
          dynamicHeight={true}
          stopOnHover={true}
          centerMode={false}
          className="carousel-container"
        >
          {carouselImages.map((image) => (
            <div key={image.id} className='h-screen flex items-center justify-center bg-black'>
              <img 
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
