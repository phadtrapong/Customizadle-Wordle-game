import { useState } from 'react'

const useCreatedle = () => {
    const [turn, setTurn] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [questionLink, setQuestionLink] = useState(null)

    const createLink = (currentQuestion) => {
        let linkWord = ""
        let words = [...currentQuestion]
        words.forEach((w, i) => {
            let numWord = ((w.charCodeAt(0) - 96) % 27)
            linkWord += numWord.toString()
            if (i !== 4) 
            {
                linkWord += "-"
            } 
        });

        return window.location.protocol + '//' + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(btoa(linkWord))
    }
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            // only add guess if turn less than 5
            if (turn >= 1) {
                return
            }
            
            // word length need to be 5
            if (currentQuestion.length !== 5){
                return
            }
    
            const questionLink = createLink(currentQuestion)
            
            console.log(questionLink)
            setTurn(prevTurn => prevTurn + 1)
            setQuestionLink(() => questionLink)
            return
        }
    
        if (key === 'Backspace') {
            setCurrentQuestion((prev) => {
                return prev.slice(0, -1)
            })
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentQuestion.length < 5){
                setCurrentQuestion((prev) => {
                    return prev + key
                })
            }
        }
      }

    return { questionLink, handleKeyup, currentQuestion }
}

export default useCreatedle;