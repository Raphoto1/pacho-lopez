'use client'
import { useTranslations } from 'next-intl';

export default function NoPublishedDates() {
  const t = useTranslations('Tour');
  
  return (
    <p className='md:col-span-3 text-center text-base-content/70'>
      {t('noPublishedDates')}
    </p>
  );
}
