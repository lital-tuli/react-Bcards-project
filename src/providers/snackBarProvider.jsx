// SnackbarProvider.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [isSnackOpen, setOpenSnack] = useState(false);
  const [snackColor, setSnackColor] = useState('success');
  const [snackMessage, setSnackMessage] = useState('');
  const [queue, setQueue] = useState([]);

  const setSnack = useCallback((color, message) => {
    if (isSnackOpen) {
      setQueue(prev => [...prev, { color, message }]);
      return;
    }

    setSnackColor(color);
    setSnackMessage(message);
    setOpenSnack(true);

    setTimeout(() => {
      setOpenSnack(false);
      setTimeout(() => {
        if (queue.length > 0) {
          const nextSnack = queue[0];
          setQueue(prev => prev.slice(1));
          setSnack(nextSnack.color, nextSnack.message);
        }
      }, 300);
    }, 3000);
  }, [isSnackOpen, queue]);

  return (
    <>
      <SnackbarContext.Provider value={setSnack}>
        {children}
      </SnackbarContext.Provider>

      <div 
        className={`position-fixed top-0 end-0 p-3 ${isSnackOpen ? 'show' : ''}`}
        style={{ 
          zIndex: 1100,
          transition: 'transform 0.3s ease-in-out',
          transform: isSnackOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
      >
        <div 
          className={`alert alert-${snackColor} d-flex align-items-center shadow-lg mb-0`}
          role="alert"
        >
          {snackColor === 'success' && <i className="bi bi-check-circle-fill me-2"></i>}
          {snackColor === 'danger' && <i className="bi bi-x-circle-fill me-2"></i>}
          {snackColor === 'warning' && <i className="bi bi-exclamation-triangle-fill me-2"></i>}
          {snackColor === 'info' && <i className="bi bi-info-circle-fill me-2"></i>}
          
          <div>{snackMessage}</div>
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