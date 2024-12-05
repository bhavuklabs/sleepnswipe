import React from "react";
import styles from "./InfoArea.module.css";
import { Coins, Heart, Flame, CreditCard } from "lucide-react";
import { ContentPanel, StatsCard } from "../../components";

interface FlashCardProps {
  overallSentimentScore: number | undefined;
  personalityType: string | undefined;
  emotionalStabilityScore: number | undefined;
  socialInteractionScore: number | undefined;
  matchNumbers: number | undefined;
}


const DashboardMainArea: React.FC<FlashCardProps> = ({ matchNumbers, socialInteractionScore, overallSentimentScore, personalityType }) => {
  return (
    <div className={styles.mainArea}>
      {/* Flash Cards */}
      <div className={styles.flashCardContainer}>
        <div className={styles.flashCards}>
          <StatsCard
            title="Tokens"
            icon={<Coins />}
            stats="567"
            progress={55}
          />
          <StatsCard
            title="Matches"
            icon={<Heart />}
            stats={matchNumbers}
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
            stats="98"
            progress=""
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <ContentPanel  socialInteractionScore={socialInteractionScore} overallSentimentScore={overallSentimentScore} personalityType={personalityType}/>
      </div>
    </div>
  );
};

export default DashboardMainArea;
