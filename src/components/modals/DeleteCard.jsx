import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { useSnack } from '../../providers/SnackBarProvider';
import { deleteCard } from '../../services/CardService';

const DeleteCard = ({ show, handleClose, cardId, onDelete }) => {
  const { theme } = useTheme();
  const setSnack = useSnack();
  const [isDeleting, setIsDeleting] = useState(false);


  const handleDelete = async () => {
    if (!cardId) {
      setSnack('danger', 'Cannot delete card: missing ID');
      return;
    }

    try {
      setIsDeleting(true);
      await deleteCard(cardId);
      setSnack('success', 'Card deleted successfully');
      onDelete();
      handleClose();
    } catch (error) {
      setSnack('danger', 'Failed to delete card');
    } finally {
      setIsDeleting(false);
    }
  };
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop show"></div>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${theme.bgColor}`}>
            <div className={`modal-header ${theme.borderColor}`}>
              <h5 className={`modal-title ${theme.textColor}`}>
                <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                Delete Card
              </h5>
              <button 
                type="button" 
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
                disabled={isDeleting}
              />
            </div>

            <div className="modal-body">
              <p className={theme.textColor}>
                Are you sure you want to delete this card? This action cannot be undone.
              </p>
            </div>

            <div className={`modal-footer ${theme.borderColor}`}>
              <button 
                type="button" 
                className={`btn ${theme.btnOutline}`}
                onClick={handleClose}
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
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash-fill me-2"></i>
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