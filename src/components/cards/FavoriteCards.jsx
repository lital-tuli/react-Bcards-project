import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import BusinessCard from './BusinessCard';
import { getFavoriteCards } from '../../services/CardService';
import DeleteCard from '../modals/DeleteCard';
import { useTheme } from '../../providers/ThemeProvider';
import { useSnack } from '../../providers/SnackBarProvider';

const FavoriteCards = () => {
  // State management for our favorite cards
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  const { theme } = useTheme();
  const setSnack = useSnack();

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  // Handler for when a card is unliked
  const handleFavoriteToggle = async (cardId) => {
    // Remove the card from local state immediately for better UX
    setFavorites(prevCards => prevCards.filter(card => card._id !== cardId));
    setSnack('success', 'Card removed from favorites');
    
    await fetchFavorites();
  };

  const handleDelete = async () => {
    if (!selectedCardId) return;
    
    try {
      setFavorites(prevCards => prevCards.filter(card => card._id !== selectedCardId));
      setShowDeleteModal(false);
      setSelectedCardId(null);
      setSnack('success', 'Card deleted successfully');
      
      await fetchFavorites();
    } catch (error) {
      console.error('Error deleting card:', error);
      setSnack('error', 'Failed to delete card');
      await fetchFavorites();
    }
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavoriteCards();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setSnack('error', 'Failed to fetch favorite cards');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="container py-4">
        <h1 className={`mb-4 ${theme.textColor}`}>My Favorite Cards</h1>
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Delete confirmation modal */}
      <DeleteCard
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setSelectedCardId(null);
        }}
        handleDeleteCard={handleDelete}
      />

      <h1 className={`mb-4 ${theme.textColor}`}>My Favorite Cards</h1>

      {/* Show empty state or cards */}
      {favorites.length === 0 ? (
        <div className="text-center mt-5">
          <i className="bi bi-heart fs-1 text-muted mb-3"></i>
          <p className="text-muted">No favorite cards found. Start adding some!</p>
        </div>
      ) : (
        <div className="row">
          {favorites.map(card => (
            <BusinessCard
              key={card._id}
              card={card}
              onFavoriteChange={() => handleFavoriteToggle(card._id)}
              onDelete={() => {
                setSelectedCardId(card._id);
                setShowDeleteModal(true);
              }}
              inFavoritesView={true}
              userType={user?.isBusiness ? "business" : "customer"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCards;