import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../modals/Login';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../providers/ThemeProvider';

const Header = () => {
  // Hooks
  const { theme, isDark, toggleDarkMode } = useTheme();
  const { isLoggedIn, handleLogout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // Components
  const SearchBar = () => (
    <form className="d-flex mx-auto" onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="search"
          className={`form-control ${theme.bgColor}`}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={`btn ${theme.btnOutline}`} type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );

  const AuthButtons = () => (
    isLoggedIn ? (
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
    ) : (
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
    )
  );

  return (
    <nav className={`navbar navbar-expand-lg ${theme.navbarBg}`}>
      <div className="container">
        {/* Brand */}
        <Link className={`navbar-brand ${theme.textColor}`} to="/">
          <i className="bi bi-card-text me-2"></i>
          BCard
        </Link>

        {/* Search */}
        <SearchBar />

        {/* Right-side buttons */}
        <div className="d-flex gap-2 align-items-center">
          {/* Theme Toggle */}
          <button 
            className={`btn ${theme.btnOutline}`}
            onClick={toggleDarkMode}
          >
            <i className={`bi bi-${isDark ? 'sun' : 'moon'}-fill`}></i>
          </button>

          {/* Auth Buttons */}
          <AuthButtons />
        </div>
      </div>

      {/* Login Modal */}
      <Login 
        show={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </nav>
  );
};

export default Header;