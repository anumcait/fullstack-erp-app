import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/leave-form">Leave Application New</NavLink></li>
      <li><NavLink to="/leave-report">Leave Report</NavLink></li>
      <li><NavLink to="/add-employee">Add Employee</NavLink></li>
      <li><NavLink to="/employees">Employee Report</NavLink></li>

      <li><NavLink to="/onduty">Onduty</NavLink></li>
      <li><NavLink to="/edit-item">Item</NavLink></li>
      {/* Add more links as needed */}
    </ul>
  </aside>
);

export default Sidebar;
