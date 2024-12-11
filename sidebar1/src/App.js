import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/SideBar';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    setUserEmail('');
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar isSidebarOpen={isSidebarOpen} onLogout={handleLogout} userEmail={userEmail} />}
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`main-content ${isSidebarOpen ? '' : 'content-closed'}`}>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <AuthForm setIsAuthenticated={setIsAuthenticated} setRole={setRole} setUserEmail={setUserEmail} />} />
            <Route path="/main" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/settings" element={isAuthenticated ? <div>Settings Page</div> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
