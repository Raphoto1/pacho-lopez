import Image from "next/image";
import HeroImage from "@/components/header/HeroImage";
import CarouselLong from "@/components/carousel/CarouselLong";
import Carousel3d from "@/components/carousel/Carousel3d";
import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";

export default function Home() {
  return (
    <div>
      <HeroImage />
      <SocialBar />
      <CarouselLong />
            <HeroVideo />
      <Carousel3d />
      <VideoGrid />
    </div>
  );
}
