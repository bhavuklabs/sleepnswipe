import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./Questionnaire.module.css";
import { Logo } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import {
  FetchOnboardingQuestions,
  SendQuestionnaireResponses,
} from "../../hooks";
import { Error, QuestionnairesDelay } from "../../components";

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
  const [fetchError, setFetchError] = useState(false);


  const navigate = useNavigate();

  const hasSentResponses = useRef(false); 
  const hasFetchedQuestions = useRef(false); 

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
      if (hasFetchedQuestions.current) return; 

      try {
        setLoading(true);
        const data = await FetchOnboardingQuestions(
          "http://localhost:8080/onboarding/send"
        );
        setQuestions(data.questions);
        hasFetchedQuestions.current = true; 
      } catch (error) {
        setFetchError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []); 

  const sendResponses = useCallback(async () => {
    if (hasSentResponses.current) return; 
    try {
      await SendQuestionnaireResponses(
        "http://localhost:8080/onboarding/generate-and-save-scores",
        responses
      );
      hasSentResponses.current = true; 
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
      sendResponses();

      setTimeout(() => {
        navigate("/");
      }, 5000);
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

      {fetchError ? (
        <div className={styles.errorContainer}>
          <Error error={"Something Went Wrong"} errorMessage={"We couldn't fetch the questions.\nDon't worry, just give it another try!"}/>


        </div>
      ) : loading ? (
        <QuestionnairesDelay />
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
