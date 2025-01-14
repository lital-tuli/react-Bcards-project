import React from 'react';

const BusinessCard = ({ card, onEdit, onDelete, onFavorite }) => {
  const isLoggedIn = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');
  const userEmail = localStorage.getItem('userEmail');
  const isOwner = card.email === userEmail;
  const canEditDelete = userType === 'business' && isOwner;
//comment
  // Format address object into a string
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleFavoriteClick = () => {
    if (isLoggedIn && onFavorite) {
      onFavorite(card._id);
    }
  };

  // Default image if card image is missing or invalid
  const defaultImage = "https://placehold.co/400x200?text=Business+Card";

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <div className="position-relative">
          <img 
            src={card.imageUrl || defaultImage}
            className="card-img-top"
            alt={card.imageAlt || card.title}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
          {isLoggedIn && (
            <button 
              className={`position-absolute end-0 top-0 m-2 btn btn-light rounded-circle p-2 shadow-sm border-0`}
              onClick={handleFavoriteClick}
              title={card.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <i className={`bi bi-heart${card.isFavorite ? '-fill text-danger' : ''} fs-5`}></i>
            </button>
          )}
        </div>
        
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-building text-primary me-2"></i>
            <h5 className="card-title mb-0">{card.title}</h5>
          </div>

          {card.subtitle && (
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-file-text me-2"></i>
              <p className="card-subtitle text-muted mb-0">{card.subtitle}</p>
            </div>
          )}

          <div className="mt-3">
            {card.phone && (
              <div 
                className="d-flex align-items-center mb-2 text-body cursor-pointer hover-primary"
                style={{ cursor: 'pointer' }}
                onClick={handlePhoneClick}
              >
                <i className="bi bi-telephone-fill text-success me-2"></i>
                <span>{card.phone}</span>
              </div>
            )}

            {card.email && (
              <div 
                className="d-flex align-items-center mb-2 text-body cursor-pointer hover-primary"
                style={{ cursor: 'pointer' }}
                onClick={handleEmailClick}
              >
                <i className="bi bi-envelope-fill text-primary me-2"></i>
                <span>{card.email}</span>
              </div>
            )}

            {card.address && (
              <div className="d-flex align-items-center mb-2">
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
                  className="text-decoration-none"
                >
                  {card.web.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="card-footer bg-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={handleShare}
            >
              <i className="bi bi-share me-1"></i>
              Share
            </button>

            {canEditDelete && (
              <div>
                <button 
                  className="btn btn-outline-secondary btn-sm me-2"
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
      </div>
    </div>
  );
};

export default BusinessCard;