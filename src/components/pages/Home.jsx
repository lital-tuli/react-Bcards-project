import React, { useState, useEffect } from 'react';
import { getAllCards } from '../../services/CardService';
import BusinessCard from '../cards/BusinessCard';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import CreateCard from '../cards/CreateCard';
import { useTheme } from '../../providers/ThemeProvider';
import { useSnack } from '../../providers/SnackBarProvider';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  
  const { isLoggedIn } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const setSnack = useSnack();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setCurrentPage(1);
  }, [location.search]);

  useEffect(() => {
    fetchCards();
  }, [isLoggedIn]);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = await getAllCards();
      setCards(data);
      setSnack('success', 'Cards loaded successfully');
    } catch (err) {
      setError(err.message || 'Failed to fetch cards');
      setSnack('danger', 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleCardCreated = (newCard) => {
    setShowCreateForm(false);
    setSnack('success', 'Card created successfully');
    fetchCards();
  };

  const handleBack = () => {
    setShowCreateForm(false);
  };

  const filteredCards = cards.filter(card => 
    !searchQuery || (
      card.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    if (typeof pageNumber === 'number' && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSnack('info', `Page ${pageNumber} of ${totalPages}`);
    }
  };

  if (showCreateForm) {
    return (
      <div className="container">
        <CreateCard 
          onCardCreated={handleCardCreated} 
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <header className="text-center mb-5">
        <h1 className="display-4">Welcome to BCard</h1>
        <p className="lead text-muted">
          Discover and connect with businesses through their digital cards
        </p>
      </header>

      <div className="row g-4">
        {loading ? (
          <div className="col-12 text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <i className="bi bi-inbox-fill fs-1 d-block mb-3"></i>
              {searchQuery ? 'No cards match your search' : 'No cards available'}
            </div>
          </div>
        ) : (
          <>
            {currentCards.map((card) => (
              <BusinessCard 
                key={card._id || card.id}  
                card={card} 
                onRefresh={fetchCards}
              />
            ))}
            
            {totalPages > 1 && (
              <div className="col-12">
                <nav aria-label="Business cards pagination" className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>
                    
                    {getPageNumbers().map((number, index) => (
                      <li 
                        key={index} 
                        className={`page-item ${currentPage === number ? 'active' : ''} ${number === '...' ? 'disabled' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => number !== '...' ? paginate(number) : null}
                        >
                          {number}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {isLoggedIn && (
        <button
          className="btn btn-primary btn-lg rounded-circle position-fixed bottom-0 start-0 m-3 d-flex align-items-center justify-content-center shadow-lg"
          style={{ 
            width: '50px', 
            height: '50px',
            zIndex: 1030
          }}
          onClick={() => setShowCreateForm(true)}
        >
          <i className="bi bi-plus-lg fs-5"></i>
        </button>
      )}
    </div>
  );
};

export default Home;