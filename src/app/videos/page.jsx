import React from "react";

import VideoGrid from "@/components/grid/VideoGrid";

export const metadata = {
  title: "Videos",
};

export default function page() {
  return (
    <div className='pt-20'>
      <VideoGrid />
    </div>
  );
}
