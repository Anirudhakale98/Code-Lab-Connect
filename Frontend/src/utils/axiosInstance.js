import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '', // Replace with your backend URL
    withCredentials: true, // To include cookies
});

// Axios Interceptor for handling 401 and 403 errors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Clear local storage or any auth data
            localStorage.removeItem('user');
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
