import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toggleFavorite } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useSnack } from '../../providers/SnackBarProvider';
import DeleteCard from '../modals/DeleteCard';
import EditCard from '../modals/EditCard';

const BusinessCard = ({ 
  card, 
  onRefresh, 
  inFavoritesView = false, 
  onFavoriteChange
}) => {
  const { isLoggedIn, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const setSnack = useSnack();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [localLikeStatus, setLocalLikeStatus] = useState(card.likes?.includes(user?._id));
  
  const isOwner = user?._id === card.user_id;
  const defaultImage = "https://placehold.co/400x200?text=Business+Card";

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    
    try {
      setIsLoading(true);
      const response = await toggleFavorite(card._id);
      
      if (inFavoritesView) {
        // In favorites view, trigger parent removal
        onFavoriteChange && onFavoriteChange();
      } else {
        // Update local state only
        const newLikedState = response.likes?.includes(user?._id);
        setLocalLikeStatus(newLikedState);
        setSnack('success', newLikedState ? 'Added to favorites' : 'Removed from favorites');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      setSnack('error', 'Failed to update favorite status');
      // Revert local state on error
      setLocalLikeStatus(card.likes?.includes(user?._id));
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = address => {
    if (!address) return '';
    const { street = '', houseNumber = '', city = '', country = '' } = address;
    return [street, houseNumber, city, country].filter(Boolean).join(', ');
  };

  return (
    <>
      <div className="col-md-4 mb-4">
        <div 
          className={`card h-100 shadow ${theme.cardBg}`}
          onClick={() => navigate(`/card/${card._id}`)}
          style={{ cursor: 'pointer' }}
        >
          {/* Rest of the card UI stays the same */}
          <div className="position-relative">
            <img 
              src={card.image?.url || defaultImage}
              className="card-img-top"
              alt={card.image?.alt || card.title}
              style={{ height: '200px', objectFit: 'cover' }}
              onError={e => { e.target.src = defaultImage; }}
            />
            
            {isLoggedIn && (
              <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
                {isOwner && (
                  <>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEditModal(true);
                      }}
                      className="btn btn-light btn-sm rounded-circle"
                      title="Edit Card"
                    >
                      <i className="bi bi-pencil-fill text-primary"></i>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDeleteModal(true);
                      }}
                      className="btn btn-light btn-sm rounded-circle"
                      title="Delete Card"
                    >
                      <i className="bi bi-trash-fill text-danger"></i>
                    </button>
                  </>
                )}
                <button 
                  className="btn btn-light btn-sm rounded-circle"
                  onClick={handleFavoriteClick}
                  disabled={isLoading}
                  title={localLikeStatus ? "Remove from Favorites" : "Add to Favorites"}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" />
                  ) : (
                    <i className={`bi ${localLikeStatus ? 'bi-heart-fill text-danger' : 'bi-heart'}`} />
                  )}
                </button>
              </div>
            )}
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
                <a 
                  href={`tel:${card.phone}`} 
                  className="d-block mb-2 text-decoration-none"
                  onClick={e => e.stopPropagation()}
                >
                  <i className="bi bi-telephone-fill text-success me-2"></i>
                  {card.phone}
                </a>
              )}
              {card.email && (
                <a 
                  href={`mailto:${card.email}`} 
                  className="d-block mb-2 text-decoration-none"
                  onClick={e => e.stopPropagation()}
                >
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
          cardId={card._id}
          onDelete={onRefresh}
        />
      )}
    </>
  );
};

export default BusinessCard;