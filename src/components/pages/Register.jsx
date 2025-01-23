import React, { useState } from 'react';
import { useFormik } from 'formik';
import { registerUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import FormField from '../common/FormField';
import { useAuth } from '../../hooks/useAuth';
import { useSnack } from '../../providers/SnackbarProvider';
import { useTheme } from '../../providers/ThemeProvider';
import * as yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { handleLogin, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const setSnack = useSnack();
  const { theme } = useTheme();

  const fields = [
    { name: "name.first", label: "First Name", type: "text", col: "4" },
    { name: "name.middle", label: "Middle Name", type: "text", col: "4", required: false },
    { name: "name.last", label: "Last Name", type: "text", col: "4" },
    { name: "phone", label: "Phone", type: "tel", col: "6" },
    { name: "email", label: "Email", type: "email", col: "6" },
    { name: "password", label: "Password", type: "password", col: "6" },
    { name: "image.url", label: "Image URL", type: "text", col: "6", required: false },
    { name: "image.alt", label: "Image Alt", type: "text", col: "6", required: false },
    { name: "address.state", label: "State", type: "text", col: "6", required: false },
    { name: "address.country", label: "Country", type: "text", col: "6" },
    { name: "address.city", label: "City", type: "text", col: "4" },
    { name: "address.street", label: "Street", type: "text", col: "4" },
    { name: "address.houseNumber", label: "House Number", type: "number", col: "2" },
    { name: "address.zip", label: "Zip", type: "number", col: "2" }
  ];

  const validationSchema = yup.object({
    name: yup.object({
      first: yup.string().min(2).max(256).required("First name is required"),
      middle: yup.string().min(2).max(256).optional(),
      last: yup.string().min(2).max(256).required("Last name is required")
    }),
    phone: yup.string().min(9).max(11).required("Phone is required"),
    email: yup.string().min(5).email("Invalid email format").required("Email is required"),
    password: yup.string().min(7).max(20).required("Password is required"),
    image: yup.object({
      url: yup.string().min(14).url("Must be a valid URL"),
      alt: yup.string().min(2).max(256)
    }),
    address: yup.object({
      state: yup.string().min(2).max(256).optional(),
      country: yup.string().min(2).max(256).required("Country is required"),
      city: yup.string().min(2).max(256).required("City is required"),
      street: yup.string().min(2).max(256).required("Street is required"),
      houseNumber: yup.number().required("House number is required").typeError("Must be a number"),
      zip: yup.number().required("Zip is required").typeError("Must be a number")
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
        setError('');
        setIsLoading(true);
        setSnack('info', 'Processing registration...');

        const userData = {
          name: {
            first: values.name.first,
            middle: values.name.middle || "",
            last: values.name.last
          },
          phone: values.phone,
          email: values.email,
          password: values.password,
          image: {
            url: values.image.url || "https://i.ibb.co/B4rd7yx/default-Avatar.png",
            alt: values.image.alt || "User Avatar"
          },
          address: {
            state: values.address.state || "",
            country: values.address.country,
            city: values.address.city,
            street: values.address.street,
            houseNumber: Number(values.address.houseNumber),
            zip: Number(values.address.zip)
          },
          isBusiness: Boolean(values.isBusiness)
        };

        await registerUser(userData);
        setSnack('success', 'Registration successful!');

        const loginSuccess = await handleLogin({
          email: values.email,
          password: values.password,
          rememberMe: true
        });

        if (loginSuccess) {
          setSnack('success', 'Successfully logged in!');
          navigate('/');
        }

      } catch (error) {
        const errorMessage = error.response?.data || 'Registration failed. Please try again.';
        setError(errorMessage);
        setSnack('danger', `Registration failed: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className="container mt-5">
      <h2 className={`text-center mb-4 ${theme.textColor}`}>Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              {error}
            </div>
          )}
          <form onSubmit={formik.handleSubmit} className="p-4 shadow-lg rounded">
            <div className="row g-3">
              {fields.map(field => (
                <FormField 
                  key={field.name} 
                  {...field} 
                  formik={formik}
                />
              ))}

              <div className="col-12">
                <div className="form-check">
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

              <div className="col-12">
                <button 
                  type="submit" 
                  className={`btn ${theme.btnPrimary} w-100`}
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;