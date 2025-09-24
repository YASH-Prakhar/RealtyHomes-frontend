import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Register from './components/auth/register';
import Login from './components/auth/login';
import './App.css';
import UserDashboard from './components/user/dashboard';
import BrokerDashboard from './components/broker/dashboard';

// import Home from './components/Home'; // Uncomment and create Home if needed

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute>
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
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
