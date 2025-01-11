import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container">
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <i className="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                <i className="bi bi-info-circle me-1"></i>About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cards">
                <i className="bi bi-card-text me-1"></i>Cards
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;