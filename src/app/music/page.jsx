import React from "react";
import HeroImage from "@/components/header/HeroImage";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
export default function page() {
  return (
    <div>
      <HeroImage />
      <MusicPlayer />
      <MusicPlayerDisc />
    </div>
  );
}
