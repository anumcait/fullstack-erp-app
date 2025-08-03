// src/Component/Common/Toast.jsx
import React from 'react';

const toastColors = {
  success: '#28a745',
  error: '#dc3545',
  info: '#007bff',
  warning: '#ffc107'
};

const Toast = ({ message, type }) => {
  return (
    <div style={{
      backgroundColor: toastColors[type] || '#333',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '6px',
      minWidth: '250px',
      textAlign: 'center',
      fontWeight: 'bold',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      {message}
    </div>
  );
};

export default Toast;
