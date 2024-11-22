import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from './logo.png'; // Import the logo from the same directory

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/">Rankings</Link></li>
        <li><Link to="/view-parameters">View Parameters</Link></li>
        <li><Link to="/edit-parameter">Edit Parameters</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
