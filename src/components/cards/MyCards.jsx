import React, { useState, useEffect } from 'react';
import { getMyCards } from '../../services/CardService';
import BusinessCard from '../cards/BusinessCard';
import { useTheme } from '../../providers/ThemeProvider';
import CreateCard from './CreateCard';

const MyCards = () => {
  const { theme } = useTheme();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchMyCards = async () => {
    try {
      const data = await getMyCards();
      setCards(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch cards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  const handleCardCreated = () => {
    setShowCreateForm(false);
    fetchMyCards();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (showCreateForm) {
    return <CreateCard onCardCreated={handleCardCreated} />;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className={theme.textColor}>My Business Cards</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Create New Card
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {cards.length === 0 ? (
        <div className={`text-center ${theme.textColor}`}>
          <i className="bi bi-collection fs-1 d-block mb-3"></i>
          <p>You haven't created any business cards yet.</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create Your First Card
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {cards.map(card => (
            <BusinessCard
              key={card._id}
              card={card}
              onRefresh={fetchMyCards}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;