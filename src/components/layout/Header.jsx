// components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

const Header = ({ darkMode, setDarkMode }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // const { isLoggedIn, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    // Add any additional cleanup or redirect logic
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-card-text me-2"></i>
          BCard
        </Link>

        {/* Search */}
        <form className="d-flex mx-auto" onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        {/* Auth Buttons */}
        <div className="d-flex gap-2 align-items-center">
          <button 
            className="btn btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            <i className={`bi bi-${darkMode ? 'sun' : 'moon'}-fill`}></i>
          </button>

          {/* {isLoggedIn ? ( */}
            <>
              <Link to="/profile" className="btn btn-outline-light">
                <i className="bi bi-person-circle me-1"></i>
                My Profile
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-light">
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </>
          {/* ) : ( */}
            <>
              <Link to="/register" className="btn btn-outline-light">
                Register
              </Link>
              <button 
                className="btn btn-light"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </>
          {/* )} */}
        </div>
      </div>

      <Login 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </nav>
  );
};

export default Header;