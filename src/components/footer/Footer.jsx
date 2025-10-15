import React from "react";
import SocialBar from "../bar/SocialBar";
export default function Footer() {
  return (
    <footer className='flex w-full h-auto bg-gray-800/50 justify-around items-center'>
      <div><h3 className="font-bold">Pacho López y la Cumbia Mestiza 2025</h3></div>
<div>
        <SocialBar />
</div>
    </footer>
  );
}
