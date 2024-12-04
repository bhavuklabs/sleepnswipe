import React, { useState } from "react";
import { Google, Facebook, Apple, Logo } from "../../assets/images";
import Slider from "../../components/ImageSlider/ImageSlider";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";




const Auth: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    navigate("/questions");
    e.preventDefault();
  };
  

  const AuthButton = ({ icon }: { icon: string }) => (
    <button className={styles.authButton}>
      <img src={icon} alt="Auth icon" className={styles.icon} />
    </button>
  );

  const toggleAuthMode = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className={styles.authContainer}>
      {/* Login Panel */}
      <div className={`${styles.leftPanel} ${isSignup ? styles.hidden : ""}`}>
        <img src={Logo} className={styles.logo} alt="Logo" />
        <h2 className={styles.tagline}>Swipe Right on Wellness, Love and Life</h2>
        <div className={styles.authButtons}>
          <AuthButton icon={Google} />
          <AuthButton icon={Facebook} />
          <AuthButton icon={Apple} />
        </div>
        <div className={styles.divider}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="2"
            viewBox="0 0 234 1"
            fill="none"
          >
            <path
              d="M0 0.5H233.25"
              stroke="url(#paint0_linear_left)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_left"
                x1="0"
                y1="0.5"
                x2="233"
                y2="0.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#020515" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#020515" />
                <stop offset="1" stopColor="#020515" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          <span>or</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="2"
            viewBox="0 0 234 1"
            fill="none"
          >
            <path
              d="M0 0.5H233.25"
              stroke="url(#paint0_linear_right)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_right"
                x1="0"
                y1="0.5"
                x2="233"
                y2="0.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#020515" stopOpacity="1" />
                <stop offset="0.5" stopColor="#020515" />
                <stop offset="1" stopColor="#020515" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            required
          />
          <button type="submit" className={styles.submitButton}>
            Let’s Reconnect!
          </button>
        </form>
        <div className={styles.footer}>
          Don't have an account?{" "}
          <a href="#" onClick={toggleAuthMode}>
            Sign up
          </a>
        </div>
      </div>

      {/* Slider Panel */}
      <div className={`${!isSignup ? styles.leftPanelSlider : styles.rightPanelSlider}`}>
        <Slider />
      </div>

      {/* Signup Panel */}
      <div className={`${styles.rightPanel} ${!isSignup ? styles.hidden : ""}`}>
        <img src={Logo} className={styles.logo} alt="Logo" />
        <h2 className={styles.tagline}>Join the Journey to Love and Balance</h2>
        <div className={styles.authButtons}>
          <AuthButton icon={Google} />
          <AuthButton icon={Facebook} />
          <AuthButton icon={Apple} />
        </div>
        <div className={styles.divider}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="2"
            viewBox="0 0 234 1"
            fill="none"
          >
            <path
              d="M0 0.5H233.25"
              stroke="url(#paint0_linear_left)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_left"
                x1="0"
                y1="0.5"
                x2="233"
                y2="0.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#020515" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#020515" />
                <stop offset="1" stopColor="#020515" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
          <span>or</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="2"
            viewBox="0 0 234 1"
            fill="none"
          >
            <path
              d="M0 0.5H233.25"
              stroke="url(#paint0_linear_right)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_right"
                x1="0"
                y1="0.5"
                x2="233"
                y2="0.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#020515" stopOpacity="1" />
                <stop offset="0.5" stopColor="#020515" />
                <stop offset="1" stopColor="#020515" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <form className={styles.form}>
          <input type="text" className={styles.input} placeholder="Full Name" required />
          <input type="email" className={styles.input} placeholder="Email" required />
          <input type="password" className={styles.input} placeholder="Password" required />
          <button type="submit" className={styles.submitButton}>Sign Up</button>
        </form>
        <div className={styles.footer}>
          Already have an account?{" "}
          <a href="#" onClick={toggleAuthMode}>
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
