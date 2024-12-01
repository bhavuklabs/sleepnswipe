import React from "react";
import styles from "./QuestionCard.module.css";
import { Coin } from "../../assets/images";

// interface QuestionCardProps {

// }

const QuestionCard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Start of the day</div>
      <div className={styles.questionBox}>
        <span>You wake up in the morning and realize it's a cloudy day. How do you feel?</span>
      </div>

      {/* Divider */}
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

      <div className={styles.options}>
        <button>Relaxed, I enjoy cozy weather</button>
        <button>Neutral, it doesn't affect me much</button>
        <button>A bit down, I miss the sunshine</button>
        <button>Frustrated, I wanted a bright day</button>
        <input type="text" className={styles.customButton} placeholder="What's your personal take on your scenario?"/>
      </div>
      <div className={styles.reward}>
        <span>+1</span>
        <img src={Coin} alt="Token" />
      </div>
    </div>
  );
};

export default QuestionCard;
