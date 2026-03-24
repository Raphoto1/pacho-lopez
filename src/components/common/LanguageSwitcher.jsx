'use client'
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/app/actions';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchLocale = async (newLocale) => {
    await setLocale(newLocale);
    router.refresh();
  };

  return (
    <div className='flex gap-2 justify-center mb-6'>
      <button
        onClick={() => switchLocale('es')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          locale === 'es'
            ? 'bg-primary text-white'
            : 'bg-base-200 text-base-content hover:bg-base-300'
        }`}
      >
        Español
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
          locale === 'en'
            ? 'bg-primary text-white'
            : 'bg-base-200 text-base-content hover:bg-base-300'
        }`}
      >
        English
      </button>
    </div>
  );
}
