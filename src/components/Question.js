import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  // build a countdown timer for 10 seconds
  // when the timeRemaining hit 0:
  //   Reset timer to 10 seconds
  //   Call onAnswered prop with a value of false
  //   use the cleanup function to clean up after the timeout funct

  useEffect(() =>{
    const timer = setInterval( ()=>{
      if(timeRemaining <= 1){
        onAnswered(false);
        setTimeRemaining(10);
      }
      else{
        setTimeRemaining(timeRemaining-1);
      }
    }, 1000);

    return function cleanup(){
      clearInterval(timer);
    };
  }, [timeRemaining]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
