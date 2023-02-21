import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import waldo2 from '../src/waldo3.jpg'
import { useEffect } from 'react'
import { useRef } from 'react'
import { app } from './firebase'
import {getFirestore, collection, addDoc, getDocs, doc, getDoc} from 'firebase/firestore'
import Menu from './menu/Menu'
import SidebarMenu from './Aside/SidebarMenu'
import CharacterMark from './CharacterMark'
import Overlay from './Overlay'
import WinOverlay from './WinOverlay'
import { getTime } from './Aside/Timer'


export const db = getFirestore(app)



const querySnapshot = async () => {
  console.log(db)
  const docRef = doc(db, 'coordinates', 'R9DAxUWL3KN04b2MWaY6')
  const docSnap = await getDoc(docRef)
  return docSnap.data().characters

}
querySnapshot()

const getLeaderboard = async () => {
  const docref = doc(db, 'winners', 'winners')

  const docSnap = await getDoc(docref)

  return docSnap.data().array
}

function App() {
  const [leftRight, setLeftRight] = useState([300, 200])
  const [showMenu, setShowMenu] = useState(false)
  const [userClick, setUserClick] = useState([])
  const [foundCharacters, setFoundCharacter] = useState([
    {
      name: 'waldo',
      id: 1,
      found: false
    },
    {
      name:'odlaw',
      id: 2,
      found: false
    },
    {
      name:'woof',
      id: 3,
      found: false
    },
    {
      name:'wizard',
      id:4,
      found: false
    }
  ])
  const [gameStart, setGameStart] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [userTime, setUserTime] = useState(0)
  const [leaderboard, setLeadboard] = useState([])

const container = useRef()


const handleUserGuess = (character) => {
    const checkGuess = (xmin, xmax, ymin, ymax) => {
        const [userX, userY] = userClick
        if(userX >= xmin 
          && userX <= xmax
          && userY >= ymin
          && userY <= ymax
          ) {
            setFoundCharacter(foundCharacters.map(c => {
              if(c.name == character) {
                return {... c, x: userX, y: userY, found: true}
              }
              return c
            }))
          }
    return setShowMenu(false)
    }

    querySnapshot().then(res => {
      return res.filter(c => c.character === character)[0]
    }).then(c => {
      const {xmin, xmax, ymin, ymax} = c
      checkGuess(xmin, xmax, ymin, ymax)
    })
    
}

const checkClick = (e) => {
    const element = e.target

    if(container.current.contains(element) && !element.closest('.menu')) {
        setShowMenu(prev => !prev)  
        setLeftRight([e.clientX, e.clientY])

        const rect = container.current.getBoundingClientRect();
        const x = e.clientX - rect.left; //x position within the element.
        const y = e.clientY - rect.top;  //y position within the element.
        
        const percentageX = Math.floor((x / container.current.offsetWidth) * 100)
        const percentageY = Math.floor((y / container.current.offsetHeight) * 100)
        
        setUserClick([percentageX, percentageY])
        
      }
      else return null
}

//Odlaw xmin = 9 xmax = 11 , ymin = 34, ymax = 39
//Waldo xmin = 61 xmax = 63, ymin = 36 ymax = 40
//Wizard xmin = 26 xmax = 28, ymin = 34, ymax = 38]
//Woof xmin = 67, xmax = 68, ymin = 36, ymax = 38

//character 1 {xmin = 29, xmax = 30, ymin = 63, ymax = 66}
const handleClick = (e) => {
  if (gameOver === false) {
  checkClick(e) 
  } else {
    return null
  }
}

useEffect(() => {
  const checkForWin = () => {
    return foundCharacters.filter(c => c.found === false)
  }
  if(checkForWin().length <= 0) {
    setGameOver(true)
  } else {
    setGameOver(false)
  }
}, [foundCharacters])



useEffect(() => {
  document.body.addEventListener('click', handleClick)

 /*  setLeftRight([e.clientX, e.clientY]) */
}, [])

const toggleGameStart = () => {
  setGameStart(!gameStart)
}

const resetGame = () => {

  setFoundCharacter(foundCharacters.map(c => {
    return (
      {...c, found: false}
    )
  }))
}

const returnTimer = (msTime, displayTime) => {
  setUserTime({msTime: msTime, displayTime: displayTime})
  /* setGameStart(false)  */
}

const handleNewGame = () => {
  resetGame()
  setGameStart(false)
  setGameOver(false)
}

useEffect(() => {
  getLeaderboard().then(res => {
    const adjustTimes = res.sort((a, b) => {
        return a.time - b.time
    })

  
    const finalResults = adjustTimes.map((u) => {
      return(
        {...u, time: getTime(u.time)}
      )
    }
    )

    setLeadboard(finalResults)
  })

}, [gameOver])


  return (
    <div className="App">
      {gameOver && <WinOverlay
      time={userTime}
      resetGame={handleNewGame}
      />}
      <SidebarMenu 
      toggleGameStart={toggleGameStart}
      resetGame = {resetGame}
      gameOver = {gameOver}
      returnTimer = {returnTimer}
      leaderboard = {leaderboard}
      />
      <div
      className='container'
      ref={container}
      style={{zIndex: gameStart ? 1 : -1, pointerEvents: gameOver && 'none'}}
      >
        {!gameStart && 
        <Overlay
        gameOver={gameOver}
        time = {userTime.msTime}
        />
        }

        <img src={waldo2}
        />
        {showMenu && <Menu 
        handleUserGuess={handleUserGuess}
        leftRight={leftRight}
        foundCharacters={foundCharacters}
        />
}      
      {foundCharacters.map(c => {
        if(c.found) {
          return <CharacterMark 
          key = {c.id}
          x = {c.x}
          y = {c.y}
          />
        }
      })}
      </div>
    </div>
  )
}

export default App
