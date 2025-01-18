import * as Yup from "yup";

export const nameValidation = Yup.object({
	first: Yup.string()
		.min(2, "First name must contain at least 2 characters.")
		.max(256, "First name cannot exceed 256 characters.")
		.required("First name is a required field."),
	middle: Yup.string()
		.min(2, "Middle name must contain at least 2 characters.")
		.max(256, "Middle name cannot exceed 256 characters.")
		.notRequired(),
	last: Yup.string()
		.min(2, "Last name must contain at least 2 characters.")
		.max(256, "Last name cannot exceed 256 characters.")
		.required("Last name is a required field."),
});

export const phoneValidation = Yup.string()
	.matches(
		/^0\d{8,10}$/,
		"Phone number must be between 9 and 11 digits and contain only numbers."
	)
	.required("Phone number is a required field.");

export const emailValidation = Yup.string()
	.email("Invalid email format.")
	.min(5, "Email must contain at least 5 characters.")
	.required("Email is a required field.");

export const passwordValidation = Yup.string()
	.min(8, "Password must be at least 8 characters.")
	.max(20, "Password cannot exceed 20 characters.")
	.matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
	.matches(/[a-z]/, "Password must contain at least one lowercase letter.")
	.matches(/.*\d.*\d.*\d.*\d/, "Password must contain at least four numbers.")
	.matches(
		/[!@#$%^&*_-]/,
		"Password must contain at least one special character (*_-*&^%$#@!)."
	)
	.required("Password is a required field.");

export const imageValidation = Yup.object({
	url: Yup.string()
		.url("Invalid URL.")
		.min(14, "URL must contain at least 14 characters."),
	alt: Yup.string()
		.min(2, "Image's Description must contain at least 2 characters.")
		.max(256, "Image's Description cannot exceed 256 characters."),
});

export const addressValidation = Yup.object({
	state: Yup.string()
		.min(2, "State must contain at least 2 characters.")
		.max(256, "State cannot exceed 256 characters."),
	country: Yup.string()
		.min(2, "Country must contain at least 2 characters.")
		.max(256, "Country cannot exceed 256 characters.")
		.required("Country is a required field."),
	city: Yup.string()
		.min(2, "City must contain at least 2 characters.")
		.max(256, "City cannot exceed 256 characters.")
		.required("City is a required field."),
	street: Yup.string()
		.min(2, "Street must contain at least 2 characters.")
		.max(256, "Street cannot exceed 256 characters.")
		.required("Street is a required field."),
	houseNumber: Yup.number()
		.typeError("House number must contain only numbers.")
		.min(
			1,
			"House number must contain at least 1 digit and cannot be lower than 1."
		)
		.required("House number is a required field."),
	zip: Yup.number()
		.typeError("Zipcode must contain only numbers.")
		.min(1, "Zipcode must contain at least 1 digit and cannot be lower than 1.")
		.required("Zipcode is a required field."),
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
