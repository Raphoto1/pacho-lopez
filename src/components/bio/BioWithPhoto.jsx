import React from "react";

export default function BioWithPhoto() {
  return (
    <div className='flex flex-col md:w-10/12'>
      <h1 className='title text-4xl'>Biografía</h1>
      <div className='md:flex md:flex-row flex-col w-auto h-auto justify-center bg-white p-4 rounded-lg shadow-md mt-4 '>
        <div className='w-1/3 h-auto rounded-md'>
          <img src='/img/photos/pacho2.jpg' alt='artist' className="rounded-md"/>
        </div>
        <div className='md:w-2/3 h-auto md:p-4 flex items-center'>
          <p className='text-black font-medium text-justify'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eveniet, laboriosam provident nesciunt quisquam doloremque ad itaque expedita
            magnam eaque minus sint ipsam aliquid, ipsum tempora eos magni corporis autem dolorem architecto reiciendis. Aut quas fugiat pariatur ut recusandae
            eaque praesentium neque accusantium mollitia consequuntur, impedit ullam reiciendis numquam ab unde eius tempora omnis tenetur non maiores
            architecto nobis nihil labore. Ullam odio inventore sint iste voluptatem nisi iure explicabo laboriosam officia, fugiat incidunt. Corrupti hic
            architecto inventore ab explicabo praesentium quibusdam nulla iure eligendi illo, labore omnis autem excepturi! Facilis distinctio quia inventore
            animi provident quis dolorem fugit libero?
          </p>
        </div>
      </div>
    </div>
  );
}
