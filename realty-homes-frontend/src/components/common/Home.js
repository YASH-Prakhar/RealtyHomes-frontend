import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to Realty Homes</h1>
      <p>Your one-stop solution for finding and managing properties.</p>
      <div className={styles.buttonContainer}>
        <button onClick={() => navigate("/login")} className={styles.homeButton}>
          Login
        </button>
        <button onClick={() => navigate("/register")} className={styles.homeButton}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
