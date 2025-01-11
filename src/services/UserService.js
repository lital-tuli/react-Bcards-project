import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

// Register a new user
export const registerUser = async (userData) => {
  try {
    // Transform the user data to match API requirements
    const formattedData = {
      name: {
        first: userData.firstName,
        middle: userData.middleName,
        last: userData.lastName
      },
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      image: {
        url: userData.imageUrl || "",
        alt: userData.imageAlt || ""
      },
      address: {
        state: userData.state || "",
        country: userData.country,
        city: userData.city,
        street: userData.street,
        houseNumber: parseInt(userData.houseNumber),
        zip: parseInt(userData.zip)
      },
      isBusiness: userData.isBusiness || false
    };

    const response = await axios.post(`${BASE_URL}/users`, formattedData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request
      throw new Error('Error setting up request');
    }
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Login request failed');
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

// Update user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

// Change user business status
export const changeBusinessStatus = async (userId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to change business status');
  }
};