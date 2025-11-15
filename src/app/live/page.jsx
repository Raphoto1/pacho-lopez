import React from "react";
import CarouselPhotos from "../../components/carousel/CarouselPhotos.jsx";

export default function page() {
  // Generate array for all 52 photos in carousel3
  const carouselImages = Array.from({ length: 52 }, (_, i) => ({
    id: i,
    src: `/img/photos/carousel3/ph${i}.JPG`,
    alt: `Pacho López Live - Photo ${i + 1}`,
  }));

  return (
    <div>
      <CarouselPhotos carouselImages={carouselImages} />
    </div>
  );
}
