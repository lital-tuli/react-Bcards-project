import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../providers/ThemeProvider';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="container text-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`${theme.textColor}`}>
            <h1 className="display-1 fw-bold">404</h1>
            <div className="mb-4">
              <div className="display-6 mb-3">Oops!</div>
              <p className="lead mb-4">
                The page you're looking for seems to have taken a vacation.
              </p>
            </div>
            
            <div className="mb-4">
              <i className="bi bi-emoji-dizzy fs-1"></i>
            </div>

            <Link 
              to="/" 
              className={`btn btn-lg ${theme.btnOutline}`}
            >
              <i className="bi bi-house-door me-2"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;