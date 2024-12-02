import React from "react";
import queMark from "../../../assets/images/questionMarkIcon.png";
import {
  Heart,
  LayoutDashboard,
  Trophy,
  Users,
  Award,
  Coins,
  User,
  Settings,
  FileText,
  CreditCard,
  Rocket,
  ArrowRight,
} from "lucide-react";
import styles from "./Sidebar.module.css";

interface SidebarButtonProps {
  icon: React.ReactNode;
  text: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, text }) => {
  return (
    <button className={styles.sidebarButton}>
      {typeof icon === "string" ? (
        <img src={icon} alt="" />
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
        <div className={styles.toggle}>
          <ArrowRight />
        </div>
      </div>

      {/* Divider Line */}
      <div className="divider">
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
      </div>

      {/* Navigation Buttons */}
      <nav className={styles.nav}>
        <div className={styles.buttonGroup}>
          <SidebarButton icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarButton icon={<Heart />} text="Match Zone" />
          <SidebarButton icon={<Trophy />} text="Challenges" />
          <SidebarButton icon={<Users />} text="Community Hub" />
          <SidebarButton icon={<Award />} text="Rewards" />
          <SidebarButton icon={<Coins />} text="Token Store" />
        </div>

        {/* Account Settings Section */}
        <div className={styles.accountSettings}>
          <p className={styles.accountSettingsText}>Account Settings</p>
          <SidebarButton icon={<User />} text="Profile" />
          <SidebarButton icon={<FileText />} text="Reports" />
          <SidebarButton icon={<Settings />} text="Settings" />
          <SidebarButton icon={<CreditCard />} text="Billing" />
          <SidebarButton icon={<Rocket />} text="Upgrade to Pro" />
        </div>
        <div className={styles.learnCard}>
          <img src={queMark} alt="" />
          <span>Need help?</span>
          <p>Learn how to sleep better</p>
          <button>Watch Our Guide</button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
