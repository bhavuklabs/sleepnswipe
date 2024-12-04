import React, { useEffect, useState, useCallback } from "react";
import styles from "./Questionnaire.module.css";
import { Logo } from "../../assets/images";
import { useNavigate } from "react-router-dom";

const QUESTIONS = {
  questions: [
    {
      question: "You're at a party. Do you:",
      options: [
        "Mingle with everyone and try to meet new people.",
        "Stick with a small group of close friends.",
        "Find a quiet corner to observe.",
        "Try to find the host and help them out.",
      ],
    },
    {
      question:
        "Imagine you're faced with a challenging problem at work. You are most likely to:",
      options: [
        "Jump in and try to solve it immediately.",
        "Analyze the problem carefully before taking action.",
        "Seek advice from others before making a decision.",
        "Delegate parts of the problem to others.",
      ],
    },
    {
      question:
        "Scenario: You're on a team project and a team member isn't pulling their weight. How do you respond?",
      options: [
        "Confront them directly and express your concerns.",
        "Talk to the project leader about the situation.",
        "Try to subtly help them catch up without making a fuss.",
        "Let it go and focus on your own contributions.",
      ],
    },
    {
      question:
        "Scenario: A friend asks you for a significant favor that will inconvenience you. How do you respond?",
      options: [
        "Agree to help, even if it means making sacrifices.",
        "Explain your limitations and offer an alternative solution.",
        "Politely decline, stating your reasons clearly.",
        "Feel obligated to say yes, even if you resent it.",
      ],
    },
    {
      question:
        "Scenario: You are having a disagreement with a family member. How do you typically handle it?",
      options: [
        "Engage in a calm discussion to find a compromise.",
        "Avoid the conflict altogether and hope it resolves itself.",
        "Express your feelings intensely and passionately.",
        "Become withdrawn and silent until the situation cools down.",
      ],
    },
    {
      question:
        "As a child, your parents’ parenting style was best described as:",
      options: [
        "Authoritative (high expectations, high responsiveness)",
        "Authoritarian (high expectations, low responsiveness)",
        "Permissive (low expectations, high responsiveness)",
        "Uninvolved (low expectations, low responsiveness)",
      ],
    },
  ],
};

interface QuestionnaireProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({setIsAuthenticated}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{
    email: string;
    responses: Array<{ question: string; options: string }>;
  }>({
    email: "",
    responses: [],
  });
  const [animationKey, setAnimationKey] = useState(0);
  const [width, setWidth] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const navigate = useNavigate();

  const moveToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < QUESTIONS.questions.length - 1) {
      setAnimationKey((prev) => prev + 1);
      setCurrentQuestionIndex((prev) => prev + 1);
      setWidth(100); // Reset the timer for the next question
    } else {
      setIsCompleted(true); // Mark the questionnaire as completed
      console.log("Questionnaire completed", responses);
      setIsAuthenticated(true);
      navigate('/');
    }
  }, [currentQuestionIndex, navigate, responses, setIsAuthenticated]);

  const handleTimeOut = useCallback(() => {
    const currentQuestion = QUESTIONS.questions[currentQuestionIndex];
    setResponses((prev) => ({
      ...prev,
      responses: [
        ...prev.responses,
        {
          question: currentQuestion.question,
          options: "Skipped (Timed Out)",
        },
      ],
    }));
    moveToNextQuestion();
  }, [currentQuestionIndex, moveToNextQuestion]);

  useEffect(() => {
    if (isCompleted) return; // Stop the timer when completed

    const interval = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= 0) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prevWidth - 2;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [handleTimeOut, isCompleted]);

  const handleOptionSelect = (option: string) => {
    const currentQuestion = QUESTIONS.questions[currentQuestionIndex];
    setResponses((prev) => ({
      ...prev,
      responses: [
        ...prev.responses,
        {
          question: currentQuestion.question,
          options: option,
        },
      ],
    }));
    moveToNextQuestion();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={Logo} className={styles.logo} alt="Logo" />
        <span className={styles.title}>SleepNSwipe</span>
      </header>

      {!isCompleted ? (
        <>
          <div className={styles.timerBarContainer}>
            <div
              className={styles.timerBar}
              style={{ width: `${width}%` }}
            ></div>
          </div>

          <div className={styles.questionNum}>
            Question {currentQuestionIndex + 1}/{QUESTIONS.questions.length}
          </div>

          <div
            key={animationKey}
            className={`${styles.questionContainer} ${styles.slideIn}`}
          >
            <h2 className={styles.question}>
              {QUESTIONS.questions[currentQuestionIndex].question}
            </h2>

            <div className={styles.optionsContainer}>
              {QUESTIONS.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <div
                    key={index}
                    className={styles.option}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.completionMessage}>
          <h2>Thank you for completing the questionnaire!</h2>
          <p>Your responses have been recorded.</p>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
