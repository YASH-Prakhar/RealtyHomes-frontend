import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const BrokerDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Broker Dashboard</h2>
      <p>Welcome, {user?.name || 'Broker'}!</p>
      <p>
        Welcome to your broker dashboard. Here you can manage your listings,
        view inquiries, and update your profile.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={logout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Logout
        </button>
      </div>
      {/* Add more broker-specific features here */}
    </div>
  );
};

export default BrokerDashboard;
