import React from "react";
import styles from "./Dashboard.module.css";
import { Coins, Heart, Flame, CreditCard } from "lucide-react";
import {
  ContentPanel,
  DashboardNavbar,
  Sidebar,
  StatsCard,
} from "../../components";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className={styles.mainArea}>
          {/* Navbar - Full Width */}
          <div className={styles.navbar}>
            <DashboardNavbar />
          </div>

          {/*Flash Cards*/}
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
      </div>
    </>
  );
};

export default Dashboard;
