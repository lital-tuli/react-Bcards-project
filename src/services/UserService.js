import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_API_URL;
const USERS_URL = `${BASE_URL}/users`;




// User Login
export const loginUser = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post(`${USERS_URL}/login`, {
      email,
      password
    });
    
    const token = response.data;
    
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    return token;
  } catch (error) {
    console.error("Login Error:", error.response || error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error('Failed to logout');
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    const formattedData = {
      name: {
        first: userData.firstName || userData.name?.first,
        middle: userData.middleName || userData.name?.middle,
        last: userData.lastName || userData.name?.last
      },
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      image: {
        url: userData.imageUrl || userData.image?.url || "https://i.ibb.co/B4rd7yx/default-Avatar.png",
        alt: userData.imageAlt || userData.image?.alt || "Avatar"
      },
      address: {
        state: userData.state || userData.address?.state || "",
        country: userData.country || userData.address?.country,
        city: userData.city || userData.address?.city,
        street: userData.street || userData.address?.street,
        houseNumber: parseInt(userData.houseNumber || userData.address?.houseNumber),
        zip: parseInt(userData.zip || userData.address?.zip)
      },
      isBusiness: userData.isBusiness || false
    };

    const response = await axios.post(USERS_URL, formattedData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('No response from server');
    }
    throw new Error('Error setting up request');
  }
};

// Check if email already registered
export const checkEmail = (email) => {
  return axios.get(`${USERS_URL}?email=${email}`);
};

// Get a User by ID
export const getUserById = async (userId = null) => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    
    // If no userId is provided, get the current user's ID from token
    if (!userId) {
      const decoded = jwtDecode(token);
      userId = decoded._id;
    }

    const response = await axios.get(`${USERS_URL}/${userId}`, {
      headers: { "x-auth-token": token }
    });
    
    return response.data;
  } catch (error) {
    console.error("Get User Error:", error);
    throw new Error('Failed to fetch user');
  }
};

// Get All Users
export const getAllUsers = async () => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const response = await axios.get(USERS_URL, {
      headers: { "x-auth-token": token }
    });
    return response.data;
  } catch (error) {
    console.error("Get All Users Error:", error);
    throw new Error('Failed to fetch users');
  }
};

// Update User
export const updateUser = async (updatedData, userId) => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const response = await axios.put(`${USERS_URL}/${userId}`, updatedData, {
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Update User Error:", error);
    throw new Error('Failed to update user');
  }
};

// Update User Business Status
export const updateUserType = async (userId) => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const response = await axios.patch(`${USERS_URL}/${userId}`, null, {
      headers: { "x-auth-token": token }
    });
    return response.data;
  } catch (error) {
    console.error("Update User Type Error:", error);
    throw new Error('Failed to change business status');
  }
};

// Update User Token
export const updateUserToken = async (email, password) => {
  try {
    const response = await loginUser(email, password, !!localStorage.getItem("token"));
    return response;
  } catch (error) {
    console.error("Token Update Error:", error);
    throw new Error('Failed to update token');
  }
};

// Delete User
export const deleteUser = async (userId) => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const response = await axios.delete(`${USERS_URL}/${userId}`, {
      headers: { "x-auth-token": token }
    });
    return response.data;
  } catch (error) {
    console.error("Delete User Error:", error);
    throw new Error('Failed to delete user');
  }
};

