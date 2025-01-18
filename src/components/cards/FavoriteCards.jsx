import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { getFavoriteCards } from '../../services/CardService';

const FavoriteCards = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteCards();
        setFavorites(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Favorite Cards</h1>
      <div className="row">
        {favorites.map(card => (
          <BusinessCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FavoriteCards;