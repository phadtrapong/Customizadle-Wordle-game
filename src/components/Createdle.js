import React, { useEffect, useState } from 'react'
import useCreatedle from '../hooks/useCreatedle'
import Keypad from './Keypad'
import ModalCreatedle from './ModalCreatedle'
import Row from './Row'

export default function Createdle({ toggleMode, isStart }) {
  const { questionLink, handleKeyup, currentQuestion } = useCreatedle()
  const [ showModal, setShowModal ] = useState(false)

  useEffect(() => {
    if (!isStart) 
    {
      return
    }
    if (questionLink != null) {
      setTimeout(() => {
        setShowModal(true)
      }, 100);
    }
  }, [ questionLink, isStart ])

  useEffect(() => {
    if (questionLink != null || !isStart) {
      return
    }
    window.addEventListener('keyup', handleKeyup)

    return () => { 
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [ handleKeyup, questionLink, isStart ])

  return (
    <div>
        <h2>Enter Your Question</h2>
        <Row currentGuess={currentQuestion} />
        <Keypad handleKeyup={handleKeyup} usedKeys={{}} />
        {showModal && <ModalCreatedle questionLink={questionLink} questionName={currentQuestion} toggleMode={toggleMode} />}
    </div>
  )
}
