import React from 'react'
import UserTimeInput from './UserTimeInput'

export default function WinOverlay({time, resetGame}) {
  return (
    <div
    className='win-overlay'
    >
        <UserTimeInput
                resetGame={resetGame}
                time = {time}
            />
    </div>
  )
}
