import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";
import CarouselHalf2 from "@/components/carousel/CarouselHalf2";
import CarouselBanners from "@/components/carousel/CarouselBanners";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
import ToursGrid from "@/components/tour/ToursGrid";
import CarouselPhotos from "@/components/carousel/CarouselPhotos";
import { getAllCarouselPhotos, getHeroVideo } from "@/dao/dao";

export default async function Home() {
  const heroVideo = await getHeroVideo().catch(() => null);
  const carouselPhotos = await getAllCarouselPhotos().catch(() => []);

  const carouselImages = carouselPhotos.map((photo, index) => ({
    id: String(photo._id),
    src: photo.url,
    alt: photo.title || `Pacho Lopez Live - Photo ${index + 1}`,
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
      {carouselImages.length > 0 && <CarouselPhotos carouselImages={carouselImages} />}
    </div>
  );
}
