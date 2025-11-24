"use client";
import React from "react";
import HeroImage from "@/components/header/HeroImage";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
import Disc from "@/components/discography/Disc";
import HeroImageDynamic from "@/components/header/HeroImageDynamic";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Music");
  return (
    <div>
      <HeroImageDynamic imageUrl={"/img/disc/parceros.jpg"} />
      <MusicPlayer />
      {/* <MusicPlayerDisc /> */}
      <div>
        <div>
          <h1 className='text-4xl text-center'>{t("discography")}</h1>
        </div>
        <Disc
          title='Parceros'
          year='2025'
          frontImage='/img/disc/parceros.jpg'
          backImage='/img/disc/parceros-back.jpg'
          url='https://open.spotify.com/embed/album/3slO3uTViaxwHzbcAJhRqu?utm_source=generator'
        />
         <Disc title='Rayo de luz - La voz del Alma' year='2015' frontImage='/img/disc/rayo.jpg' backImage='/img/disc/rayo-back.jpg' />
        <Disc title='República Independiente de la Alegría' year='2013' frontImage='/img/disc/republica.jpg' backImage='/img/disc/republica-back.jpg' />
      </div>
    </div>
  );
}
