import React from "react";
import styles from "./Dashboard.module.css";
import { DashboardNavbar, Sidebar, InfoArea } from "../../components";

const Dashboard: React.FC = () => {
  return (
    <>
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
          <InfoArea />
          {/* <MatchZone/> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
