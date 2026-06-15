import React from "react";
import CarouselPhotos from "../../components/carousel/CarouselPhotos.jsx";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import { getAllCarouselPhotos } from "@/dao/dao";

export const metadata = {
  title: "Live",
};

export default async function page() {
  const carouselPhotos = await getAllCarouselPhotos().catch(() => []);

  const carouselImages = carouselPhotos.map((photo, index) => ({
    id: String(photo._id),
    src: photo.url,
    alt: photo.title || `Pacho Lopez Live - Photo ${index + 1}`,
  }));

  return (
    <div>
      {carouselImages.length > 0 && <CarouselPhotos carouselImages={carouselImages} />}
      <MusicPlayer />
    </div>
  );
}
