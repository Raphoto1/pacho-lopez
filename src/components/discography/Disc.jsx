"use client";
import React, { useState } from "react";
import MusicPlayerDiscDynamic from "../musicPlayer/MusicPlayerDiscDynamic.jsx";
import Image from "next/image";

export default function Disc(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section>
      <div className='flex flex-col lg:flex-row h-auto items-center justify-center lg:p-2 rounded-lg'>
        <div className='m-4 flex flex-col items-center justify-center'>
          <h2 className='title text-2xl font-bold'>{props.title}</h2>
          <h3 className='subtitle text-xl pb-4'>{props.year}</h3>
          {/* Flip Card Container */}
          <div
            className='relative w-[400px] h-[400px] cursor-pointer'
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}>
            <div
              className='relative w-full h-full transition-transform duration-700'
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}>
              {/* Front Image */}
              <div className='absolute w-full h-full' style={{ backfaceVisibility: "hidden" }}>
                <Image src={props.frontImage} alt={props.title} width={400} height={400} className='rounded-lg' />
              </div>

              {/* Back Image */}
              <div
                className='absolute w-full h-full'
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}>
                <Image src={props.backImage} alt={`${props.title} - Back`} width={400} height={400} className='rounded-lg' />
              </div>
            </div>
          </div>
        </div>
        <MusicPlayerDiscDynamic url={props.url} />
      </div>
      <div className="extradata">
      </div>
      {/* Separator Line */}
      <hr className="border-t border-gray-300 my-6 w-full" />
    </section>
  );
}
