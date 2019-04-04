import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

const token = JSON.parse(localStorage.getItem('@GoTwitter:account')).token;
 
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default api;