import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Укажите адрес вашего бэкенда
  withCredentials: true, // ВАЖНО: передача кук
});

export default api;