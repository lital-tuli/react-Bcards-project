import React, { useState } from 'react';
import { useTheme } from '../../providers/ThemeProvider';
import { Spinner } from 'react-bootstrap';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const onConfirm = async () => {
    try {
      setIsSubmitting(true);
      await handleConfirm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div 
        className="modal show"
        style={{ display: 'block' }}
        tabIndex="-1"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
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
                disabled={isSubmitting}
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <p className={theme.textColor}>
                Changing the user type will change your permissions. Are you sure?
              </p>
              <div className="form-group mb-3">
                <label htmlFor="password" className={`form-label ${theme.textColor}`}>
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className={`form-control ${theme.inputBg} ${theme.borderColor}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={onConfirm}
                disabled={!password || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Changing...
                  </>
                ) : (
                  'Confirm Change'
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

export default TypeChange;