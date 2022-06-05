import React, { useState } from 'react'

export default function Modal({ isCorrect, turn, solution, shareGuess, toggleMode }) {
  
  const [showCopied, setShowCopied] = useState(false)
  const generateScoreCard = async () => {
    setTimeout(() => {
        setShowCopied(false)
    }, 2000)
    setShowCopied(true)
    await navigator.clipboard.writeText(shareGuess);
  }
  const renderShareButton = () => {
      return (<div className='share-container'>
          <button onClick={() => generateScoreCard()}>share</button>
      </div>)
  }
  const renderCopied = () => {
      return (<div>Copied!</div>)
  }
  return (
    <div className='modal'>
        {isCorrect && (<div className='container'>
            <h1>You Win!</h1>
            <p className='solution'>{solution}</p>
            <p>You found solution in {turn} guesses</p>
            {showCopied && renderCopied()}
            {renderShareButton()}
            <button className='back-to-game' onClick={() => toggleMode()}>Make Question +</button>
        </div>)}
        {!isCorrect && (<div className='container'>
            <h1>No Worry!</h1>
            <p className='solution'>{solution}</p>
            <p>Better luck next time</p>
            {showCopied && renderCopied()}
            {renderShareButton()}
            <button className='back-to-game' onClick={() => toggleMode()}>Make Question +</button>
        </div>)}
    </div>
  )
}
