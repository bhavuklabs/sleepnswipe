import React from "react";
import styles from "./ContentPanel.module.css";
import { MoveRight } from "lucide-react";
import {Calendar,  Chart,  MoodIndicator} from "../index";

const ContentPanel: React.FC = () => {
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
        <div className={styles.sentiBlockleft}></div>
        <div className={styles.sentiBlockRight}></div>
      </div>
      <div className={`${styles.card} ${styles.card5}`}></div>
      <div className={`${styles.card} ${styles.card5}`}></div>
    </div>
  );
};

export default ContentPanel;
