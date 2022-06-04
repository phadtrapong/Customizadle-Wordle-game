import React, {useEffect, useState} from 'react'

export default function Keypad({ usedKeys }) {
  const letters = [
      {"key": "q"},
      {"key": "w"},
      {"key": "e"},
      {"key": "r"},
      {"key": "t"},
      {"key": "y"},
      {"key": "u"},
      {"key": "i"},
      {"key": "o"},
      {"key": "p"},
      {"key": "a"},
      {"key": "s"},
      {"key": "d"},
      {"key": "f"},
      {"key": "g"},
      {"key": "h"},
      {"key": "j"},
      {"key": "k"},
      {"key": "l"},
      {"key": "z"},
      {"key": "x"},
      {"key": "c"},
      {"key": "v"},
      {"key": "b"},
      {"key": "n"},
      {"key": "m"}
    ];

  return (
    <div className='keypad'>
      {letters && letters.map((l) => {
        const color = usedKeys[l.key]
        return (<button key={l.key} className={color}>{l.key}</button>)
      })}
    </div>
  )
}
