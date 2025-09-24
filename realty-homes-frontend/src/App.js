import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navigation from './components/common/Navigation';
import Register from './components/auth/register';
import Login from './components/auth/login';
import './App.css';
import UserDashboard from './components/dashboards/userDashboard';
import BrokerDashboard from './components/dashboards/brokerDashboard';
import PropertyDetail from "./components/common/PropertyDetail";

// import Home from './components/Home'; // Uncomment and create Home if needed

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/dashboard" element={<ProtectedRoute />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/broker/dashboard" 
              element={
                <ProtectedRoute requiredRole="broker">
                  <BrokerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
