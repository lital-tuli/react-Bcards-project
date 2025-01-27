import * as Yup from "yup";

export const nameValidation = Yup.object({
  first: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(256, "First name cannot exceed 256 characters")
    .required("First name is required"),
  middle: Yup.string()
    .min(2, "Middle name must be at least 2 characters")
    .max(256, "Middle name cannot exceed 256 characters")
    .optional(),
  last: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(256, "Last name cannot exceed 256 characters")
    .required("Last name is required")
});

export const phoneValidation = Yup.string()
  .min(9, "Phone number must be at least 9 digits")
  .max(11, "Phone number cannot exceed 11 digits")
  .required("Phone number is required");

export const emailValidation = Yup.string()
  .email("Invalid email format")
  .min(5, "Email must be at least 5 characters")
  .required("Email is required");

export const passwordValidation = Yup.string()
  .min(9, "Password must be at least 9 characters")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[!@#$%^&*-]/, "Password must contain at least one special character (!@#$%^&*-)")
  .required("Password is required");

export const imageValidation = Yup.object({
  url: Yup.string()
    .min(14, "Image URL must be at least 14 characters")
    .required("Image URL is required"),
  alt: Yup.string()
    .min(2, "Image alt text must be at least 2 characters")
    .max(256, "Image alt text cannot exceed 256 characters")
    .required("Image alt text is required")
});

export const addressValidation = Yup.object({
  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .max(256, "State cannot exceed 256 characters"),
  country: Yup.string()
    .min(2, "Country must be at least 2 characters")
    .max(256, "Country cannot exceed 256 characters")
    .required("Country is required"),
  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(256, "City cannot exceed 256 characters")
    .required("City is required"),
  street: Yup.string()
    .min(2, "Street must be at least 2 characters")
    .max(256, "Street cannot exceed 256 characters")
    .required("Street is required"),
  houseNumber: Yup.number()
    .min(1, "House number must be at least 1")
    .max(256, "House number cannot exceed 256")
    .required("House number is required"),
  zip: Yup.number()
    .min(1, "Zip code must be at least 1")
    .max(256, "Zip code cannot exceed 256")
    .required("Zip code is required")
});

export const isBusinessValidation = Yup.boolean();

export const titleValidation = Yup.string()
	.min(2, "Title must contain at least 2 characters.")
	.max(256, "Title cannot exceed 256 characters.")
	.required("Title is a required field.");

export const subtitleValidation = Yup.string()
	.min(2, "Subtitle must contain at least 2 characters.")
	.max(256, "Subtitle cannot exceed 256 characters.")
	.required("Subtitle is a required field.");

export const descriptionValidation = Yup.string()
	.min(2, "Description must contain at least 2 characters.")
	.max(1024, "Description cannot exceed 1024 characters.")
	.required("Description is a required field.");

export const websiteValidation = Yup.string()
	.min(14, "Website must contain at least 14 characters.")
	.url("Invalid URL.");
