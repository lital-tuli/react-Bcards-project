import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavoriteCards } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';
import BusinessCard from './BusinessCard';

const FavoriteCards = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFavoriteCards();
      // Make sure each card is marked as favorite
      const favoriteCards = data.map(card => ({ ...card, isFavorite: true }));
      setFavorites(favoriteCards);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to load favorite cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteChange = async (cardId) => {
    // Remove the card from favorites immediately for better UX
    setFavorites(prev => prev.filter(card => card._id !== cardId));
    // Refresh the favorites list
    await fetchFavorites();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className={`mb-4 ${theme.textColor}`}>My Favorite Cards</h1>
      {favorites.length === 0 ? (
        <div className={`text-center py-5 ${theme.textColor}`}>
          <i className="bi bi-heart-break fs-1 mb-3 d-block"></i>
          <p className="mb-4">You haven't added any favorites yet</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Browse Cards
          </button>
        </div>
      ) : (
        <div className="row">
          {favorites.map(card => (
            <BusinessCard 
              key={card._id} 
              card={card}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCards;