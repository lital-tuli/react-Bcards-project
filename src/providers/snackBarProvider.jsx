import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [snack, setSnackState] = useState({
    open: false,
    color: 'success',
    message: ''
  });

  const setSnack = useCallback((color, message) => {
    setSnackState({ open: true, color, message });
  }, []);

  useEffect(() => {
    let timer;
    if (snack.open) {
      timer = setTimeout(() => {
        setSnackState(prev => ({ ...prev, open: false }));
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [snack.open]);

  return (
    <>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>

      <div 
        className="position-fixed top-0 end-0 p-3"
        style={{ 
          transform: snack.open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1100
        }}
      >
        <div className={`alert alert-${snack.color} d-flex align-items-center shadow-lg mb-0`}>
          <i className={`bi me-2 ${
            snack.color === 'success' ? 'bi-check-circle-fill' :
            snack.color === 'danger' ? 'bi-x-circle-fill' :
            snack.color === 'warning' ? 'bi-exclamation-triangle-fill' :
            'bi-info-circle-fill'
          }`}></i>
          <div>{snack.message}</div>
        </div>
      </div>
    </>
  );
}

export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnack must be used within SnackbarProvider');
  return context;
};