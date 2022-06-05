import React, { useState } from 'react'

export default function ModalCreatedle({ questionLink, questionName, toggleMode }) {
  const [showCopied, setShowCopied] = useState(false)
  const copyText = async () => {
    setTimeout(() => {
        setShowCopied(false)
    }, 2000)
    setShowCopied(true)
    await navigator.clipboard.writeText(questionLink);
  }
  const renderShareButton = () => {
      return (<div className='share-container'>
          <button onClick={() => copyText()}>Share</button>
      </div>)
  }
  const renderCopied = () => {
      return (<div>Copied!</div>)
  }

  return (
    <div className='modal'>
        <div className='container'>
            <h1>Here's your question link</h1>
            <p>Your question is {questionName}</p>
            <a href={questionLink}>{questionLink}</a>
            {showCopied && renderCopied()}
            {renderShareButton()}
            <button className='back-to-game' onClick={() => toggleMode()}>Back to game</button>
        </div>
    </div>
  )
}
