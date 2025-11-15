'use server'
import {cookies} from 'next/headers';

export async function setLocale(locale) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale);
}
