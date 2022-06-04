import React, {useEffect, useState} from 'react'

export default function Keypad({ usedKeys, handleKeyup }) {
  const letters_first_row = [
      {"key": "q"},
      {"key": "w"},
      {"key": "e"},
      {"key": "r"},
      {"key": "t"},
      {"key": "y"},
      {"key": "u"},
      {"key": "i"},
      {"key": "o"},
      {"key": "p"}]

  const letters_second_row = [{"key": "a"},
      {"key": "s"},
      {"key": "d"},
      {"key": "f"},
      {"key": "g"},
      {"key": "h"},
      {"key": "j"},
      {"key": "k"},
      {"key": "l"}]
      
  const letters_third_row = [
      {"key": "Enter"},  
      {"key": "z"},
      {"key": "x"},
      {"key": "c"},
      {"key": "v"},
      {"key": "b"},
      {"key": "n"},
      {"key": "m"},
      {"key": "Backspace"}
    ];

  return (
    <div className='keypad'>
      <div className='keypad-row'>
      {letters_first_row && letters_first_row.map((l) => {
        const color = usedKeys[l.key]
        return (<button key={l.key} className={color} onClick={() => handleKeyup({ key: l.key })}>{l.key}</button>)
      })}
      </div>
      <div className='keypad-row'>
      {letters_second_row && letters_second_row.map((l) => {
        const color = usedKeys[l.key]
        return (<button key={l.key} className={color} onClick={() => handleKeyup({ key: l.key })}>{l.key}</button>)
      })}
      </div>
      <div className='keypad-row'>
      {letters_third_row && letters_third_row.map((l) => {
        const color = usedKeys[l.key]
        if (l.key === 'Backspace' || l.key === 'Enter' ) {
          return (<button key={l.key} className='long' onClick={() => handleKeyup({ key: l.key })}>{l.key}</button>)          
        }
        return (<button key={l.key} className={color} onClick={() => handleKeyup({ key: l.key })}>{l.key}</button>)
      })}
      </div>
    </div>
  )
}
