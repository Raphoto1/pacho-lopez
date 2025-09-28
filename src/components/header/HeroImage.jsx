import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

export default function HeroImage() {
  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className='hero-overlay'>
        <iframe
          className='w-full h-[100vh]'
          width='560'
          height='315'
          src='https://www.youtube.com/embed/moYxfggIQkc?si=R2RopSEHjoCW57W-&autoplay=1&mute=1&loop=1'
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen></iframe>
      </div>
      <div className='hero-content w-full justify-start'>
        <div className='flex flex-col gap-4'>
          <a href='https://www.youtube.com/' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FaXTwitter size={30} />
          </a>
          <a href='https://www.youtube.com/' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FaPinterestP size={30} />
          </a>
          <a href='https://www.youtube.com/' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FaTiktok size={30} />
          </a>
        </div>
      </div>
          <div className='w-20 h-20 absolute end-10 bottom-10'>
              <a href='https://wa.me/1XXXXXXXXXX?' target='_blank'>
                <img src="/icons/WhatsApp.svg.webp" alt="" />
              </a>
        </div>
    </div>
  );
}
