import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isSidebarOpen, onLogout, userEmail }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/main'); // Navigate to the dashboard page
  };

  const handleSettingsClick = () => {
    navigate('/settings'); // Navigate to the settings page
  };

  const handleLogoutClick = () => {
    onLogout(); // Perform logout logic
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className={`navbar ${isSidebarOpen ? '' : 'closed'}`}>
      <div className="navbar-logo">MyLogo</div>
      <ul className="navbar-links">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">Services</li>
        <li className="navbar-item profile-dropdown">
          Profile
          <div className="dropdown-menu">
            <div className="dropdown-header">{userEmail}</div>
            <div className="dropdown-item" onClick={handleProfileClick}>Profile</div>
            <div className="dropdown-item" onClick={handleSettingsClick}>Settings</div>
            <div className="dropdown-item" onClick={handleLogoutClick}>Logout</div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
