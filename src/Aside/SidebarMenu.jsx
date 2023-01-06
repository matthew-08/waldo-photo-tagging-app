import React from 'react'
import Timer from './Timer'
import { useState } from 'react'
import { useEffect } from 'react'
import Leaderboard from './Leaderboard'


export default function SidebarMenu({toggleGameStart, resetGame, gameOver, returnTimer, leaderboard}) {

    const [timer, enableTimer] = useState(false)



  return (
    <aside>
        <div
        className='title'
        >
            <h2>Where's Waldo?</h2>
            {gameOver && <h2>Game dOver</h2> }
            <small>A photo-tagging app</small>
        </div>
        <section
        className='button-timer'
        >
            <button
            className='start-button'
            onClick={() => {
                resetGame()
                toggleGameStart()
                enableTimer(!timer)}
            
            }
            >{timer ? "Reset" : "Start Game"}</button>
            <div
            className='timer-container'
            >
                {timer ? <Timer 
                gameOver = {gameOver}
                returnTimer = {returnTimer}
                resetTimer = {enableTimer}
                /> : '00:00.00'}
            </div>

        </section>
        <Leaderboard
        leaderboard={leaderboard}
        />
    </aside>
  )
}
