import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { AiOutlineSpotify } from "react-icons/ai";
export default function SocialBar() {
  return (
    <section className='flex w-full justify-center py-4'>
      <a href='https://www.youtube.com/@pacholopezoficial' target='_blank' className=' bg-gray-800/50 rounded-full p-4'>
        <FiYoutube size={25} />
      </a>
      <a href='https://www.youtube.com/' target='_blank' className=' bg-gray-800/50 rounded-full p-4'>
        <FaXTwitter size={30} />
      </a>
      <a href='https://www.youtube.com/' target='_blank' className=' bg-gray-800/50 rounded-full p-4'>
        <FaPinterestP size={30} />
      </a>
      <a href='https://www.youtube.com/' target='_blank' className=' bg-gray-800/50 rounded-full p-4'>
        <FaTiktok size={30} />
      </a>
      <a
        href='https://open.spotify.com/intl-es/track/4bgvm7beLzAIs8N5tt6mEt?si=32cb193f0a564076'
        target='_blank'
        className='bg-gray-800/50 rounded-full p-4'>
        <AiOutlineSpotify size={25} />
      </a>
    </section>
  );
}
