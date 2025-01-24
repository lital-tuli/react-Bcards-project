import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from '../common/SearchBar';
import Login from '../modals/Login';
import Logout from '../modals/Logout';

const Navbar = () => {
  const { theme, isDark, toggleDarkMode } = useTheme();
  const { isLoggedIn, handleLogout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const AuthButtons = () => {
    if (isLoggedIn) {
      return (
        <li className="nav-item">
          <button 
            onClick={() => setShowLogout(true)} 
            className={`nav-link btn btn-link ${theme.textColor}`}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        </li>
      );
    }

    return (
      <>
        <li className="nav-item">
          <button
            onClick={() => setShowLogin(true)}
            className={`nav-link btn btn-link ${theme.textColor}`}
          >
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Login
          </button>
        </li>
        <li className="nav-item">
          <Link to="/register" className={`nav-link ${theme.textColor}`}>
            <i className="bi bi-person-plus me-1"></i>
            Register
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${theme.navbarBg} border-bottom ${theme.borderColor}`}>
        <div className="container position-relative">
          {/* Left side - Theme Toggle and Brand */}
          <div className="d-flex align-items-center">
            <button
              className={`btn ${theme.btnOutline} me-2`}
              onClick={toggleDarkMode}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
            >
              <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>

            <Link className={`navbar-brand ${theme.textColor}`} to="/">
              <i className="bi bi-card-text me-2"></i>
              BCard
            </Link>
          </div>

          <button 
            className={`navbar-toggler ${theme.borderColor}`}
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className={`navbar-toggler-icon ${theme.textColor}`}></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left side navigation items */}
            <ul className="navbar-nav me-2">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${theme.textColor}`}
                  aria-current="page"
                >
                  <i className="bi bi-house me-1"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${theme.textColor}`}
                >
                  <i className="bi bi-info-circle me-1"></i>
                  About
                </Link>
              </li>
            </ul>
            
            {/* Centered SearchBar */}
            <div className="d-flex justify-content-center flex-grow-1 my-3 my-lg-0">
              <SearchBar />
            </div>

            {/* Right side - Authentication and User Menu */}
            <ul className="navbar-nav ms-auto">
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile" className={`nav-link ${theme.textColor}`}>
                      <i className="bi bi-person-circle me-1"></i>
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/my-cards" className={`nav-link ${theme.textColor}`}>
                      <i className="bi bi-collection me-1"></i>
                      My Cards
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/favorites" className={`nav-link ${theme.textColor}`}>
                      <i className="bi bi-heart me-1"></i>
                      Favorites
                    </Link>
                  </li>
                  <AuthButtons />
                </>
              ) : (
                <AuthButtons />
              )}
            </ul>
          </div>
        </div>
      </nav>

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

export default Navbar;