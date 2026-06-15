import VideoGrid from "@/components/grid/VideoGrid";
import SocialBar from "@/components/bar/SocialBar";
import HeroVideo from "@/components/header/HeroVideo";
import CarouselHalf2 from "@/components/carousel/CarouselHalf2";
import CarouselBanners from "@/components/carousel/CarouselBanners";
import MusicPlayer from "@/components/musicPlayer/MusicPlayer";
import MusicPlayerDisc from "@/components/musicPlayer/MusicPlayerDisc";
import ToursGrid from "@/components/tour/ToursGrid";
import CarouselPhotos from "@/components/carousel/CarouselPhotos";
import { getAllCarouselBanners, getAllCarouselPhotos, getHeroVideo } from "@/dao/dao";

export default async function Home() {
  const heroVideo = await getHeroVideo().catch(() => null);
  const carouselBanners = await getAllCarouselBanners().catch(() => []);
  const carouselPhotos = await getAllCarouselPhotos().catch(() => []);

  const staticBannerImages = [
    { id: "static-1", src: "/img/Banners/B1.png", alt: "Pacho Lopez - Slide 1" },
    { id: "static-2", src: "/img/Banners/B2.png", alt: "Pacho Lopez - Slide 2" },
    { id: "static-3", src: "/img/Banners/B3.png", alt: "Pacho Lopez - Slide 3" },
    { id: "static-4", src: "/img/Banners/B4.png", alt: "Pacho Lopez - Slide 4" },
  ];

  const bannerImages = carouselBanners.map((banner, index) => ({
    id: String(banner._id),
    src: banner.url,
    alt: banner.title || `Pacho Lopez - Banner ${index + 1}`,
  }));

  const resolvedBannerImages = bannerImages.length > 0 ? bannerImages : staticBannerImages;

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
      <CarouselBanners carouselImages={resolvedBannerImages} />
      <MusicPlayer />
      {/* <CarouselHalf2 /> */}
      <VideoGrid />
      <ToursGrid />
      {carouselImages.length > 0 && <CarouselPhotos carouselImages={carouselImages} />}
    </div>
  );
}
