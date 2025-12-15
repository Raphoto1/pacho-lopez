
import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";
import CarouselHalf2 from "@/components/carousel/CarouselHalf2";
import CarouselBanners from "@/components/carousel/CarouselBanners";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
export default function Home() {

  return (
    <div>
      <HeroVideo />
      <SocialBar />
      <MusicPlayerDisc />
      <CarouselBanners />
      <MusicPlayer />
      <CarouselHalf2 />
      <VideoGrid />
    </div>
  );
}
