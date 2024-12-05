import React from "react";
import styles from "./Dashboard.module.css";
import { DashboardNavbar, Sidebar, InfoArea, MatchZone } from "../../components";
import { useActive } from '../../Context/ActiveContext';
import useDashboardData from '../../hooks/useDashboardData';

const Dashboard: React.FC = () => {
  const { activePath } = useActive();
  let { data, loading, error } = useDashboardData();

  data = {
      "overallSentimentScore": 0.68,
      "personalityType": "ENFJ",
      "emotionalStabilityScore": 0.0,
      "socialInteractionScore": 0.85,
      "matchNumbers": 2
  };

  loading = false;

  error = '';


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

        {/* Show loader until data is fetched */}
        {loading ? (
          <div className={styles.loader}>Analysing your data and generating your profile...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : activePath === "/matchzone" ? (
          <MatchZone />
        ) : activePath === "/" && data ? (
          <InfoArea
            overallSentimentScore={data.overallSentimentScore}
            personalityType={data.personalityType}
            emotionalStabilityScore={data.emotionalStabilityScore}
            socialInteractionScore={data.socialInteractionScore}
            matchNumbers={data.matchNumbers}
          />
        ) : (
          <div>Select a valid route.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
