import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { getMyCards } from '../../services/CardService';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const data = await getMyCards();
        setCards(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">My Business Cards</h1>
      <div className="row">
        {cards.map(card => (
          <BusinessCard key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default MyCards;