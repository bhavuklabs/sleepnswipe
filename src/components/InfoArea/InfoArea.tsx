import React from "react";
import styles from "./InfoArea.module.css";
import { Coins, Heart, Flame, CreditCard } from "lucide-react";
import { ContentPanel, StatsCard } from "../../components";

const DashboardMainArea: React.FC = () => {
  return (
    <div className={styles.mainArea}>
      {/* Flash Cards */}
      <div className={styles.flashCardContainer}>
        <div className={styles.flashCards}>
          <StatsCard
            title="Tokens"
            icon={<Coins />}
            stats="53000"
            progress={55}
          />
          <StatsCard
            title="Matches"
            icon={<Heart />}
            stats="472"
            progress={10}
          />
          <StatsCard
            title="Streaks"
            icon={<Flame />}
            stats="3"
            progress="streak"
          />
          <StatsCard
            title="Amount Spent"
            icon={<CreditCard />}
            stats="98476"
            progress=""
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <ContentPanel />
      </div>
    </div>
  );
};

export default DashboardMainArea;
