import React from "react";
import { Smile } from "lucide-react";
import styles from "./SentimentScore.module.css";

interface SentimentScoreCardProps {
  sentimentScore: number;
  sentimentPolarity: string;
  sentimentMessage: string;
  progressGradient: number;
}

const SentimentScoreCard: React.FC<SentimentScoreCardProps> = ({
  sentimentScore,
  sentimentPolarity,
  sentimentMessage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>Sentiment Score</div>
        <div className={styles.scoreBox}>
          <div>{`${sentimentScore}%`}</div>
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
        <div className={styles.progress}>
          <div className={styles.innerPie}>
            <span>Based on Responses</span>
          </div>
        </div>
      </div>
      <div className={styles.important}>
        <span>important!</span>
        <p>The sentimental score is for guidance only and not a substitue for professional advice.</p>
      </div>
      </div>
    </div>
  );
};

export default SentimentScoreCard;
