"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function VideoGrid() {
  const t = useTranslations("VideoGrid");
  const playlistId = process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID;
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

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
        setVideos(parsed);
      });
  }, []);

  return (
    <div className='flex flex-col justify-center items-center py-4'>
      <h2 className='text-2xl font-bold pb-2'>{t('title')}</h2>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {videos.map((video) => (
          <div key={video.id} className='card shadow-xl'>
            <iframe className='rounded-lg' src={`https://www.youtube.com/embed/${video.id}`} width='100%' height='315' frameBorder='0' allowFullScreen />
          </div>
        ))}
      </div>
    </div>
  );
}
