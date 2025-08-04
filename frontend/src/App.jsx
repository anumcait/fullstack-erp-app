import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import DashBoard from "./Component/DashBoard/DashBoard";

import LoginForm from "./Component/LoginForm/LoginForm";
import ChangePasswordForm from "./Component/ChangePasswordForm/ChangePasswordForm"
// import IssueMaterialModule from "./Component/IssueMaterial/IssueMaterialModule";
import EmployeeReportForm from "./Component/Employee/EmployeeMasterReport";
import AddEmployeeForm from "./Component/Employee/AddEmployee";
import LeaveForm from "./Component/LeaveApplication/LeaveForm";
import LeaveReport from "./Component/LeaveApplication/LeaveReport";
import { ToastProvider } from "./context/ToastContext";
import MainLayout from "./Component/Layout/MainLayout";
// import OnDutyForm from "./Component/onduty/OnDutyForm";
import OnDutyPreview from "./Component/onduty/OnDutyPreview";
import OnDutyDashboard from "./Component/onduty/OnDutyDashboard";
import EditItem from "./Component/ItemMaster/EditItem";
import { ThemeProvider } from '@mui/material/styles';
 import theme from './theme.js';
import LeaveDashboard from "./Component/LeaveApplication/LeaveDashboard.jsx";

function App() {
  return (
     <ThemeProvider theme={theme}>
     <ToastProvider>
    <div className="App">
     
       <Router>
      <Routes >
        
        <Route path="/" element={<LoginForm />} />
        <Route element={
          // <ProtectedRoute>
            <MainLayout />
          // </ProtectedRoute>
        }>
        <Route path="/dashboard" element={<DashBoard/>} />

        <Route path="/leave" element={<LeaveDashboard />} />
        {/* <Route path="/leave-form" element={<LeaveDashboard />} /> */}
        {/* <Route path="/leave-report" element={<LeaveReport />} /> */}
        <Route path="/employees" element={<EmployeeReportForm />} />
        <Route path="/add-employee" element={<AddEmployeeForm />} />

        <Route path="/onduty" element={<OnDutyDashboard />} />
        {/* <Route path="/onduty" element={<OnDutyForm />} /> */}
        <Route path="/onduty-preview" element={<OnDutyPreview />} />

        <Route path="/edit-item" element={<EditItem />} />

        <Route path="/dashboard" element={<DashBoard />} />
       
      </Route>
      </Routes>
    </Router> 
    </div>
    </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
