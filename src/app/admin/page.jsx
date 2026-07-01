import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import SignOutButton from "@/components/auth/SignOutButton";
import EventManager from "@/components/admin/EventManager";
import PosterTourManager from "@/components/admin/PosterTourManager";
import HeroVideoManager from "@/components/admin/HeroVideoManager";
import CarouselPhotosManager from "@/components/admin/CarouselPhotosManager";
import CarouselBannersManager from "@/components/admin/CarouselBannersManager";
import NewsLetterList from "@/components/admin/NewsLetterList";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <section className='container mx-auto px-4 py-20'>
      <div className='grid mb-6 grid-cols-1 md:grid-cols-2 md:items-center md:justify-between'>
        <div className='max-w-xl rounded-2xl border border-base-content/20 bg-base-100/70 p-8 shadow-lg backdrop-blur'>
          <h1 className='text-3xl font-bold mb-2'>Panel de administración</h1>
          <p className='mb-6'>Sesión iniciada como {session.user.name}</p>
          <SignOutButton />
        </div>
        <NewsLetterList />
      </div>
      <HeroVideoManager />
      <CarouselBannersManager />
      <CarouselPhotosManager />
      <EventManager />
      <PosterTourManager />
    </section>
  );
}
