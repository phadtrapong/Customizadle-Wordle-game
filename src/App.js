import { useEffect, useState } from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null)
  const keyToWord = {
    1: 'a',
    2: 'b',
    3: 'c',
    4: 'd',
    5: 'e',
    6: 'f',
    7: 'g',
    8: 'h',
    9: 'i',
    10: 'j',
    11: 'k',
    12: 'l',
    13: 'm',
    14: 'n',
    15: 'o',
    16: 'p',
    17: 'q',
    18: 'r',
    19: 's',
    20: 't',
    21: 'u',
    22: 'v',
    23: 'w',
    24: 'x',
    25: 'y',
    26: 'z',
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const q = queryParams.get('q');
    let solution = "ninja"
    if (q != null) {
      let decodedText = decodeURIComponent(q)
      let keys = atob(decodedText)
      let words = keys.split('-')
      if (words.length === 5) {
        solution = ""
        words.forEach((w, i) => {
          solution += keyToWord[w]
        })
      }
    }
    
    setSolution(solution)
  }, [])

  useEffect(() => {
    // fetch('https://https://3001-phadtrapong-trywordle-1vui1r0x0au.ws-us46.gitpod.io/solutions')
    // .then(res => res.json())
    // .then(json => {
    //   setSolution({"id": 1, "word": "ninja"})
    // })
  }, [])

  return (
    <div className="App">
      {/* <button>Create YouWordle +</button> */}
      <h1>Sharedle</h1>
      {solution && <Wordle solution={solution}/>}
    </div>
  )
}

export default App

/* 

data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6

game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'

*/