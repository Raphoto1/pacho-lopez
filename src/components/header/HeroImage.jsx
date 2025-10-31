import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

import { AiOutlineSpotify } from "react-icons/ai";
import { SiAmazonmusic } from "react-icons/si";
import { RiSoundcloudLine } from "react-icons/ri";
import { FaDeezer } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

export default function HeroImage({ imageUrl }) {
  return (
    <section className='hero min-h-screen relative z-0'>
      <div className='hero-overlay absolute inset-0'>
        <img 
          src={imageUrl || '/img/photos/pacho2.jpg'}
          alt='artist' 
          className="w-full h-full object-cover"
        />
      </div>
      <div className='hero-content w-full justify-start relative z-10'>
        <div className='flex flex-col gap-4'>
          <a href='https://open.spotify.com/intl-es/track/4bgvm7beLzAIs8N5tt6mEt?si=32cb193f0a564076' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <AiOutlineSpotify size={25} />
          </a>
          <a href='https://music.amazon.com.mx/tracks/B0CMK45DYK?marketplaceId=A1AM78C64UM0Y8&musicTerritory=MX&ref=dm_sh_Y3f13pVMRr2UjbzeUSnLikQXJ' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <SiAmazonmusic size={25} />
          </a>
          <a href='https://soundcloud.com/pacho-lopez-parra/cumbia-mestiza?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <RiSoundcloudLine size={25} />
          </a>
          <a href='https://link.deezer.com/s/30uaTVbmVKOZwilSUfqyg' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FaDeezer size={25} />
          </a>
          <a href='https://www.youtube.com/@pacholopezoficial' target='_blank' className='bg-fit bg-gray-800/50 rounded-full p-2'>
            <FiYoutube size={25} />
          </a>
        </div>
      </div>
      <div className='w-20 h-20 absolute end-10 bottom-10 z-10'>
        <a href='https://wa.me/5214731520717?' target='_blank'>
          <img src='/icons/WhatsApp.svg.webp' alt='' />
        </a>
      </div>
    </section>
  );
}
