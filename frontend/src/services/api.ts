import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  getHospitals: async () => {
    const response = await axios.get(`${API_URL}/hospitals`);
    return response.data;
  },
  
  submitReview: async (reviewData: any, token: string) => {
    const response = await axios.post(`${API_URL}/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getHospitalDetails: async (id: string) => {
    const response = await axios.get(`${API_URL}/hospitals/${id}`);
    return response.data;
  }
};