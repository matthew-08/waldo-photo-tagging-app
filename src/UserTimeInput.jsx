import React from 'react'
import { useState } from 'react'
import {  doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db } from './App';

/* const db = getDatabase() */

const updateWinner = async (time, name) => {
  const data = {
    time: time,
    name: name,
  }
  
  console.log(data)

  const winnersRef = doc(db, 'winners', 'winners')

  await updateDoc(winnersRef, {
    array: arrayUnion(data)
  })
  
}

export default function UserTimeInput({time, resetGame}) {
  const [input, setInput] = useState('Anonymous')

  const hanldeSubmit = () => {

  }

  return (
    <div
    className='ending-input-container'
    >
        <p>You won!</p>
        <p>Your time is:</p>
        <h3>{time.displayTime}</h3>
        <p>Type your name below to submit your score</p>
        <input type="text" 
        onChange={(e) => setInput(e.target.value)}
        value = {input}
        />
        <button
        onClick={() => {
          updateWinner(time.msTime, input)
          resetGame() 
        } 
        
        }
        >Submit</button>
    </div>
  )
}
