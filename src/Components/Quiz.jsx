import React from "react";
import './Quiz.css'
import { data } from "../assets/data";
import { useState, useRef } from "react";
function Quiz() {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [status, setStatus] = useState(false);
    let [result, setResult] = useState(false);
    let [score, setScore] = useState(0);

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_array = [option1, option2, option3, option4]

    const checkAns = (e, answer) => {
        if (status === false) {
            if (question.answer === answer) {
                e.target.classList.add("correct")
                setStatus(true)
                setScore(previous => previous + 1)
            } else {
                e.target.classList.add("wrong")
                setStatus(true)
                option_array[question.answer - 1].current.classList.add("correct")
            }
        }
    }
    let next = () => {
        if (index === data.length - 1) {
            setResult(true);
            return 0;
        }
        if (status === true) {
            setIndex(++index);
            setQuestion(data[index]);
            setStatus(false);
            option_array.map((option) => {
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
                return null;
            })
        }
    }
    
    let reset = ()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setResult(false);
        setStatus(false);
    }



    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result ? <></> : <><h4 className="question">{question.id}.{question.question}</h4>
                <ul>
                    <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                </ul>
                <button className="btn" onClick={next}>Next</button>
                <div className="score">{index + 1} of {data.length} questions</div></>}
            {result ? <><h1 className="score-result">Your score is {score} out of {data.length}</h1>
                <button className="btn" onClick={reset}>Reset</button></> : <></>}
        </div>
    )
}

export default Quiz;