import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";


export const getAllCards = async () => {
  try {
    const response = await axiosInstance.get('/cards');
    return response.data;
  } catch (error) {
    console.error('Error fetching cards:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch cards');
  }
};

export const getCardById = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching card:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch card');
  }
};

export const getMyCards = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // console.log('Auth Token:', token ? 'Present' : 'Missing');

    console.log('Sending request to /cards/my-cards');
    const response = await axiosInstance.get('/cards/my-cards');
    
    // console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    // console.error('Error details:', {
    //   message: error.message,
    //   response: error.response?.data,
    //   status: error.response?.status,
    //   headers: error.response?.headers
    // });
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
// get all liked cards 
export const getFavoriteCards = async () => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }
    
    const userId = jwtDecode(token)._id;
    const response = await axiosInstance.get('/cards');
    
    // Simple filtering of liked cards
    const favoriteCards = response.data.filter(card => 
      card.likes && Array.isArray(card.likes) && card.likes.includes(userId)
    );

    return favoriteCards;
  } catch (error) {
    console.error('Error fetching favorite cards:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch favorite cards');
  }
};

// like / unlike 
export const toggleFavorite = async (cardId) => {
  try {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await axiosInstance({
      method: 'patch',
      url: `/cards/${cardId}`,
      headers: {
        'x-auth-token': token
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    throw new Error(error.response?.data?.message || 'Failed to update favorite status');
  }
};