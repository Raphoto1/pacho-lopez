import React from "react";
import TourDate from "./TourDate";
export default function ToursGrid() {
  return (
    <div className='container mx-auto p-4 flex flex-col items-center'>
      <div>
        <h1 className='text-4xl font-bold mb-4 text-center'>Próximas Fechas</h1>
        <p className='text-lg text-gray-600 mb-4 text-center'>
          ¡No te pierdas nuestras próximas presentaciones! Consulta las fechas y lugares de nuestros conciertos.
        </p>
      </div>
      <div className='grid w-full md:grid-cols-3 gap-4 p-4'>
        <TourDate />
        <TourDate />
        <TourDate />
      </div>
    </div>
  );
}
