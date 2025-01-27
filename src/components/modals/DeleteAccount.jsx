import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../providers/ThemeProvider';
import { useSnack } from '../../providers/SnackBarProvider';

const DeleteAccount = ({ show, handleClose, handleDelete }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const setSnack = useSnack();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await handleDelete();
      
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      
      window.dispatchEvent(new Event('authChange'));
      
      setSnack('success', 'Account deleted successfully');
      navigate('/');
    } catch (error) {
      console.error("Delete account error:", error);
      setSnack('error', 'Failed to delete account');
    } finally {
      setIsDeleting(false);
      handleClose();
    }
  };

  if (!show) return null;

  return (
    <>
      <div 
        className="modal show"
        style={{ display: 'block' }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${theme.bgColor}`}>
            <div className={`modal-header ${theme.borderColor}`}>
              <h5 className={`modal-title ${theme.textColor}`}>Delete Account?</h5>
              <button 
                type="button" 
                className={`btn-close ${theme.isDark ? 'btn-close-white' : ''}`}
                onClick={handleClose}
                disabled={isDeleting}
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              <p className={theme.textColor}>
                Are you sure you want to delete your account permanently? This action cannot be undone.
              </p>
            </div>

            <div className={`modal-footer ${theme.borderColor}`}>
              <button 
                className={`btn ${theme.btnOutline}`}
                onClick={handleClose}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
};

export default DeleteAccount;