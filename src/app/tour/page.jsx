import React from "react";
import HeroImage from "@/components/header/HeroImage";
import ToursGrid from "@/components/tour/ToursGrid";
import { getAllPosters } from "@/dao/dao";

export const metadata = {
  title: "Tour",
};

export default async function page() {
  let heroUrl = "/img/posters/mayo23.jpg";

  try {
    const posters = await getAllPosters();
    if (posters.length > 0) {
      heroUrl = posters[0].url;
    }
  } catch {
    // fallback to default
  }

  return (
    <div>
      <HeroImage imageUrl={heroUrl} />
      <ToursGrid />
    </div>
  );
}
