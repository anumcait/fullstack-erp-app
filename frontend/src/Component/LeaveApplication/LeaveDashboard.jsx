import React, { useState, useRef, useEffect } from "react";
import LeaveReport from "./LeaveReport";
import './LeaveDashboard.css';
import LeaveForm from "./LeaveForm";

const LeaveDashboard = () => {
  const [selectedAction, setSelectedAction] = useState("report");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const actions = [
    { label: "New", value: "new" },
    { label: "Leave Report", value: "report" },
    { label: "Export", value: "export" }
  ];

  const handleMenuClick = (action) => {
    setSelectedAction(action);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="leave-dashboard-container">
      <div className="leave-dashboard-header">
        <h2 className="leave-dashboard-title">Leave Dashboard</h2>
        <div className="leave-dropdown-wrapper" ref={dropdownRef}>
          <button className="leave-dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            ☰
          </button>
          {dropdownOpen && (
            <ul className="leave-dropdown-menu">
              {actions.map((action) => (
                <li key={action.value} onClick={() => handleMenuClick(action.value)}>
                  {action.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="leave-dashboard-content">
        {selectedAction === "new" && <LeaveForm />}
        {selectedAction === "report" && <LeaveReport />}
        {selectedAction === "export" && <p style={{ padding: "20px" }}>📤 Please use export buttons inside the report.</p>}
      </div>
    </div>
  );
};

export default LeaveDashboard;
