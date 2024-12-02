import React, { useEffect, useState } from "react";
import styles from "./MoodIndicator.module.css";
import { Smile } from "lucide-react";

interface MoodIndicatorProps {
  progress: number;
}

const MoodIndicator: React.FC<MoodIndicatorProps> = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress < progress) {
        currentProgress += 1;
        setAnimatedProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 10); 
    return () => clearInterval(interval);
  }, [progress]);

  const calcProgress = (animatedProgress / 100) * 220;
  const progressGradient = `conic-gradient(
    from -110deg,
    #6CD753 0deg ${calcProgress}deg, 
    rgba(0, 117, 255, 0.2) ${calcProgress}deg 100deg
  )`;

  return (
    <div className={styles.pieChart}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Mood Indicator</div>
        <div className={styles.subtitle}>Be Happy and Healthy!</div>
      </div>
      <div className={styles.chart}>
        <div className={styles.progress} style={{ background: progressGradient }}>
          <div className={styles.innerPie}>
            <div className={styles.mood}>
              <Smile />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scoreCard}>
        <span>0%</span>
        <div className={styles.score}>
          {animatedProgress}%
          <span>Based on Responses</span>
        </div>
        <span>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default MoodIndicator;
