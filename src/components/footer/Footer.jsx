import React from "react";
import SocialBar from "../bar/SocialBar";
import Link from "next/link";
import { useTranslations } from "next-intl";
export default function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className='flex flex-col w-full h-auto bg-gray-800/50 justify-around items-center py-4 mt-auto'>
      <div className="flex flex-col md:flex-row w-full h-auto justify-around items-center py-4 mt-auto">
        <div className="flex flex-col justify-center align-middle items-center">
          <h3 className='font-bold text-center md:text-2xl md:text-start'>Pacho López y la Cumbia Mestiza 2025</h3>
          <p className='text-sm text-center md:text-start'>{t('rights')}</p>
        </div>
        <div>
          <SocialBar />
        </div>
      </div>
      <div>
        Developed By <Link href="https://creativerafa.com">CreativeRafa</Link>
      </div>
    </footer>
  );
}
