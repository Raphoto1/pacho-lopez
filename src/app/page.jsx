import Image from "next/image";
import HeroImage from "@/components/header/HeroImage";
import CarouselLong from "@/components/carousel/CarouselLong";
import Carousel3d from "@/components/carousel/Carousel3d";
import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";
import CarouselHalf from "@/components/carousel/CarouselHalf";
import CarouselHalf2 from "@/components/carousel/CarouselHalf2";
import CarouselBanners from "@/components/carousel/CarouselBanners";

export default function Home() {

  return (
    <div>
      <HeroVideo />
      <SocialBar />
      <CarouselBanners />
      <CarouselHalf2 />
      <VideoGrid />
    </div>
  );
}
