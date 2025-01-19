import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { toggleFavorite } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';

const BusinessCard = ({ card, onEdit, onDelete, onFavoriteChange }) => {
  // Access necessary hooks and contexts
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle favorite toggling with proper error handling
  const handleFavoriteClick = async () => {
    if (!isLoggedIn) return;
    
    try {
      setIsLoading(true);
      setError('');
      await toggleFavorite(card._id);
      
      if (onFavoriteChange) {
        onFavoriteChange(card._id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError('Failed to update favorite status');
    } finally {
      setIsLoading(false);
    }
  };

  // Format address consistently
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
    
    return `${street} ${houseNumber}, ${city}, ${state} ${zip}, ${country}`.trim().replace(/\s+/g, ' ');
  };

  // Handle contact actions
  const handlePhoneClick = () => {
    if (card.phone) {
      window.location.href = `tel:${card.phone}`;
    }
  };

  const handleEmailClick = () => {
    if (card.email) {
      window.location.href = `mailto:${card.email}`;
    }
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    }
  };

  const defaultImage = "https://placehold.co/400x200?text=Business+Card";

  return (
    <div className="col-md-4 mb-4">
      <div className={`card h-100 shadow ${theme.cardBg}`}>
        {/* Card Image Section */}
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
          {/* Favorite Button */}
          {isLoggedIn && (
    <button 
      className="position-absolute end-0 top-0 m-2 btn rounded-circle p-0"
      onClick={handleFavoriteClick}
      disabled={isLoading}
      // style={heartButtonStyle}
      title={card.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      {isLoading ? (
        <span className="spinner-border spinner-border-sm text-primary" />
      ) : (
        <i 
          className={`bi ${card.isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}
          // style={heartIconStyle}
        />
      )}
    </button>
  )}
        </div>
        
        {/* Card Content */}
        <div className="card-body">
          {/* Title Section */}
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-building text-primary me-2"></i>
            <h5 className={`card-title mb-0 ${theme.textColor}`}>{card.title}</h5>
          </div>

          {/* Subtitle Section */}
          {card.subtitle && (
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-file-text me-2"></i>
              <p className={`card-subtitle mb-0 ${theme.textMuted}`}>{card.subtitle}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="mt-3">
            {/* Phone */}
            {card.phone && (
              <div 
                className={`d-flex align-items-center mb-2 ${theme.textColor} cursor-pointer`}
                onClick={handlePhoneClick}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-telephone-fill text-success me-2"></i>
                <span>{card.phone}</span>
              </div>
            )}

            {/* Email */}
            {card.email && (
              <div 
                className={`d-flex align-items-center mb-2 ${theme.textColor} cursor-pointer`}
                onClick={handleEmailClick}
                style={{ cursor: 'pointer' }}
              >
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                <span>{card.email}</span>
              </div>
            )}

            {/* Address */}
            {card.address && (
              <div className={`d-flex align-items-center mb-2 ${theme.textColor}`}>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                <span>{formatAddress(card.address)}</span>
              </div>
            )}

            {/* Website */}
            {card.web && (
              <div className="d-flex align-items-center">
                <i className="bi bi-globe text-info me-2"></i>
                <a 
                  href={card.web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-decoration-none ${theme.linkColor}`}
                >
                  {card.web.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className={`card-footer bg-transparent ${theme.borderColor}`}>
          <div className="d-flex justify-content-between align-items-center">
            {/* Share Button */}
            <button 
              className={`btn ${theme.btnOutline} btn-sm`}
              onClick={handleShare}
            >
              <i className="bi bi-share me-1"></i>
              Share
            </button>

            {/* Edit and Delete Buttons (for card owner) */}
            {card.isOwner && (
              <div>
                <button 
                  className={`btn ${theme.btnOutline} btn-sm me-2`}
                  onClick={() => onEdit?.(card._id)}
                >
                  <i className="bi bi-pencil me-1"></i>
                  Edit
                </button>
                
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete?.(card._id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="alert alert-danger m-2 position-absolute bottom-0 start-0">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;