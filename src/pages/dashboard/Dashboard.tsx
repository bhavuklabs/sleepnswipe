import React from "react";
import styles from "./Dashboard.module.css";
import { DashboardNavbar, Sidebar, InfoArea } from "../../components";
import { useDashboardData } from '../../hooks'

const Dashboard: React.FC = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Navbar - Full Width */}
        <div className={styles.navbar}>
          <DashboardNavbar />
        </div>

        {/* Dashboard Main Area */}
        <InfoArea 
          overallSentimentScore={data?.overallSentimentScore}
          personalityType={data?.personalityType}
          emotionalStabilityScore={data?.emotionalStabilityScore}
          socialInteractionScore={data?.socialInteractionScore}
          matchNumbers={data?.matchNumbers}
        />
        {/* <MatchZone/> */}
      </div>
    </div>
  );
};

export default Dashboard;
