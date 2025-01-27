import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from '../../providers/ThemeProvider';
import { createCard } from "../../services/CardService";
import {
  titleValidation,
  subtitleValidation,
  descriptionValidation,
  phoneValidation,
  emailValidation,
  websiteValidation,
  imageValidation,
  addressValidation
} from "../../services/schemaService";
import FormField from "../common/FormField";
import { useSnack } from "../../providers/SnackBarProvider";

const CreateCard = ({ onCardCreated, onBack }) => {
  const { theme } = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const setSnack = useSnack();

  const handleBack = (e) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
    },
    validationSchema: Yup.object({
      title: titleValidation,
      subtitle: subtitleValidation,
      description: descriptionValidation,
      phone: phoneValidation,
      email: emailValidation,
      web: websiteValidation,
      image: imageValidation,
      address: addressValidation,
    }),
    onSubmit: async (values) => {
      try {
        const newCard = await createCard(values);
        setSnack('success', 'Card created successfully!');
        if (onCardCreated) {
          onCardCreated(newCard);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setErrorMessage("Authentication required. Please log in.");
          setSnack('warning', 'Please login to create a card');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setErrorMessage(
            error.response?.data || 
            error.message || 
            "Failed to create card"
          );
          setSnack('danger', 'Failed to create card');
        }
      }
    },
  });

  return (
    <div className="container py-4">
      <h1 className={`mb-4 ${theme.textColor}`}>Create New Business Card</h1>
      <form onSubmit={formik.handleSubmit} className="row g-3">
        {/* Basic Info */}
        <div className="col-md-6">
          <FormField name="title" label="Business Title" required formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField name="subtitle" label="Business Subtitle" required formik={formik} />
        </div>
        <div className="col-12">
          <FormField name="description" label="Business Description" required formik={formik} />
        </div>

        {/* Contact Info */}
        <div className="col-md-6">
          <FormField name="phone" label="Phone Number" required formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField name="email" label="Email Address" required formik={formik} />
        </div>
        <div className="col-12">
          <FormField name="web" label="Website URL" type="url" formik={formik} />
        </div>

        {/* Image Info */}
        <div className="col-md-6">
          <FormField name="image.url" label="Image URL" type="url" formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField name="image.alt" label="Image Description" formik={formik} />
        </div>

        {/* Address Info */}
        <div className="col-md-6">
          <FormField name="address.street" label="Street" required formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField 
            name="address.houseNumber" 
            label="House Number" 
            type="number" 
            required 
            formik={formik}
          />
        </div>
        <div className="col-md-6">
          <FormField name="address.city" label="City" required formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField name="address.state" label="State" formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField name="address.country" label="Country" required formik={formik} />
        </div>
        <div className="col-md-6">
          <FormField 
            name="address.zip" 
            label="Zip Code" 
            type="number" 
            required 
            formik={formik}
          />
        </div>

        {errorMessage && (
          <div className="col-12">
            <div className={`alert ${errorMessage.includes('Authentication') ? 'alert-warning' : 'alert-danger'}`} role="alert">
              {errorMessage}
            </div>
          </div>
        )}

        <div className="col-12 d-flex gap-2 justify-content-center mt-4">
          <button
            type="button"
            className={`btn ${theme.btnOutline}`}
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
          <button
            type="button"
            className={`btn ${theme.btnOutline}`}
            onClick={() => formik.resetForm()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid || !formik.dirty}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;