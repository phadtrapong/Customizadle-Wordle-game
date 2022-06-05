import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

export default function Wordle({ solution, isStart, toggleMode }) {
  const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys, shareGuess } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)
  
  useEffect(() => {
    if (!isStart)
    {
      return
    }
    window.addEventListener('keyup', handleKeyup)
    
    if (isCorrect || turn > 5) {
      setTimeout(() => {
        setShowModal(true)
      }, 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => { 
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [ handleKeyup, isCorrect, turn, isStart ])

  return (<div>
    <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
    {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} shareGuess={shareGuess} toggleMode={toggleMode}/>}
    </div>
  )
}
