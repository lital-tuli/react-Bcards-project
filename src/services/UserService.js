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
        first: userData.name.first,
        middle: userData.name.middle || "",
        last: userData.name.last
      },
      phone: userData.phone,
      email: userData.email,
      password: userData.password,
      image: {
        url: userData.image.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        alt: userData.image.alt || "User Profile Image"
      },
      address: {
        state: userData.address.state || "",
        country: userData.address.country,
        city: userData.address.city,
        street: userData.address.street,
        houseNumber: Number(userData.address.houseNumber),
        zip: Number(userData.address.zip)
      },
      isBusiness: Boolean(userData.isBusiness)
    };

    const response = await axios.post(`${BASE_URL}/users`, formattedData);
    return response.data;
  } catch (error) {
    // Log the full error for debugging
    console.error('Registration Error Details:', {
      response: error.response?.data,
      status: error.response?.status,
      error: error
    });

    if (error.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Registration failed. Please try again.');
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

