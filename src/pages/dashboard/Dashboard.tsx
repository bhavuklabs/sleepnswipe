import React from "react";
import styles from "./Dashboard.module.css";
import { DashboardNavbar, Sidebar, InfoArea, MatchZone } from "../../components"; 
import { useActive } from '../../Context/ActiveContext'

const Dashboard: React.FC = () => {
  const { activePath } = useActive();

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        <div className={styles.navbar}>
          <DashboardNavbar />
        </div>

        {/* Conditional Rendering */}
        {activePath === "/matchzone" ? (
          <MatchZone /> 
        ) : activePath === "/" ? (
          <InfoArea
            overallSentimentScore={0.56}
            personalityType={"Positive"}
            emotionalStabilityScore={0.78}
            socialInteractionScore={0.67}
            matchNumbers={34}
          /> 
        ) : (
          <div>Select a valid route.</div> 
        )}
      </div>
    </div>
  );
};

export default Dashboard;
