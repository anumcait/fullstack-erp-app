import React, { useState, useRef, useEffect } from "react";
import OnDutyForm from "./OnDutyForm";
import OnDutyTable from "./OnDutyTable";
import './OnDutyDashboard.css';

const OnDutyDashboard = () => {
  const [selectedAction, setSelectedAction] = useState("table");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const actions = [
    { label: "New", value: "new" },
    { label: "View List", value: "table" },
    { label: "Export", value: "export" }
  ];

  const handleMenuClick = (action) => {
    setSelectedAction(action);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="od-dashboard-container">
      {/* Header Row */}
      <div className="od-dashboard-header">
        <h2 className="od-dashboard-title">On Duty Dashboard </h2>
        <div className="od-dropdown-wrapper" ref={dropdownRef}>
          <button className="od-dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            ☰
          </button>
          {dropdownOpen && (
            <ul className="od-dropdown-menu">
              {actions.map((action) => (
                <li key={action.value} onClick={() => handleMenuClick(action.value)}>
                  {action.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Content based on menu click */}
      <div className="od-dashboard-content">
        {selectedAction === "table" && <OnDutyTable />}
        {selectedAction === "new" && <OnDutyForm />}
        {/* Optionally handle "export" here */}
      </div>
    </div>
  );
};

export default OnDutyDashboard;
