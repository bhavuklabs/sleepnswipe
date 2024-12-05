import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Questionnaire.module.css";
import { Logo } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {
  FetchOnboardingQuestions,
  SendQuestionnaireResponses,
} from "../../hooks";

interface Question {
  question: string;
  options: string[];
}

interface Response {
  question: string;
  options: string;
}

interface QuestionnaireProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  setIsAuthenticated,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<{
    email: string;
    responses: Response[];
  }>({
    email: "",
    responses: [],
  });
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [width, setWidth] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const hasSentResponses = useRef(false); // Ref to track if responses have been sent
  const hasFetchedQuestions = useRef(false); // Ref to track if questions have been fetched

  useEffect(() => {
    const loginDetails = localStorage.getItem("loginDetails");
    if (loginDetails) {
      const parsedDetails = JSON.parse(loginDetails);
      setResponses((prev) => ({
        ...prev,
        email: parsedDetails[0]?.email || "",
      }));
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (hasFetchedQuestions.current) return; // Prevent re-fetching

      try {
        setLoading(true);
        const data = await FetchOnboardingQuestions(
          "http://localhost:8080/onboarding/send"
        );
        setQuestions(data.questions);
        hasFetchedQuestions.current = true; // Mark as fetched
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array ensures this runs only once

  const sendResponses = useCallback(async () => {
    if (hasSentResponses.current) return; // Prevent multiple sends
    try {
      await SendQuestionnaireResponses(
        "http://localhost:8080/onboarding/generate-and-save-scores",
        responses
      );
      hasSentResponses.current = true; // Mark as sent
    } catch (error) {
      console.error("Error sending responses to backend:", error);
    }
  }, [responses]);

  const moveToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimationKey((prev) => prev + 1);
      setCurrentQuestionIndex((prev) => prev + 1);
      setWidth(100);
    } else {
      setIsCompleted(true);
      setIsAuthenticated(true);
      sendResponses(); // Send responses only once

      setTimeout(() => {
        navigate("/"); // Redirect after sending responses
      }, 5000); // Wait 5 seconds before redirect
    }
  }, [
    currentQuestionIndex,
    questions.length,
    setIsAuthenticated,
    sendResponses,
    navigate,
  ]);

  const handleTimeOut = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
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
  }, [currentQuestionIndex, moveToNextQuestion, questions]);

  useEffect(() => {
    if (isCompleted || questions.length === 0) return;

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
  }, [handleTimeOut, isCompleted, questions]);

  const handleOptionSelect = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
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

      {loading ? (
        <div className={styles.loader}>
          <h2>Loading Questionnaire...</h2>
        </div>
      ) : !isCompleted && questions.length > 0 ? (
        <>
          <div className={styles.timerBarContainer}>
            <div
              className={styles.timerBar}
              style={{ width: `${width}%` }}
            ></div>
          </div>

          <div className={styles.questionNum}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </div>

          <div
            key={animationKey}
            className={`${styles.questionContainer} ${styles.slideIn}`}
          >
            <h2 className={styles.question}>
              {questions[currentQuestionIndex].question}
            </h2>

            <div className={styles.optionsContainer}>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={styles.option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className={styles.completionMessage}>
          <div className={styles.thankYouContainer}>
            <h2>🎉 Thank you for completing the questionnaire!</h2>
            <p>
              Your responses have been recorded. Redirecting to the homepage in
              5 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
