import React from "react";
import styles from "./ContentPanel.module.css";
import { MoveRight } from "lucide-react";
import {Calendar,  Chart,  ImprovementBoard,  MoodIndicator, QuestionCard, SentimentScore} from "../index";

const ContentPanel: React.FC = () => {

  const data = [
    { Name: 'Krish', Score: 67, Improvement: 55 },
    { Name: 'Venkat', Score: 28, Improvement: -21 },
    { Name: 'Anish', Score: 59, Improvement: 22 },
    { Name: 'Abdul', Score: 78, Improvement: 11 },
    { Name: 'Shambhu', Score: 12, Improvement: 35 },
    { Name: 'Shreyansh', Score: 64, Improvement: 65 },
  ];

  return (
    <div className={styles.container}>
      {/* WELCOME CARD */}
      <div className={`${styles.card} ${styles.card1}`}>
        <div className={styles.welcomeTextContainer}>
          <div>Welcome,</div>
          <div className={styles.username}>Adam Johnson</div>
          <div className={styles.description}>
            <span>
              I&#39;m SleepyAI,
              <br />
              your trusted companion for all your
              <br />
            </span>
            <span className={styles.boldText}>Health and Wellness</span>
            <span> questions.</span>
          </div>
          <div className={styles.subDescription}>
            Feel free to ask me anything!
          </div>
          <div className={styles.record}>
            <div>Tap to record</div>
            <MoveRight/>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card2}`}>
        <MoodIndicator progress={50}/>
      </div>
      <div className={`${styles.card} ${styles.card3}`}>
        <Calendar/>
      </div>
      <div className={`${styles.card} ${styles.card4}`}>
        <div className={styles.chartTitle}>Sleep Tracker</div>
        <div className={styles.chartSubTitle}>improving</div>
        <Chart/>
      </div>
      <div className={`${styles.card} ${styles.card5}`}>
        <SentimentScore sentimentScore={56} sentimentPolarity={"Positive"} sentimentMessage={"Positive vibes! Perfect for new connections."} progressGradient={56}/>
      </div>
      <div className={`${styles.card} ${styles.card6}`}>
        <QuestionCard />
      </div>
      <div className={`${styles.card} ${styles.card7}`}>
        <ImprovementBoard data={data} improved={30}/>
      </div>
    </div>
  );
};

export default ContentPanel;
