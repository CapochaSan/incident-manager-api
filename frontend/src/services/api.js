// Esto es como un "tunel" hacia la api de backend
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api' // URL del server de back de node.js
})

// MW de axios para inyectar el JWT en cada petición:
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;