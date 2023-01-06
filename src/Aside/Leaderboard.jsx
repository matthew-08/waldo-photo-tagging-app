import React from 'react'

export default function Leaderboard({name, time, leaderboard}) {
    console.log(leaderboard)
  return (
    <div
    className='leaderboard-container'
    >Leaderboard
    <div
    className='leaderboard'
    >

        {leaderboard.map(person => {
            return <div
            className='user-result'
            >
                <p>{person.name}</p>
                <p>{person.time}</p>
            </div>
        })}
    </div>
    
    </div>
  )
}
