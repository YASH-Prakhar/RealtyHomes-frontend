import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';
import './App.css';
import UserDashboard from './components/user/dashboard';
import BrokerDashboard from './components/broker/dashboard';

// import Home from './components/Home'; // Uncomment and create Home if needed

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/broker/dashboard" element={<BrokerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
