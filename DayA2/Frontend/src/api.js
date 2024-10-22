import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Corrected export statement for backend_url
export const backend_url = 'http://localhost:8081'; // No extra quotes

export default api;
