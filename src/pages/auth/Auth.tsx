import React from "react";
import styles from "./Auth.module.css";
import { Login } from "../../components";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Auth: React.FC<AuthProps> = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/"); 
  };

  return (
    <div className={styles.container}>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default Auth;
