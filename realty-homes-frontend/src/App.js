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
import PropertyDashboard from './components/dashboards/propertyDashboard';
import Home from './components/common/Home'; 

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route 
              path="/properties" 
              element={
                <ProtectedRoute>
                  <PropertyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/property/:id" element={<ProtectedRoute><PropertyDetail /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
