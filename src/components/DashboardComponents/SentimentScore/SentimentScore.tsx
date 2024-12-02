import React, { useState, useEffect } from "react";
import { Smile } from "lucide-react";
import styles from "./SentimentScore.module.css";

interface SentimentScoreCardProps {
  sentimentScore: number;
  sentimentPolarity: string;
  sentimentMessage: string;
}

const SentimentScoreCard: React.FC<SentimentScoreCardProps> = ({
  sentimentScore,
  sentimentPolarity,
  sentimentMessage,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let currentScore = 0;
    const interval = setInterval(() => {
      if (currentScore < sentimentScore) {
        currentScore += 1; 
        setAnimatedScore(currentScore);
      } else {
        clearInterval(interval);
      }
    }, 10); 
    return () => clearInterval(interval);
  }, [sentimentScore]);

  const calcProgress = (animatedScore / 100) * 360; 
  const progressGradient = `conic-gradient(
    #6CD753 0deg ${calcProgress}deg,
    rgba(0, 117, 255, 0.2) ${calcProgress}deg 360deg
  )`;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>Sentiment Score</div>
        <div className={styles.scoreBox}>
          <div>{`${animatedScore}%`}</div>
          <span>{sentimentPolarity}</span>
        </div>
        <div className={styles.moodBox}>
          <div className={styles.mood}>
            <Smile />
          </div>
          <span>{sentimentMessage}</span>
        </div>
        <button>Check Again</button>
      </div>

      <div className={styles.right}>
        <div className={styles.sentimentIndicatorBox}>
          <div
            className={styles.progress}
            style={{ background: progressGradient }}
          >
            <div className={styles.innerPie}>
              <span>Based on Responses</span>
            </div>
          </div>
        </div>
        <div className={styles.important}>
          <span>Important!</span>
          <p>
            The sentimental score is for guidance only and not a substitute for
            professional advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentimentScoreCard;
