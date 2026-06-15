import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";
import CarouselHalf2 from "@/components/carousel/CarouselHalf2";
import CarouselBanners from "@/components/carousel/CarouselBanners";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
import ToursGrid from "@/components/tour/ToursGrid";
import CarouselPhotos from "@/components/carousel/CarouselPhotos";
import { getHeroVideo } from "@/dao/dao";

export default async function Home() {
  const heroVideo = await getHeroVideo().catch(() => null);

  // Generate array for all 52 photos in carousel3
  const carouselImages = Array.from({ length: 52 }, (_, i) => ({
    id: i,
    src: `/img/photos/carousel3/ph${i}.JPG`,
    alt: `Pacho López Live - Photo ${i + 1}`,
  }));

  return (
    <div>
      <HeroVideo youtubeUrl={heroVideo?.url} />
      <SocialBar />
      <MusicPlayerDisc />
      <CarouselBanners />
      <MusicPlayer />
      {/* <CarouselHalf2 /> */}
      <VideoGrid />
      <ToursGrid />
      <CarouselPhotos carouselImages={carouselImages} />
    </div>
  );
}
