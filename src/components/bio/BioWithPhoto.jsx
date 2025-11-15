'use client'
import React from "react";
import { useTranslations } from 'next-intl';

export default function BioWithPhoto() {
  const t = useTranslations('Bio');
  
  return (
    <section className='flex flex-col md:w-10/12'>
      <h1 className='title text-4xl'>{t('title')}</h1>
      <div className='md:flex md:flex-row flex-col w-auto h-auto justify-center bg-white p-4 rounded-lg shadow-md mt-4 '>
        <div className='w-1/3 h-auto rounded-md'>
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
        </div>
        <div className='md:w-2/3 h-auto md:p-4 flex items-center'>
          <div className='flex flex-col'>
            <p className='text-black font-medium text-justify'>
              {t('paragraph1')}
            </p>
            <p className='text-black font-medium text-justify pt-2'>
              {t('paragraph2')}
            </p>
            <p className='text-black font-medium text-justify pt-2'>
              {t('paragraph3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
