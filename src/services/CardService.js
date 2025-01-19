import axiosInstance from "../utils/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_URL;

// Get all cards
export const getAllCards = async () => {
  try {
    const response = await axiosInstance.get('/cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cards');
  }
};

// Get card by ID
export const getCardById = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching card:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch card');
  }
};

// Get user's own cards
// Find this existing function in CardService.js
export const getMyCards = async () => {
  try {
    // Check if token exists
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Auth Token:', token ? 'Present' : 'Missing');

    // Log the request
    console.log('Sending request to /cards/my-cards');
    const response = await axiosInstance.get('/cards/my-cards');
    
    // Log the response
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    throw new Error(error.response?.data?.message || 'Failed to fetch your cards');
  }
};
// Create new card
export const createCard = async (cardData) => {
  try {
    const response = await axiosInstance.post('/cards', cardData);
    return response.data;
  } catch (error) {
    console.error('Error creating card:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to create card');
  }
};

// Update card
export const updateCard = async (cardId, cardData) => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}`, cardData);
    return response.data;
  } catch (error) {
    console.error('Error updating card:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update card');
  }
};

// Delete card
export const deleteCard = async (cardId) => {
  try {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting card:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to delete card');
  }
};

// Like/Unlike card
export const toggleLikeCard = async (cardId) => {
  try {
    const response = await axiosInstance.patch(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error updating like status:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update like status');
  }
};
export const toggleFavorite = async (cardId) => {
  try {
  
    const response = await axiosInstance.patch(`/cards/${cardId}`);
    
    // Log successful response
    console.log('Toggle favorite response:', response.data);
    
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Favorite toggle error details:', {
      cardId,
      errorStatus: error.response?.status,
      errorMessage: error.response?.data,
      fullError: error
    });
    
    throw new Error(error.response?.data?.message || 'Failed to update favorite status');
  }
};


export const getFavoriteCards = async () => {
  try {
    const response = await axiosInstance.get('/users/cards');
    console.log('Favorite cards response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite cards:', error);
    throw new Error('Failed to fetch favorite cards');
  }
};