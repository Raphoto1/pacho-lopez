import React from "react";
import Carousel2 from "../../components/carousel/CarouselHalf2.jsx";
import { useTranslations } from 'next-intl';
export default function page() {
  const t = useTranslations('ShopPage');
  return (
    <div>
      <div className='flex flex-col md:w-full h-screen justify-center items-center gap-4 px-4 align-middle'>
        <h1 className='title text-4xl mt-12'>{t('title')}</h1>

       <Carousel2 />
      </div>
      <div className='bottom-10 w-20 fixed right-10 flex flex-col gap-4'>
        <a href='https://wa.me/5214731520717?' target='_blank'>
          <img src='/icons/WhatsApp.svg.webp' alt='' />
        </a>
      </div>
    </div>
  );
}
