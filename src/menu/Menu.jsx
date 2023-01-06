import React from 'react'
import Button from './Button'

export default function Menu({leftRight, handleUserGuess, foundCharacters}) {

  // 4 buttons
  // each button has id
  // pass class if id = true

  return (
    <div className="menu"
        style={{left: leftRight[0], top: leftRight[1]}}
        /* ref = {ref} */ 
        >
          {foundCharacters.map(c => {
            return <Button 
                    handleUserGuess = {handleUserGuess}
                    found = {c.found}
                    name = {c.name}
                    key = {c.id}
                    />
          })}
        </div>
  )
}
