'use client'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselBanners() {
  const carouselImages = [
    {
      id: 1,
      src: "/img/Banners/B1.png",
      alt: "Pacho López - Slide 1"
    },
    {
      id: 2,
      src: "/img/Banners/B2.png",
      alt: "Pacho López - Slide 2"
    },
    {
      id: 3,
      src: "/img/Banners/B3.png",
      alt: "Pacho López - Slide 3"
    },
    {
      id: 4,
      src: "/img/Banners/B4.png",
      alt: "Pacho López - Slide 4"
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
          centerMode={false}
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
