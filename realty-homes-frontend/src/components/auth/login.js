import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "../../assets/styles/register.module.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Email and Password are required.");
      setLoading(false);
      return;
    }

    const result = await login(form);
    setLoading(false);
    
    if (result.success) {
      // Navigate based on user role
      const userRole = result.user?.role;
      if (userRole === "broker") {
        navigate("/broker/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Login to RealtyHomes</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
