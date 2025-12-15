'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselHalf() {
  const carouselImages = [
    {
      id: 1,
      src: "/img/photos/carousel2/photo1.png",
      alt: "Pacho López - Slide 1"
    },
    {
      id: 2,
      src: "/img/photos/carousel2/photo2.png", 
      alt: "Pacho López - Slide 2"
    },
    {
      id: 3,
      src: "/img/photos/carousel2/photo3.png",
      alt: "Pacho López - Slide 3"
    },

  ];

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
          centerMode={true}
          centerSlidePercentage={50}
          className="carousel-container"
        >
          {carouselImages.map((image) => (
            <div key={image.id}>
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg mx-2"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
