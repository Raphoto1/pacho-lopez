'use client'
import React, { useState } from "react";
import Link from "next/link";
import {useTranslations, useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {setLocale} from '@/app/actions';

export default function NavBar() {
  const t = useTranslations('NavBar');
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = async (newLocale) => {
    await setLocale(newLocale);
    router.refresh();
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const menuItems = [
      {
      title: t('home'),
      link: "/",
    },
    {
      title: t('news'),
      link: "/news",
    },
    {
      title: t('bio'),
      link: "/bio",
    },
    {
      title: t('music'),
      link: "/music",
    },
    {
      title: t('videos'),
      link: "/videos",
    },
        {
      title: t('live'),
      link: "/live",
    },
    {
      title: t('tour'),
      link: "/tour",
    },
    {
      title: t('shop'),
      link: "/shop",
    },
    {
      title: t('contact'),
      link: "/contact",
    },
  ];
  return (
    <div className='navbar lg:fixed lg:top-0 shadow-sm bg-gray-800/50 flex w-full z-50'>
      {/* Mobile Menu */}
      <div className='navbar-start lg:hidden'>
        <details className='dropdown dropdown-right'>
          <summary className='btn btn-ghost'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {" "}
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />{" "}
            </svg>
          </summary>
          <ul className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="uppercase">{item.title}</Link>
              </li>
            ))}
          </ul>
        </details>
      </div>

      {/* Mobile Logo Centered */}
      <div className='navbar-center lg:hidden'>
        <Link href="/">
          <img className="h-10" src="/icons/Mascota.png" alt="Parcero" />
        </Link>
      </div>

      {/* Mobile Language Selector */}
      <div className='navbar-end lg:hidden'>
        <div className='flex gap-2 mr-4'>
          <button
            onClick={() => switchLocale('es')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              locale === 'es'
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white/20'
            }`}
          >
            ES
          </button>
          
          <button
            onClick={() => switchLocale('en')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              locale === 'en'
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white/20'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className='hidden lg:flex w-full justify-between items-center'>
        <Link href="/" className='flex-1 pl-5'>
          <img className="h-10" src="/icons/Mascota.png" alt="Parcero" />
        </Link>
        <ul className='menu menu-horizontal flex justify-around'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.link} replace className="uppercase">{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className='flex-1 flex justify-end'>
          {/* Language Selector */}
          <div className='flex gap-2 mr-4'>
          <button
            onClick={() => switchLocale('es')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              locale === 'es'
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white/20'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => switchLocale('en')}
            className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
              locale === 'en'
                ? 'bg-white text-black'
                : 'bg-transparent text-white hover:bg-white/20'
            }`}
          >
            EN
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
