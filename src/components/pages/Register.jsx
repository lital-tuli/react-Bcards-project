import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { registerUser } from '../../services/UserService';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: '',
      phone: '',
      email: '',
      imageUrl: '',
      imageAlt: '',
      password: '',
      confirmPassword: '',
      isBusiness: false
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      country: yup.string().required('Country is required'),
      city: yup.string().required('City is required'),
      street: yup.string().required('Street is required'),
      houseNumber: yup.string().required('House number is required'),
      zip: yup.string().required('Zip is required'),
      phone: yup.string().required('Phone is required'),
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async (values) => {
      try {
        const userData = {
          name: {
            first: values.firstName,
            middle: values.middleName,
            last: values.lastName
          },
          phone: values.phone,
          email: values.email,
          password: values.password,
          image: {
            url: values.imageUrl,
            alt: values.imageAlt
          },
          address: {
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
            zip: values.zip
          },
          isBusiness: values.isBusiness
        };
//move to database later
        const response = await registerUser(userData);
        console.log('Registration successful:', response);
        // Handle successful registration (e.g., redirect to login)
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration error
      }
    }
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="row g-3">
              {/* Name Fields */}
              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    placeholder="First Name"
                    {...formik.getFieldProps('firstName')}
                  />
                  <label htmlFor="firstName">First Name *</label>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    placeholder="Middle Name"
                    {...formik.getFieldProps('middleName')}
                  />
                  <label htmlFor="middleName">Middle Name</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    placeholder="Last Name"
                    {...formik.getFieldProps('lastName')}
                  />
                  <label htmlFor="lastName">Last Name *</label>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Address Fields */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder="State"
                    {...formik.getFieldProps('state')}
                  />
                  <label htmlFor="state">State</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.country && formik.errors.country ? 'is-invalid' : ''}`}
                    id="country"
                    placeholder="Country"
                    {...formik.getFieldProps('country')}
                  />
                  <label htmlFor="country">Country *</label>
                  {formik.touched.country && formik.errors.country && (
                    <div className="invalid-feedback">{formik.errors.country}</div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                    id="city"
                    placeholder="City"
                    {...formik.getFieldProps('city')}
                  />
                  <label htmlFor="city">City *</label>
                  {formik.touched.city && formik.errors.city && (
                    <div className="invalid-feedback">{formik.errors.city}</div>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.street && formik.errors.street ? 'is-invalid' : ''}`}
                    id="street"
                    placeholder="Street"
                    {...formik.getFieldProps('street')}
                  />
                  <label htmlFor="street">Street *</label>
                  {formik.touched.street && formik.errors.street && (
                    <div className="invalid-feedback">{formik.errors.street}</div>
                  )}
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.houseNumber && formik.errors.houseNumber ? 'is-invalid' : ''}`}
                    id="houseNumber"
                    placeholder="House Number"
                    {...formik.getFieldProps('houseNumber')}
                  />
                  <label htmlFor="houseNumber">House Number *</label>
                  {formik.touched.houseNumber && formik.errors.houseNumber && (
                    <div className="invalid-feedback">{formik.errors.houseNumber}</div>
                  )}
                </div>
              </div>

              <div className="col-md-2">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${formik.touched.zip && formik.errors.zip ? 'is-invalid' : ''}`}
                    id="zip"
                    placeholder="Zip"
                    {...formik.getFieldProps('zip')}
                  />
                  <label htmlFor="zip">Zip *</label>
                  {formik.touched.zip && formik.errors.zip && (
                    <div className="invalid-feedback">{formik.errors.zip}</div>
                  )}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="tel"
                    className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    placeholder="Phone"
                    {...formik.getFieldProps('phone')}
                  />
                  <label htmlFor="phone">Phone *</label>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="invalid-feedback">{formik.errors.phone}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Email"
                    {...formik.getFieldProps('email')}
                  />
                  <label htmlFor="email">Email *</label>
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>
              </div>

              {/* Image Fields */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    placeholder="Image URL"
                    {...formik.getFieldProps('imageUrl')}
                  />
                  <label htmlFor="imageUrl">Image URL</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="imageAlt"
                    placeholder="Image Alt"
                    {...formik.getFieldProps('imageAlt')}
                  />
                  <label htmlFor="imageAlt">Image Alt</label>
                </div>
              </div>

              {/* Password Fields */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Password"
                    {...formik.getFieldProps('password')}
                  />
                  <label htmlFor="password">Password *</label>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">{formik.errors.password}</div>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              {/* Business Account Checkbox */}
              <div className="col-12">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isBusiness"
                    {...formik.getFieldProps('isBusiness')}
                  />
                  <label className="form-check-label" htmlFor="isBusiness">
                    Register as Business Account
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Send
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