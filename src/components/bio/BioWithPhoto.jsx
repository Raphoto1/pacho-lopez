import React from "react";

export default function BioWithPhoto() {
  return (
    <section className='flex flex-col md:w-10/12'>
      <h1 className='title text-4xl'>Biografía</h1>
      <div className='md:flex md:flex-row flex-col w-auto h-auto justify-center bg-white p-4 rounded-lg shadow-md mt-4 '>
        <div className='w-1/3 h-auto rounded-md'>
          <img src='/img/photos/pacho2.jpg' alt='artist' className='rounded-md' />
        </div>
        <div className='md:w-2/3 h-auto md:p-4 flex items-center'>
          <div className='flex flex-col'>
            <p className='text-black font-medium text-justify'>
              Pacho López y La “Cumbia-Mestiza” es un proyecto musical creado por el artista colombiano e inquilino del mundo Pacho López Parra en el año 2011,
              después de haber fundado y participado como guitarrista y corista de la banda de ska bogotana The Klaxon durante 11 años. Se junta con nuevos
              amigos músicos, para llevar a cabo su proyecto personal después de estar en su última gira por la costa de la British Columbia (Canadá), donde
              gracias a la lejanía con su tierra natal colombiana, se adentra en su cultura, por medio de la música involucrándose con la cumbia y todos sus
              ritmos mestizos, dándole origen a su gran agrupación: “Cumbia Mestiza"
            </p>
            <p className='text-black font-medium text-justify pt-2'>
              En el 2015 la Banda fue a Argentina,Chile y Mexico lanzando su más reciente trabajo discográfi co titulado Rayo de Luz – La Voz del Alma.
            </p>
            <p className='text-black font-medium text-justify pt-2'>
              En su horizonte más cercano, pretenden seguir difundiendo su música por Hispanoamérica y Europa, para realizar presentaciones de su más reciente
              album “PARCEROS”, producido en Guanajuato Capital - Mexico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
