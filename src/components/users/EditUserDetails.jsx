import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";
import { useTheme } from "../../providers/ThemeProvider";
import { useSnack } from "../../providers/SnackbarProvider";

const nameValidation = Yup.object({
  first: Yup.string()
    .required("First name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  middle: Yup.string()
    .max(50, "Maximum 50 characters"),
  last: Yup.string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
});

const phoneValidation = Yup.string()
  .required("Phone number is required")
  .matches(/^[0-9-+()]*$/, "Invalid phone number")
  .min(9, "Phone number must be at least 9 digits")
  .max(15, "Phone number can't exceed 15 digits");

const imageValidation = Yup.object({
  url: Yup.string().url("Must be a valid URL"),
  alt: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters")
});

const addressValidation = Yup.object({
  state: Yup.string()
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  country: Yup.string()
    .required("Country is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  city: Yup.string()
    .required("City is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  street: Yup.string()
    .required("Street is required")
    .min(2, "Minimum 2 characters")
    .max(100, "Maximum 100 characters"),
  houseNumber: Yup.string()
    .required("House number is required")
    .min(1, "Required field"),
  zip: Yup.string()
    .required("Zip code is required")
    .min(2, "Minimum 2 characters")
    .max(10, "Maximum 10 characters")
});

const FormField = ({ name, label, placeholder, type = "text", formik, capitalize = false }) => {
  const fieldValue = name.split('.').reduce((obj, key) => obj?.[key], formik.values);
  const [field, nestedField] = name.split('.');
  const hasError = formik.touched[field]?.[nestedField] && formik.errors[field]?.[nestedField];

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={fieldValue || ''}
        style={capitalize ? { textTransform: 'capitalize' } : undefined}
      />
      {hasError && (
        <div className="invalid-feedback">
          {formik.errors[field][nestedField]}
        </div>
      )}
    </div>
  );
};

const EditUserDetails = ({ setDisplay }) => {
  const { theme } = useTheme();
  const setSnack = useSnack();
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const userId = token ? jwtDecode(token)?._id : null;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
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
      name: nameValidation,
      phone: phoneValidation,
      image: imageValidation,
      address: addressValidation,
    }),
    onSubmit: async (values) => {
      try {
        const updatedUser = {
          name: values.name,
          phone: values.phone,
          image: values.image,
          address: {
            ...values.address,
            houseNumber: Number(values.address.houseNumber),
            zip: Number(values.address.zip)
          }
        };
        
        await updateUser(updatedUser, userId);
        setSnack('success', 'Profile updated successfully');
        if (setDisplay) {
          setDisplay(false);
        }
        window.location.reload();
      } catch (error) {
        console.error("Update failed:", error);
        setSnack('error', 'Failed to update profile');
        setErrorMessage("Failed to update user details.");
      }
    },
  });
  useEffect(() => {
    if (!userId) {
      setErrorMessage("No user ID found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUserById();
        formik.setValues({
          name: {
            first: userData.name.first || "",
            middle: userData.name.middle || "",
            last: userData.name.last || "",
          },
          phone: userData.phone || "",
          image: {
            url: userData.image?.url || "",
            alt: userData.image?.alt || "",
          },
          address: {
            state: userData.address?.state || "",
            country: userData.address?.country || "",
            city: userData.address?.city || "",
            street: userData.address?.street || "",
            houseNumber: userData.address?.houseNumber?.toString() || "",
            zip: userData.address?.zip?.toString() || "",
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <FormField
              name="name.first"
              label="First Name (required)"
              placeholder="First Name"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="name.middle"
              label="Middle Name"
              placeholder="Middle Name"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="name.last"
              label="Last Name (required)"
              placeholder="Last Name"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="phone"
              label="Phone (required)"
              placeholder="Phone"
              formik={formik}
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              type="url"
              name="image.url"
              label="Image URL"
              placeholder="Image URL"
              formik={formik}
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="image.alt"
              label="Image Description"
              placeholder="Image Description"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.state"
              label="State"
              placeholder="State"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.country"
              label="Country (required)"
              placeholder="Country"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.city"
              label="City (required)"
              placeholder="City"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.street"
              label="Street (required)"
              placeholder="Street"
              formik={formik}
              capitalize
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.houseNumber"
              label="House Number (required)"
              placeholder="House Number"
              formik={formik}
            />
          </div>
          <div className="col-md-6 mb-3">
            <FormField
              name="address.zip"
              label="Zip-Code (required)"
              placeholder="Zip"
              formik={formik}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            type="button"
            className={`btn ${theme.btnOutline}`}
            onClick={() => window.location.reload()}
          >
            Back
          </button>
          <button
            type="button"
            className={`btn ${theme.btnOutline}`}
            onClick={() => formik.resetForm()}
          >
            Clear
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Save Changes
          </button>
        </div>

        {errorMessage && (
          <div className="alert alert-danger text-center mb-3" role="alert">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default EditUserDetails;