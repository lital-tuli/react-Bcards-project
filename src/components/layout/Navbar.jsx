// Updated Navbar.jsx
import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from '../common/SearchBar';

const Navbar = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuth();
  
  return (
    <nav className={`navbar navbar-expand-lg ${theme.navbarBg} border-bottom ${theme.borderColor}`}>
      <div className="container">
        <Link className={`navbar-brand ${theme.textColor}`} to="/">
          <i className="bi bi-card-text me-2"></i>
          BCard
        </Link>

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
          
          <SearchBar />

          {isLoggedIn && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <i className="bi bi-person-circle me-1"></i>
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-cards" className="nav-link">
                  <i className="bi bi-collection me-1"></i>
                  My Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                  <i className="bi bi-heart me-1"></i>
                  Favorites
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;