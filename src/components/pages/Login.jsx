import React from 'react';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from '../../services/UserService';

const Login = ({ show, onClose }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { 
      email: "", 
      password: "" 
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
        const res = await loginUser(values);
        if (res.data.length) {
          localStorage.setItem("userId", JSON.stringify(res.data[0].id));
          if (onClose) onClose(); // Only close if onClose exists
          navigate("/home");
        } else {
          alert("User not found");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
      }
    },
  });

  // Don't render anything if show is false
  if (!show) return null;

  return (
    <>
      <div className="modal show"
           style={{ display: 'block' }}
           tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login to Your Account</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close">
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    {...formik.getFieldProps('email')}
                  />
                  <label htmlFor="email">Email address</label>
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                  />
                  <label htmlFor="password">Password</label>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>

                <button
                  className="w-100 btn btn-primary mb-3"
                  type="submit"
                  onClick={loginUser}
                  disabled={!formik.isValid || !formik.dirty}
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" onClick={onClose}>
                      Create one now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
};

export default Login;