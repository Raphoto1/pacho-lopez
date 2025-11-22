import React from 'react'
import MusicPlayerDisc from '@/components/musicPlayer/MusicPlayerDisc'
export default function Disc(props) {
  return (
    <div>
          <div>{props.title}</div>
          <MusicPlayerDisc />
    </div>
  )
}
