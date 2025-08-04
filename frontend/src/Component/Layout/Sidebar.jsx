import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isSubMenuOpen, setSubMenuOpen] = useState({
    employeeMenu: false,
    leaveMenu: false,
  });

  const sidebarRef = useRef(null);

  // Function to toggle the menu or close if already open
  const toggleSubMenu = (menuToToggle) => {
    setSubMenuOpen((prevState) => {
      // Check if the clicked menu is already open
      const isMenuAlreadyOpen = prevState[menuToToggle];
      const newState = {
        employeeMenu: false,
        leaveMenu: false,
      };

      if (isMenuAlreadyOpen) {
        // If the menu is already open, close it
        return newState;
      }

      // Otherwise, open the clicked menu
      newState[menuToToggle] = true;
      return newState;
    });
  };

  // Close submenu when clicking outside the sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSubMenuOpen({
        employeeMenu: false,
        leaveMenu: false,
      });
    }
  };

  // Close the submenu when clicking on a submenu link
  const closeMenuOnLinkClick = (menuToClose) => {
    setSubMenuOpen((prevState) => ({
      ...prevState,
      [menuToClose]: false,
    }));
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="sidebar" ref={sidebarRef}>
      <ul>
        <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>

        {/* Employee Menu */}
        <li className={`menu-item ${isSubMenuOpen.employeeMenu ? 'open' : ''}`}>
          <span onClick={() => toggleSubMenu('employeeMenu')}>Employee</span>
          {isSubMenuOpen.employeeMenu && (
            <ul className="submenu open">
              <li><NavLink to="/add-employee" activeClassName="active" onClick={() => closeMenuOnLinkClick('employeeMenu')}>Add Employee</NavLink></li>
              <li><NavLink to="/employees" activeClassName="active" onClick={() => closeMenuOnLinkClick('employeeMenu')}>Employee Report</NavLink></li>
            </ul>
          )}
        </li>

        {/* Leave Menu */}
        <li className={`menu-item ${isSubMenuOpen.leaveMenu ? 'open' : ''}`}>
          <span onClick={() => toggleSubMenu('leaveMenu')}>Leave</span>
          {isSubMenuOpen.leaveMenu && (
            <ul className="submenu open">
              <li><NavLink to="/leave" activeClassName="active" onClick={() => closeMenuOnLinkClick('leaveMenu')}>Leave Form</NavLink></li>
              <li><NavLink to="/leave-report" activeClassName="active" onClick={() => closeMenuOnLinkClick('leaveMenu')}>Leave Report</NavLink></li>
            </ul>
          )}
        </li>
         <li><NavLink to="/onduty" activeClassName="active">Onduty</NavLink></li>

      </ul>
    </aside>
  );
};

export default Sidebar;
