import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerUser } from '../../services/UserService';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../common/FormField';
import { useAuth } from '../../hooks/useAuth';
import * as Yup from 'yup';
import { useSnack } from '../../providers/SnackBarProvider';
import { useTheme } from '../../providers/ThemeProvider';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { handleLogin, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const setSnack = useSnack();
  const { theme } = useTheme();

  const formFields = [
    { name: "name.first", label: "First Name", type: "text", col: "4" },
    { name: "name.middle", label: "Middle Name", type: "text", col: "4", required: false },
    { name: "name.last", label: "Last Name", type: "text", col: "4" },
    { name: "phone", label: "Phone", type: "tel", col: "6" },
    { name: "email", label: "Email", type: "email", col: "6" },
    { name: "password", label: "Password", type: "password", col: "12" },
    { name: "image.url", label: "Image URL", type: "url", col: "6", required: false },
    { name: "image.alt", label: "Image Alt", type: "text", col: "6", required: false },
    { name: "address.state", label: "State", type: "text", col: "6", required: false },
    { name: "address.country", label: "Country", type: "text", col: "6" },
    { name: "address.city", label: "City", type: "text", col: "4" },
    { name: "address.street", label: "Street", type: "text", col: "4" },
    { name: "address.houseNumber", label: "House Number", type: "number", col: "2" },
    { name: "address.zip", label: "Zip", type: "number", col: "2" }
  ];

  const validationSchema = Yup.object({
    name: Yup.object({
      first: Yup.string().min(2).max(256).required("First name is required"),
      middle: Yup.string().min(2).max(256).optional(),
      last: Yup.string().min(2).max(256).required("Last name is required")
    }),
    phone: Yup.string().min(9).max(11).required("Phone is required"),
    email: Yup.string().min(5).email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*-]/, "Password must contain at least one of these special characters: !@#$%^&*-")
      .required("Password is required"),
    image: Yup.object({
      url: Yup.string().min(14).url("Must be a valid URL"),
      alt: Yup.string().min(2).max(256)
    }),
    address: Yup.object({
      state: Yup.string().min(2).max(256).optional(),
      country: Yup.string().min(2).max(256).required("Country is required"),
      city: Yup.string().min(2).max(256).required("City is required"),
      street: Yup.string().min(2).max(256).required("Street is required"),
      houseNumber: Yup.number().required("House number is required").typeError("Must be a number"),
      zip: Yup.number().required("Zip is required").typeError("Must be a number")
    })
  });

  const formik = useFormik({
    initialValues: {
      name: { first: '', middle: '', last: '' },
      phone: '',
      email: '',
      password: '',
      image: { url: '', alt: '' },
      address: {
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: ''
      },
      isBusiness: false
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError('');
        
        // Register user
        await registerUser(values);
        setSnack('success', 'Registration successful! Logging you in...');
        
        // Log them in
        const loginResponse = await handleLogin({
          email: values.email,
          password: values.password,
          rememberMe: true
        });

        if (loginResponse) {
          setUser(loginResponse);
          // Dispatch auth change event
          window.dispatchEvent(new Event('authChange'));
          navigate('/');
        }
      } catch (error) {
        const errorMessage = error.response?.data || 'Registration failed. Please try again.';
        setError(errorMessage);
        
        // More specific snackbar messages based on error type
        if (error.response?.status === 400) {
          if (errorMessage.includes('password')) {
            setSnack('error', 'Password does not meet requirements. Please check the guidelines below.');
          } else if (errorMessage.includes('email')) {
            setSnack('error', 'Email already registered or invalid.');
          } else {
            setSnack('error', `Registration failed: ${errorMessage}`);
          }
        } else {
          setSnack('error', 'Registration failed. Please check your network connection and try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="container mt-5">
      <h2 className={`text-center mb-4 ${theme.textColor}`}>Create an Account</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          
          {/* Password Requirements Card */}
          <div className={`card mb-4 ${theme.cardBg}`}>
            <div className="card-body">
              <h5 className={`card-title ${theme.textColor}`}>Password Requirements</h5>
              <ul className={`mb-0 ${theme.textColor}`}>
                <li>At least 9 characters long</li>
                <li>Must contain at least one number</li>
                <li>Must contain at least one special character: !@#$%^&*-</li>
              </ul>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="row g-3">
            {formFields.map(field => (
              <FormField 
                key={field.name}
                {...field}
                formik={formik}
              />
            ))}

            <div className="col-12">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isBusiness"
                  {...formik.getFieldProps('isBusiness')}
                />
                <label className={`form-check-label ${theme.textColor}`} htmlFor="isBusiness">
                  Register as Business Account
                </label>
              </div>
            </div>

            <div className="col-12 d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!formik.isValid || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </button>
              
              <Link to="/login" className={`btn ${theme.btnOutline}`}>
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;