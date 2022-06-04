import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0) 
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})
  const [shareGuess, setShareGuess] = useState([ 'YouWordle\n\n'])
  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log("format guess" + currentGuess)
    let solutions = [ ...solution ]
    let formattingGuess = [ ...currentGuess ].map((l) => {
        return {key: l, color: 'grey'}
    })

    formattingGuess.forEach((l, i) => {
        if (solutions[i] === l.key) {
            formattingGuess[i].color = 'green'
            solutions[i] = null
        }
    })

    formattingGuess.forEach((l, i) => {
        if (solutions.includes(l.key) && l.color !== 'green') {
            formattingGuess[i].color = 'yellow'
            solutions[solutions.indexOf(l.key)] = null
        }
    })

    return formattingGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
        setIsCorrect(true)
    }
    else {
        setIsCorrect(false)
    }
    setGuesses((prevGuess) => {
        let newGuess = [...prevGuess]
        newGuess[turn] = formattedGuess
        return newGuess
    })
    setHistory((prevhistory) => {
        return [...prevhistory, currentGuess]
    })
    setTurn((prevTurn) => {
        return prevTurn + 1
    })
    setUsedKeys((prevUsedKeys) => {
        let newKeys = {...prevUsedKeys}
        formattedGuess.forEach((l) => {
            const currentColor = newKeys[l.key]

            if (l.color === 'green' || currentColor == 'green') {
                newKeys[l.key] = 'green'
                return 
            }
            if (l.color === 'yellow' || currentColor == 'yellow') {
                newKeys[l.key] = 'yellow'
                return 
            }
            if (l.color === 'grey') {
                newKeys[l.key] = 'grey'
                return 
            }
        })
        return newKeys
    })
    setShareGuess((prevShareGuess) => {
        let newShareGuess = prevShareGuess
        formattedGuess.forEach((l) => {
            if (l.color === 'green') {
                newShareGuess += '🟩'
                return 
            }
            if (l.color === 'yellow') {
                newShareGuess += '🟨'
                return 
            }
            
            newShareGuess += '⬛'
            return 
        })
        newShareGuess += '\n'
        return newShareGuess
    })
    setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {

    if (key === 'Enter') {
        // only add guess if turn less than 5
        if (turn > 5) {
            return
        }
        // cannot submit duplicate word
        if (history.includes(currentGuess)) {
            return
        }
        // word length need to be 5
        if (currentGuess.length !== 5){
            return
        }

        const formatted = formatGuess(currentGuess)

        addNewGuess(formatted)
    }

    if (key === 'Backspace') {
        setCurrentGuess((prev) => {
            return prev.slice(0, -1)
        })
    }
    if (/^[A-Za-z]$/.test(key)) {
        if (currentGuess.length < 5){
            setCurrentGuess((prev) => {
                return prev + key
            })
        }
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys, shareGuess}
}

export default useWordle