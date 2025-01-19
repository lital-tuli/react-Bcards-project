import { useTheme } from '../../providers/ThemeProvider';

const TypeChange = ({ 
  show, 
  handleClose,
  handleConfirm,
  userData, 
  password, 
  setPassword, 
  errorMessage 
}) => {
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
              <h5 className={`modal-title ${theme.textColor}`}>
                Change to {userData.isBusiness ? "Customer" : "Business"} Account
              </h5>
              <button 
                type="button" 
                className={`btn-close ${theme.isDark ? 'btn-close-white' : ''}`}
                onClick={handleClose}
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              <p className={theme.textColor}>
                Changing the user type will change your permissions. Are you sure?
              </p>
              <div className="input-group mb-3">
                <span className={`input-group-text ${theme.bgColor} ${theme.borderColor}`}>
                  Confirm Password:
                </span>
                <input
                  type="password"
                  className={`form-control ${theme.inputBg} ${theme.borderColor}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>

            <div className={`modal-footer ${theme.borderColor}`}>
              <button 
                className={`btn ${theme.btnOutline}`}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={!password}
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
};

export default TypeChange;