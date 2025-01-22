import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useTheme } from '../../providers/ThemeProvider';

const UnlikeCard = ({ show, handleClose, handleUnlikeCard }) => {
  const { theme } = useTheme();
  const [isUnliking, setIsUnliking] = useState(false);
  const [error, setError] = useState('');

  const handleUnlike = async () => {
    try {
      setIsUnliking(true);
      setError('');
      
      await handleUnlikeCard();
      
      // Don't close the modal here - let the parent component handle it
    } catch (error) {
      setError('Failed to unlike card. Please try again.');
      console.error('Unlike card error:', error);
    } finally {
      setIsUnliking(false);
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={!isUnliking}
    >
      <Modal.Header closeButton={!isUnliking}>
        <Modal.Title>Remove from Favorites?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to remove this card from your favorites?</p>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button 
          variant="outline-secondary" 
          onClick={handleClose}
          disabled={isUnliking}
        >
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={handleUnlike}
          disabled={isUnliking}
        >
          {isUnliking ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Removing...
            </>
          ) : (
            'Remove'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UnlikeCard;