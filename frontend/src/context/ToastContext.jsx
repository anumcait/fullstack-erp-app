// src/Context/ToastContext.jsx
import React, { createContext, useContext, useState } from 'react';
import Toast from '../Component/Common/Toast';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.message && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
        }}>
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </ToastContext.Provider>
  );
};
