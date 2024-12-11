import React from 'react';
import { FaChartBar, FaBox, FaUser, FaDollarSign, FaShoppingCart, FaChartLine, FaCog, FaBars } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {isOpen && <div className="logo">MyLogo</div>}
        </div>
        <div className="toggle-btn-container">
          <FaBars className="toggle-btn" onClick={toggleSidebar} />
        </div>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-item">
          <div className="icon"><FaChartBar /></div>
          {isOpen && <div className="label">Overview</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaBox /></div>
          {isOpen && <div className="label">Products</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaUser /></div>
          {isOpen && <div className="label">Users</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaDollarSign /></div>
          {isOpen && <div className="label">Sales</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaShoppingCart /></div>
          {isOpen && <div className="label">Orders</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaChartLine /></div>
          {isOpen && <div className="label">Analytics</div>}
        </div>
        <div className="sidebar-item">
          <div className="icon"><FaCog /></div>
          {isOpen && <div className="label">Settings</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
