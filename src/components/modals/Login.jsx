import React from 'react';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTheme } from '../../providers/ThemeProvider';
import { useAuth } from '../../hooks/useAuth';
const Login = ({ show, onClose }) => {
  const { theme, isDark } = useTheme();
  const navigate = useNavigate();
  const { handleLogin, isLoading, error } = useAuth();

  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "",
      rememberMe: false
    },
    validationSchema: yup.object({
      email: yup.string()
        .required("Email is required")
        .email("Invalid email format"),
      password: yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
        if (onClose) onClose();
      } catch (err) {
        console.error("Form submission error:", err);
        // Error is already handled by useAuth
      }
    },
  });


return (
    <>
      {show && (
        <div className="modal show"
           style={{ display: 'block' }}
           tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${theme.bgColor}`}>
            <div className={`modal-header border-${theme.borderColor}`}>
              <h5 className={`modal-title ${theme.textColor}`}>Login to Your Account</h5>
              <button 
                type="button" 
                className={`btn-close ${isDark ? 'btn-close-white' : ''}`}
                onClick={onClose}
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit} noValidate>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${theme.inputBg} ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    {...formik.getFieldProps('email')}
                  />
                  <label className={theme.textColor} htmlFor="email">Email address</label>
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${theme.inputBg} ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                  />
                  <label className={theme.textColor} htmlFor="password">Password</label>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    {...formik.getFieldProps('rememberMe')}
                  />
                  <label className={`form-check-label ${theme.textColor}`} htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  className={`w-100 btn ${theme.btnPrimary} mb-3`}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting || isLoading}
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  Sign In
                </button>

                <div className="text-center">
                  <p className={`mb-0 ${theme.textColor}`}>
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      onClick={onClose}
                      className={theme.linkColor}
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
      {show && <div className="modal-backdrop show"></div>}
    </>
  );
};

export default Login;