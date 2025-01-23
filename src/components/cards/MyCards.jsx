import React, { useState, useEffect } from 'react';
import { getMyCards } from '../../services/CardService';
import BusinessCard from '../cards/BusinessCard';
import { useTheme } from '../../providers/ThemeProvider';
import CreateCard from '../cards/CreateCard';
import { useSnack } from '../../providers/SnackbarProvider';
import EditCard from '../modals/EditCard';

const MyCards = () => {
  const { theme } = useTheme();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const setSnack = useSnack();

  const fetchMyCards = async () => {
    try {
      setLoading(true);
      const data = await getMyCards();
      setCards(data);
      setSnack('success', 'Cards loaded successfully');
    } catch (err) {
      setError(err.message);
      setSnack('danger', 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, []);

  const handleEdit = (card) => {
    setEditingCard(card);
  };

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

  return (
    <div className="container py-4">
      {editingCard && (
        <EditCard
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onRefresh={fetchMyCards}
        />
      )}

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
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {showCreateForm ? (
        <CreateCard onCardCreated={handleCardCreated} />
      ) : cards.length === 0 ? (
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
              onEdit={() => handleEdit(card)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;