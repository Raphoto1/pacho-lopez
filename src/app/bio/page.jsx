import React from 'react'
import BioWithPhoto from '@/components/bio/BioWithPhoto'

export const metadata = {
  title: "Bio",
};

export default function page() {
  return (
    <div className='flex w-full min-h-screen justify-center items-center'>
      <BioWithPhoto />
    </div>
  )
}
