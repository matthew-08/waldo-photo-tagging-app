import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const getTime = (time) => {
  const m = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  const s = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  const ms = ("0" + ((time / 10) % 100)).slice(-2)
  return `${m}:${s}:${ms}`
}

export default function Timer({gameOver, returnTimer, resetTimer}) {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setTime(prev => prev + 10)
        }, 10   )
        
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
      if(gameOver) {
          console.log(time)
          returnTimer(time, getTime(time))
          resetTimer(false)
      }
  }, [gameOver])

 

  return (
    <>
    <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
      </>
  )
}
