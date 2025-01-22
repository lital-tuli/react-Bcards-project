import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize search term from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  }, [location.search]);

  // Update search results in real-time as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Update URL immediately with each keystroke
    if (location.pathname !== '/') {
      navigate(`/?search=${value}`);
    } else {
      navigate(`?search=${value}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    navigate(location.pathname);
  };

  return (
    <div className="ms-2" style={{ width: '300px' }}>
      <div className="input-group">
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search cards"
        />
        {searchTerm && (
          <button 
            type="button" 
            className="btn btn-outline-secondary btn-sm"
            onClick={handleClear}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
        <button className="btn btn-outline-primary btn-sm">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;