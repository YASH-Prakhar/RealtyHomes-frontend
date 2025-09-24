import React from "react";
import { useAuth } from "../../contexts/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Dashboard</h2>
      <p>Welcome, {user?.name || 'User'}!</p>
      <p>
        Welcome to your user dashboard. Browse properties, save favorites, and
        manage your account here.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={logout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Logout
        </button>
      </div>
      {/* Add more user-specific features here */}
    </div>
  );
};

export default UserDashboard;
