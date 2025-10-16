import React from "react";

export default function page() {
  return (
    <div>
      <div className='flex flex-col md:w-full h-screen justify-center items-center gap-4 px-4 align-middle'>
        <h1 className='title text-4xl mt-12'>Pidelos en Nuestro Whatsapp</h1>

        <div className='grid md:grid-cols-4 gap-4 w-full h-auto rounded-md'>
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
        </div>
      </div>
      <div className='bottom-10 w-20 fixed right-10 flex flex-col gap-4'>
        <a href='https://wa.me/5214731520717?' target='_blank'>
          <img src='/icons/WhatsApp.svg.webp' alt='' />
        </a>
      </div>
    </div>
  );
}
