import React from 'react'
import odlaw from './characterImg/odlaw.png'
import waldo from './characterImg/waldo.jpeg'
import woof from './characterImg/woof2.png'
import wizard from './characterImg/wizard-whitebeard.png'

export default function Button({name, found, handleUserGuess }) {
    console.log(name)
    const getImg = (name) => {
        switch(name){
            case 'waldo':
                return waldo
            case 'odlaw':
                return odlaw
            case 'woof':
                return woof
            case 'wizard':
                return wizard
        }
    }
  return (
     <div
     className='button-container'
     >
         <button
         onClick={() => handleUserGuess(name)}
         className={found && 'found-button'}
         style={{cursor: found && 'not-allowed'}}
         >
            <img src={getImg(name)}/>
            {name.charAt(0).toUpperCase() + name.slice(1)}
         </button>
         {found && <div
            className='overlay'
            ></div>}
     </div>
  )
}
