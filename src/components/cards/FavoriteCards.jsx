import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import BusinessCard from './BusinessCard';
import { getFavoriteCards, toggleFavorite, deleteCard } from '../../services/CardService';
import DeleteCard from '../modals/DeleteCard';
import UnlikeCard from '../modals/UnlikeCard';

const FavoriteCards = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUnlikeModal, setShowUnlikeModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavoriteCards();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!selectedCardId) return;

    try {
      const result = await toggleFavorite(selectedCardId);
      
      if (!result.likes.includes(user._id)) {
        // Update local state to remove the card
        setFavorites(prevCards => 
          prevCards.filter(card => card._id !== selectedCardId)
        );
        setShowUnlikeModal(false);
        setSelectedCardId(null);
      } else {
        // If unlike failed, refresh the list
        await fetchFavorites();
      }
    } catch (error) {
      console.error('Error unliking card:', error);
      await fetchFavorites(); // Refresh on error
    }
  };

  const handleDelete = async () => {
    if (!selectedCardId) return;

    try {
      await deleteCard(selectedCardId);
      setFavorites(prevCards => 
        prevCards.filter(card => card._id !== selectedCardId)
      );
      setShowDeleteModal(false);
      setSelectedCardId(null);
    } catch (error) {
      console.error('Error deleting card:', error);
      await fetchFavorites();
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container py-4">
      <DeleteCard
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setSelectedCardId(null);
        }}
        handleDeleteCard={handleDelete}
      />
      
      <UnlikeCard
        show={showUnlikeModal}
        handleClose={() => {
          setShowUnlikeModal(false);
          setSelectedCardId(null);
        }}
        handleUnlikeCard={handleUnlike}
      />

      <h1 className="mb-4">My Favorite Cards</h1>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row justify-content-evenly">
          {favorites.length ? (
            favorites.map(card => (
              <BusinessCard
                key={card._id}
                card={card}
                onFavoriteChange={() => {
                  setSelectedCardId(card._id);
                  setShowUnlikeModal(true);
                }}
                onDelete={() => {
                  setSelectedCardId(card._id);
                  setShowDeleteModal(true);
                }}
                userType={user?.isBusiness ? "business" : "customer"}
                inFavoritesView={true}
              />
            ))
          ) : (
            <div className="col-12 text-center">
              <i className="bi bi-heart fs-1 text-muted mb-3"></i>
              <p className="text-muted">No favorite cards found. Start adding some!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteCards;