import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../providers/ThemeProvider';
import Login from '../modals/Login';

const Header = () => {
  const { theme } = useTheme();
  const { isLoggedIn, user, handleLogout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

 

  

  // Authentication buttons component
  const AuthButtons = () => {
    if (isLoggedIn) {
      return (
        <div className="d-flex gap-2">
          <Link to="/profile" className={`btn ${theme.btnOutline}`}>
            <i className="bi bi-person-circle me-1"></i>
            My Profile
          </Link>
          <Link to="/my-cards" className={`btn ${theme.btnOutline}`}>
            <i className="bi bi-collection me-1"></i>
            My Cards
          </Link>
          <Link to="/favorites" className={`btn ${theme.btnOutline}`}>
            <i className="bi bi-heart me-1"></i>
            Favorites
          </Link>
          <button 
            onClick={handleLogout} 
            className={`btn ${theme.btnOutline}`}
          >
            <i className="bi bi-box-arrow-right me-1"></i>
            Logout
          </button>
        </div>
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
      <nav className={`navbar navbar-expand-lg ${theme.navbarBg}`}>
        <div className="container">
          <Link className={`navbar-brand ${theme.textColor}`} to="/">
            <i className="bi bi-card-text me-2"></i>
            BCard
          </Link>


          <div className="d-flex gap-2 align-items-center">
            <AuthButtons />
          </div>
        </div>
      </nav>

      <Login 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </>
  );
};

export default Header;