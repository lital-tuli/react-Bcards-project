import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../providers/ThemeProvider';
import Login from '../modals/Login';
import Logout from '../modals/Logout';

const Header = () => {
  const { theme, isDark, toggleDarkMode } = useTheme();
  const { isLoggedIn, handleLogout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // Authentication buttons component
  const AuthButtons = () => {
    if (isLoggedIn) {
      return (
        <button 
          onClick={() => setShowLogout(true)} 
          className={`btn ${theme.btnOutline}`}
        >
          <i className="bi bi-box-arrow-right me-1"></i>
          Logout
        </button>
      );
    }

    return (
      <div className="d-flex gap-2">
        <button
          onClick={() => setShowLogin(true)}
          className={`btn ${theme.btnOutline}`}
        >
          <i className="bi bi-box-arrow-in-right me-1"></i>
          Login
        </button>
        <Link to="/register" className={`btn ${theme.btnOutline}`}>
          <i className="bi bi-person-plus me-1"></i>
          Register
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className={`${theme.navbarBg} py-2`}>
        <div className="container position-relative">
          <div className="row align-items-center">
            {/* Left side - Theme Toggle */}
            <div className="col-4 text-start">
              <button
                className={`btn ${theme.btnOutline}`}
                onClick={toggleDarkMode}
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              >
                <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
              </button>
            </div>
            
            {/* Center - Logo */}
            <div className="col-4 text-center">
              <Link 
                to="/" 
                className={`text-decoration-none ${theme.textColor}`}
              >
                <h1 className="mb-0 display-6 fw-bold">
                  <i className="bi bi-card-text me-2"></i>
                  BCards
                </h1>
              </Link>
            </div>
            
            {/* Right side - Auth Buttons */}
            <div className="col-4 text-end">
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>

      <Login 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
      />

      <Logout 
        show={showLogout}
        handleClose={() => setShowLogout(false)}
        handleLogout={() => {
          handleLogout();
          setShowLogout(false);
        }}
      />
    </>
  );
};

export default Header;