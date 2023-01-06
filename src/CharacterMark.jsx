import React from 'react'

export default function CharacterMark({x, y}) {
  return (
    <div
    style={{top: `${y}%`, left:`${x}%`}}
    className='character-marker'
    ></div>
  )
}
