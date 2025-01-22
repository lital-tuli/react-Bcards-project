import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';

const DeleteCard = ({ show, handleClose, handleDeleteCard }) => {
  // Access theme context for consistent styling
  const { theme } = useTheme();
  
  // State for managing loading and error states
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  // Handle the delete action with proper error handling
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      await handleDeleteCard();
      handleClose();
    } catch (error) {
      setError('Failed to delete card. Please try again.');
      console.error('Delete card error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Clean up error state when modal closes
  const onClose = () => {
    setError('');
    handleClose();
  };

  if (!show) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div className="modal-backdrop show"></div>

      {/* Modal Dialog */}
      <div 
        className="modal show d-block" 
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${theme.bgColor}`}>
            {/* Modal Header */}
            <div className={`modal-header ${theme.borderColor}`}>
              <h5 className={`modal-title ${theme.textColor}`}>
                Delete Card
              </h5>
              <button 
                type="button" 
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
                disabled={isDeleting}
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <p className={theme.textColor}>
                Are you sure you want to delete this card? This action cannot be undone.
              </p>
              
              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`modal-footer ${theme.borderColor}`}>
              <button 
                type="button" 
                className={`btn ${theme.btnOutline}`}
                onClick={onClose}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash me-2" />
                    Delete Card
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCard;