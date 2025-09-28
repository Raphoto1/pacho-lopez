"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function VideoGrid() {
  const playlistId = "PLEaHpsZJ9wc7DeXLgxp94uDYE8bFbdHs0";
  const apiKey = "AIzaSyAV5hiBD0I_7xnDTSrgTjgpnxSkIbDqKQI";
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const parsed = data.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
        }));
        console.log(parsed);

        setVideos(parsed);
      });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center pb-2'>
      <h2 className='text-2xl font-bold pb-2'>Nuestra Lista en Youtube</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
        {videos.map((video) => (
          <div key={video.id} className='card shadow-xl'>
            <iframe className="rounded-lg" src={`https://www.youtube.com/embed/${video.id}`} width='100%' height='315' frameBorder='0' allowFullScreen />
          </div>
        ))}
      </div>
    </div>
  );
}
