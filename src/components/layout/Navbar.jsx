import React from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme } = useTheme();
  
  return (
    <nav className={`navbar navbar-expand-lg ${theme.navbarBg} border-bottom ${theme.borderColor}`}>
      <div className="container">
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
          <ul className="navbar-nav">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;