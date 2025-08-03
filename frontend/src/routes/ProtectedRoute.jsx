// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem('userName');
//   return isAuthenticated ? children : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  if (!userName) {
    return <Navigate to="/" replace />; // not logged in
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

