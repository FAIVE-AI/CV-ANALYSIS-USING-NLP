import React, { useState } from "react";
import "./AptitudeTest.scss";

export default function AptitudeTest() {
  const questions = [
    {
      id: 1,
      questionText: "1. What is 298 + 437?",
      answerOptions: [
        { answerText: "771", isCorrect: false },
        { answerText: "635", isCorrect: false },
        { answerText: "735", isCorrect: true },
        { answerText: "675", isCorrect: false }
      ]
    },
    {
      id: 2,
      questionText: "2. What is the next number in the series: 2, 5, 10, 17, ?",
      answerOptions: [
        { answerText: "25", isCorrect: false },
        { answerText: "23", isCorrect: true },
        { answerText: "30", isCorrect: false },
        { answerText: "35", isCorrect: false }
      ]
    },
    {
      id: 3,
      questionText:
        "3. If a book originally cost $40 and is now on sale for 25% off, what is the sale price?",
      answerOptions: [
        { answerText: "$30", isCorrect: true },
        { answerText: "$25", isCorrect: false },
        { answerText: "$50", isCorrect: false },
        { answerText: "$31", isCorrect: false }
      ]
    },
    {
      id: 4,
      questionText: "4. If 3x + 5 = 20, what is the value of x?",
      answerOptions: [
        { answerText: "7", isCorrect: true },
        { answerText: "9", isCorrect: false },
        { answerText: "17", isCorrect: false },
        { answerText: "6", isCorrect: false }
      ]
    },
    {
      id: 5,
      questionText: "5. What is 2 + 2 * 6?",
      answerOptions: [
        { answerText: "18", isCorrect: false },
        { answerText: "41", isCorrect: false },
        { answerText: "16", isCorrect: false },
        { answerText: "14", isCorrect: true }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 20);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setTimeout(() => {
        window.location.href = "/candidate-register";
      }, 5000);
    }
  };

  return (
    <div className="AptitudeTest">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of 100 (You are automatically being navigated
          to the home page)
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption) => (
              <button
                key={answerOption.answerText}
                className="answer-option-btn"
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
