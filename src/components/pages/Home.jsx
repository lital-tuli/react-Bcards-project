// components/Home.jsx
import React, { useState, useEffect } from 'react';
import { getAllCards } from '../../services/CardService';
import BusinessCard from '../cards/BusinessCard';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCards();
  }, []);

const fetchCards = async () => {
  try {
    setLoading(true);
    console.log('Fetching cards...');
    const data = await getAllCards();
    console.log('Received data:', data);
    setCards(data);
  } catch (err) {
    console.error('Error details:', err);
    setError(err.message || 'Failed to fetch cards');
  } finally {
    setLoading(false);
  }
};
  // Filter cards based on search term
  const filteredCards = cards.filter(card => 
    card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="display-4">Welcome to BCard</h1>
        <p className="lead text-muted">
          Discover and connect with businesses through their digital cards
        </p>
      </header>

      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <div className="input-group">
            <input 
              type="search" 
              className="form-control"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <i className="bi bi-inbox-fill fs-1 d-block mb-3"></i>
              {searchTerm ? 'No cards match your search' : 'No cards available'}
            </div>
          </div>
        ) : (
          filteredCards.map((card) => (
            <BusinessCard 
              key={card._id || card.id}  
              card={card} 
              onRefresh={fetchCards}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;