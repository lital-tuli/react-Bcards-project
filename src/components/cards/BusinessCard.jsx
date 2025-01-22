import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toggleFavorite } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BusinessCard = ({ card, onEdit, onDelete, onFavoriteChange, inFavoritesView = false }) => {
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get current user to check if card is liked
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const userId = token ? jwtDecode(token)._id : null;
  
  const handleCardClick = (e) => {
    if (
      e.target.closest('button') || 
      e.target.closest('a') || 
      e.target.closest('[role="button"]')
    ) {
      return;
    }
    navigate(`/card/${card._id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    
    if (inFavoritesView && onFavoriteChange) {
      onFavoriteChange(card._id);
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      const result = await toggleFavorite(card._id);
      
      // Update the card's likes array with the result
      if (result && result.likes) {
        card.likes = result.likes;
      }
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError('Failed to update favorite status');
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    const {
      street = '',
      houseNumber = '',
      city = '',
      state = '',
      country = '',
      zip = ''
    } = address;
    
    return `${street} ${houseNumber}, ${city}, ${state} ${zip}, ${country}`
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/,\s*,/g, ',')
      .replace(/,+/g, ',');
  };

  const handlePhoneClick = (e) => {
    e.stopPropagation();
    if (card.phone) {
      window.location.href = `tel:${card.phone}`;
    }
  };

  const handleEmailClick = (e) => {
    e.stopPropagation();
    if (card.email) {
      window.location.href = `mailto:${card.email}`;
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }
  };

  const defaultImage = "https://placehold.co/400x200?text=Business+Card";

  return (
    <div className="col-md-4 mb-4">
      <div 
        className={`card h-100 shadow ${theme.cardBg}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="position-relative">
          <img 
            src={card.image?.url || defaultImage}
            className="card-img-top"
            alt={card.image?.alt || card.title}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = defaultImage;
              e.target.onerror = null;
            }}
          />
          {isLoggedIn && (
            <button 
              className={`position-absolute end-0 top-0 m-2 btn ${theme.bgColor} rounded-circle p-2`}
              onClick={handleFavoriteClick}
              disabled={isLoading}
              style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'transform 0.2s ease'
              }}
              title={card.likes?.includes(userId) ? "Remove from Favorites" : "Add to Favorites"}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                <i 
                  className={`bi ${card.likes?.includes(userId) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
                  style={{ fontSize: '1.2rem' }}
                />
              )}
            </button>
          )}
        </div>
        
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-building text-primary me-2"></i>
            <h5 className={`card-title mb-0 ${theme.textColor}`}>{card.title}</h5>
          </div>

          {card.subtitle && (
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-file-text me-2"></i>
              <p className={`card-subtitle mb-0 ${theme.textMuted}`}>{card.subtitle}</p>
            </div>
          )}

          <div className="mt-3">
            {card.phone && (
              <div 
                className={`d-flex align-items-center mb-2 ${theme.textColor}`}
                onClick={handlePhoneClick}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
              >
                <i className="bi bi-telephone-fill text-success me-2"></i>
                <span>{card.phone}</span>
              </div>
            )}

            {card.email && (
              <div 
                className={`d-flex align-items-center mb-2 ${theme.textColor}`}
                onClick={handleEmailClick}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
              >
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                <span>{card.email}</span>
              </div>
            )}

            {card.address && (
              <div className={`d-flex align-items-center mb-2 ${theme.textColor}`}>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                <span>{formatAddress(card.address)}</span>
              </div>
            )}

            {card.web && (
              <div className="d-flex align-items-center">
                <i className="bi bi-globe text-info me-2"></i>
                <a 
                  href={card.web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-decoration-none ${theme.linkColor}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {card.web.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className={`card-footer bg-transparent ${theme.borderColor}`}>
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className={`btn ${theme.btnOutline} btn-sm`}
              onClick={handleShare}
            >
              <i className="bi bi-share me-1"></i>
              Share
            </button>

            {card.isOwner && (
              <div>
                <button 
                  className={`btn ${theme.btnOutline} btn-sm me-2`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(card._id);
                  }}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </button>
                
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(card._id);
                  }}
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="alert alert-danger m-2" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;