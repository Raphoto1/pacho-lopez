'use client'
import { useTranslations } from 'next-intl';

export default function TourPageHeader() {
  const t = useTranslations('Tour');

  return (
    <div>
      <h1 className='text-4xl font-bold mb-4 text-center'>{t('upcomingDates')}</h1>
      <p className='text-lg text-gray-600 mb-4 text-center'>
        {t('upcomingDatesDescription')}
      </p>
    </div>
  );
}
