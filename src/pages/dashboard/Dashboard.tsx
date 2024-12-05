import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { DashboardNavbar, Sidebar, InfoArea, MatchZone, AnalyzingData, Error } from "../../components";
import { useActive } from "../../Context/ActiveContext";
import useDashboardData from "../../hooks/useDashboardData";

const Dashboard: React.FC = () => {
  const { activePath } = useActive();
  const navigate = useNavigate();

  const { data, loading, error } = useDashboardData();




  useEffect(() => {
    if (activePath === "/communityhub") {
      window.location.href = "https://discord.gg/EXt8dgcJ3R";

      navigate("/");
    }
  }, [activePath, navigate]);

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
          <div className={styles.loader}>
            <AnalyzingData />
          </div>
        ) : error ? (
          <div className={styles.error}>
            <Error  error={"Oops! Data Couldn't Load"} errorMessage={"We're having trouble retrieving the information you requested. This could be due to a temporary network issue or server problem."}/>
          </div>
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
