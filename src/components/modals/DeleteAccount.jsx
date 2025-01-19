import { useTheme } from '../../providers/ThemeProvider';

const DeleteAccount = ({ show, handleClose, handleDelete }) => {
  const { theme } = useTheme();

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
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              <p className={theme.textColor}>
                Are you sure you want to delete your account permanently?
              </p>
            </div>

            <div className={`modal-footer ${theme.borderColor}`}>
              <button 
                className={`btn ${theme.btnOutline}`}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Account
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