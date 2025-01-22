import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { getCardById } from '../../services/CardService';
import { useTheme } from '../../providers/ThemeProvider';

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        const data = await getCardById(id);
        setCard(data);
      } catch (err) {
        console.error('Error fetching card:', err);
        setError(err.message || 'Failed to load card details');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <hr />
        <button 
          className="btn btn-outline-danger"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="alert alert-warning m-4" role="alert">
        <h4 className="alert-heading">Card Not Found</h4>
        <p>The requested card could not be found.</p>
        <hr />
        <button 
          className="btn btn-outline-warning"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className={`card shadow-lg ${theme.cardBg}`}>
            <img 
              src={card.image?.url || "https://placehold.co/800x400?text=Business+Card"} 
              className="card-img-top"
              alt={card.image?.alt || card.title}
              style={{ height: '400px', objectFit: 'cover' }}
            />
            
            <div className="card-body p-4">
              <h1 className={`card-title ${theme.textColor}`}>{card.title}</h1>
              {card.subtitle && (
                <h3 className={`card-subtitle mb-3 ${theme.textMuted}`}>{card.subtitle}</h3>
              )}
              
              <p className={`card-text ${theme.textColor}`}>{card.description}</p>
              
              <div className="mt-4">
                <h4 className={`mb-3 ${theme.textColor}`}>Contact Information</h4>
                <div className={`d-flex flex-column gap-3 ${theme.textColor}`}>
                  {card.phone && (
                    <div className="d-flex align-items-center">
                      <i className="bi bi-telephone-fill text-success me-2"></i>
                      <a href={`tel:${card.phone}`} className={theme.linkColor}>{card.phone}</a>
                    </div>
                  )}
                  
                  {card.email && (
                    <div className="d-flex align-items-center">
                      <i className="bi bi-envelope-fill text-primary me-2"></i>
                      <a href={`mailto:${card.email}`} className={theme.linkColor}>{card.email}</a>
                    </div>
                  )}
                  
                  {card.web && (
                    <div className="d-flex align-items-center">
                      <i className="bi bi-globe text-info me-2"></i>
                      <a href={card.web} target="_blank" rel="noopener noreferrer" className={theme.linkColor}>
                        {card.web.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}

                  {card.address && (
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                      <span>
                        {`${card.address.street} ${card.address.houseNumber}, 
                         ${card.address.city}, ${card.address.state} 
                         ${card.address.zip}, ${card.address.country}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card-footer p-3">
              <button 
                className={`btn ${theme.btnOutline}`}
                onClick={() => navigate(-1)}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Cards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;