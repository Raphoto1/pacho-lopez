import React from "react";
import HeroImage from "@/components/header/HeroImage";
import ToursGrid from "@/components/tour/ToursGrid";

export const metadata = {
  title: "Tour",
};

export default function page() {
  return (
    <div>
      <HeroImage imageUrl='/img/posters/poster nuevo.jpg' />
      <ToursGrid />
    </div>
  );
}
