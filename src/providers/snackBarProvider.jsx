import React, { createContext, useContext, useState, useCallback } from 'react';

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState('success');
  const [snackMessage, setSnackMessage] = useState('');

  const setSnack = useCallback((color, message) => {
    setOpenSnack(true);
    setSnackColor(color);
    setSnackMessage(message);

    // Auto hide after 5 seconds
    setTimeout(() => {
      setOpenSnack(false);
    }, 5000);
  }, []);

  return (
    <>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>

      {/* Bootstrap Alert */}
      <div 
        className="position-fixed end-0 p-3" 
        style={{ 
          top: '1rem', 
          zIndex: 1100,
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          transform: isSnackOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: isSnackOpen ? 1 : 0
        }}
      >
        <div 
          className={`alert alert-${snackColor} d-flex align-items-center shadow-lg`}
          role="alert"
          style={{ minWidth: '250px', maxWidth: '400px' }}
        >
          {/* Icon based on type */}
          {snackColor === 'success' && <i className="bi bi-check-circle-fill me-2"></i>}
          {snackColor === 'danger' && <i className="bi bi-exclamation-circle-fill me-2"></i>}
          {snackColor === 'warning' && <i className="bi bi-exclamation-triangle-fill me-2"></i>}
          {snackColor === 'info' && <i className="bi bi-info-circle-fill me-2"></i>}
          
          <div>{snackMessage}</div>
          
          <button 
            type="button" 
            className="btn-close ms-auto" 
            onClick={() => setOpenSnack(false)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </>
  );
}

// Custom hook to use the snackbar
export const useSnack = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnack must be used within a SnackbarProvider');
  }
  return context;
};

// Helper for type checking
export const SNACK_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info'
};