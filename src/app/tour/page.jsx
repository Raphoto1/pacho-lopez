import React from "react";
import HeroImage from "@/components/header/HeroImage";
import ToursGrid from "@/components/tour/ToursGrid";
import { getAllEventDates } from "@/dao/dao";

export const metadata = {
  title: "Tour",
};

export default async function page() {
  let heroUrl = "/img/posters/mayo23.jpg";
  let heroGallery = [];

  try {
    const eventDates = await getAllEventDates();
    heroGallery = Array.from(
      new Set(
        eventDates
          .map((eventDate) => eventDate?.cartel)
          .filter((url) => typeof url === "string" && url.trim())
      )
    );

    if (heroGallery.length > 0) {
      heroUrl = heroGallery[0];
    }
  } catch {
    // fallback to default
  }

  return (
    <div>
      <HeroImage imageUrl={heroUrl} imageUrls={heroGallery} />
      <ToursGrid />
    </div>
  );
}
