import React from "react";
import HeroImage from "@/components/header/HeroImage";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
import Disc from "@/components/discography/Disc";
import HeroImageDynamic from "@/components/header/HeroImageDynamic";
export default function page() {
  return (
    <div>
      <HeroImageDynamic imageUrl={'/img/disc/parceros.jpg'}/>
      <MusicPlayer />
      {/* <MusicPlayerDisc /> */}
      <div>
        <div>
          <h1 className="text-4xl text-center">Discografia</h1>
        </div>
        <Disc
          title='Parceros'
          year='2025'
          frontImage='/img/disc/parceros.jpg'
          backImage='/img/disc/parceros-back.jpg'
          url='https://open.spotify.com/embed/album/3slO3uTViaxwHzbcAJhRqu?utm_source=generator'
        />
      </div>
    </div>
  );
}
