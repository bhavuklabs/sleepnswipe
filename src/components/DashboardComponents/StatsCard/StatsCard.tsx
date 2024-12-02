import React from "react";
import styles from "./StatsCard.module.css";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  stats: string | number;
  progress: number | string;
}

const StatsCard: React.FC<StatCardProps> = ({ icon, title, stats, progress }) => {
  return (
    <div className={styles.statsCard}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.statsContainer}>
          <div className={styles.stats}>
          {title === "Streaks"
              ? `${stats} days`
              : title === "Amount Spent"
              ? `$${stats}`
              : stats}
          </div>
          {title !== "Amount Spent" && progress && (
            <div className={styles.progress}>
              {title === "Streaks" ? progress : `+${progress}`}
            </div>
          )}
        </div>
      </div>
      <div className={styles.iconBox}>
        <div className={styles.icon}>{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;

