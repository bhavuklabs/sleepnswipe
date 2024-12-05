import React, { useEffect } from "react";
import { LayoutDashboard, Heart, Trophy, Users, Award, Coins, User, Settings, FileText, CreditCard, Rocket, ArrowRight } from "lucide-react";
import { useActive } from '../../../Context/ActiveContext'
import queMark from "../../../assets/images/questionMarkIcon.png";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const { activePath, setActivePath } = useActive(); 

  const SidebarButton: React.FC<{ icon: React.ReactNode, text: string, to: string }> = ({ icon, text, to }) => {
    const isActive = activePath === to;

    useEffect(() => {
      if (isActive) {
        setActivePath(to);
      }
    }, [isActive, to]);

    const handleClick = () => {
      setActivePath(to); 
    };

    return (
      <button
        className={`${styles.sidebarButton} ${isActive ? styles.activeButton : ''}`}
        onClick={handleClick} 
      >
        {typeof icon === "string" ? (
          <img src={icon} alt="" />
        ) : (
          <span className={isActive ? styles.activeIcon : ''}>{icon}</span>
        )}
        <span>{text}</span>
      </button>
    );
  };

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
          <SidebarButton icon={<LayoutDashboard />} text="Dashboard" to="/" />
          <SidebarButton icon={<Heart />} text="Match Zone" to="/matchzone" />
          <SidebarButton icon={<Trophy />} text="Challenges" to="/challenges" />
          <SidebarButton icon={<Users />} text="Community Hub" to="/communityhub" />
          <SidebarButton icon={<Award />} text="Rewards" to="/rewards" />
          <SidebarButton icon={<Coins />} text="Token Store" to="/tokenstore" />
        </div>

        {/* Account Settings Section */}
        <div className={styles.accountSettings}>
          <p className={styles.accountSettingsText}>Account Settings</p>
          <SidebarButton icon={<User />} text="Profile" to="/profile" />
          <SidebarButton icon={<FileText />} text="Reports" to="/reports" />
          <SidebarButton icon={<Settings />} text="Settings" to="/settings" />
          <SidebarButton icon={<CreditCard />} text="Billing" to="/billing" />
          <SidebarButton icon={<Rocket />} text="Upgrade to Pro" to="/upgradetopro" />
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
