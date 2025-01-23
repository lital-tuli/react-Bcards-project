// BusinessCard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toggleFavorite } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useSnack } from '../../providers/SnackbarProvider';
import DeleteCard from '../modals/DeleteCard';
import EditCard from '../modals/EditCard';

const BusinessCard = ({ card, onRefresh }) => {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const setSnack = useSnack();
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const defaultImage = "https://placehold.co/400x200?text=Business+Card";

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    
    try {
      setIsLoading(true);
      await toggleFavorite(card._id);
      setSnack('success', card.isFavorite ? 'Removed from favorites' : 'Added to favorites');
      if (onRefresh) onRefresh();
    } catch (error) {
      setSnack('danger', 'Failed to update favorite status');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = address => {
    if (!address) return '';
    const { street = '', houseNumber = '', city = '', country = '' } = address;
    return [street, houseNumber, city, country].filter(Boolean).join(', ');
  };

  const handleActionClick = e => {
    const action = e.currentTarget.dataset.action;
    e.stopPropagation();
    if (action === 'edit') setShowEditModal(true);
    if (action === 'delete') setShowDeleteModal(true);
  };

  return (
    <>
      <div className="col-md-4 mb-4">
        <div className={`card h-100 shadow ${theme.cardBg}`}>
          <div className="position-relative">
            <img 
              src={card.image?.url || defaultImage}
              className="card-img-top"
              alt={card.image?.alt || card.title}
              style={{ height: '200px', objectFit: 'cover' }}
              onError={e => { e.target.src = defaultImage; }}
            />
            
            <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
              {card.isOwner && (
                <>
                  <button 
                    data-action="edit"
                    onClick={handleActionClick}
                    className="btn btn-light btn-sm rounded-circle"
                    title="Edit Card"
                  >
                    <i className="bi bi-pencil-fill text-primary"></i>
                  </button>
                  <button 
                    data-action="delete"
                    onClick={handleActionClick}
                    className="btn btn-light btn-sm rounded-circle"
                    title="Delete Card"
                  >
                    <i className="bi bi-trash-fill text-danger"></i>
                  </button>
                </>
              )}
              
              {isLoggedIn && (
                <button 
                  className="btn btn-light btn-sm rounded-circle"
                  onClick={handleFavoriteClick}
                  disabled={isLoading}
                  title={card.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isLoggedIn ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <i className={`bi ${card.isFavorite ? 'bi-heart-fill text-danger' : 'bi-heart'}`} />
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="card-body">
            <h5 className={`card-title ${theme.textColor}`}>
              <i className="bi bi-building me-2 text-primary"></i>
              {card.title}
            </h5>
            
            {card.subtitle && (
              <p className={`card-subtitle ${theme.textMuted}`}>
                <i className="bi bi-info-circle me-2"></i>
                {card.subtitle}
              </p>
            )}

            <div className={`mt-3 ${theme.textColor}`}>
              {card.phone && (
                <a href={`tel:${card.phone}`} className="d-block mb-2 text-decoration-none">
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  {card.phone}
                </a>
              )}
              {card.email && (
                <a href={`mailto:${card.email}`} className="d-block mb-2 text-decoration-none">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  {card.email}
                </a>
              )}
              {card.address && (
                <p className="mb-2">
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  {formatAddress(card.address)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditCard
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          card={card}
          onRefresh={onRefresh}
        />
      )}

      {showDeleteModal && (
        <DeleteCard
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDeleteCard={onRefresh}
        />
      )}
    </>
  );
};

export default BusinessCard;