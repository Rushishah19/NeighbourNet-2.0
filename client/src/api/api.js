import axios from 'axios';

// Create the axios instance without Authorization header initially

const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});

// Add a request interceptor to attach the token from AsyncStorage
// api.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

export default api;
