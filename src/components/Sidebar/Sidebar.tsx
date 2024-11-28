import React from "react";
import {
  Home,
  Settings,
  LogOut,
} from "lucide-react";
import { Rewards, Community, Leaderboard, Tokens, MZone  } from "../../assets/images";
import styles from "./Sidebar.module.css";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text }) => {
  return (
    <button className={styles.sidebarButton}>
      {typeof icon === 'string' ? (
        <img src={icon} alt=""/>
      ) : (
        <span>{icon}</span>
      )}
      <span>{text}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <h1>HeartLine</h1>
      </div>

      {/* Divider Line */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="2"
        viewBox="0 0 234 1"
        fill="none"
      >
        <path d="M0 0.5H233.25" stroke="url(#paint0_linear_7_100)" />
        <defs>
          <linearGradient
            id="paint0_linear_7_100"
            x1="0"
            y1="0.5"
            x2="231"
            y2="0.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#020515" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#020515" />
            <stop offset="1" stopColor="#020515" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation Buttons */}
      <nav className={styles.nav}>
        <div className={styles.buttonGroup}>
          <SidebarButton icon={<Home />} text="Dashboard" />
          <SidebarButton icon={MZone} text="Match Zone" />
          <SidebarButton icon={Leaderboard} text="Challenges" />
          <SidebarButton icon={Community} text="Community Hub" />
          <SidebarButton icon={Rewards} text="Rewards" />
          <SidebarButton icon={Tokens} text="Token Store" />
        </div>

        {/* Account Settings Section */}
        <div className={styles.accountSettings}>
          <p className={styles.accountSettingsText}>Account Settings</p>
          <SidebarButton icon={<Settings />} text="Settings" />
          <SidebarButton icon={<LogOut />} text="Logout" />
          <SidebarButton icon={<LogOut />} text="Logout" />
          <SidebarButton icon={<LogOut />} text="Logout" />
          <SidebarButton icon={<LogOut />} text="Logout" />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
