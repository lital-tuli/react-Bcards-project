import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../providers/ThemeProvider';

const Header = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme.navbarBg} py-2`}>
      <div className="container position-relative">
        <div className="row align-items-center">
          {/* Center - Logo */}
          <div className="col-12 text-center">
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
        </div>
      </div>
    </div>
  );
};

export default Header;