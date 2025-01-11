import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5>BCard</h5>
            <p className="text-muted">
              Your professional business card management platform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/cards" className="text-light">Cards</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt me-2"></i>123 Street, City</li>
              <li><i className="bi bi-envelope me-2"></i>info@bcard.com</li>
              <li><i className="bi bi-phone me-2"></i>+1 234 567 890</li>
            </ul>
          </div>
        </div>

        <hr className="bg-secondary" />
        <div className="text-center text-muted">
          <small>© {new Date().getFullYear()} BCard. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;