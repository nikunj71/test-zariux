import axios from 'axios';

const axiosServices = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.zariux.com',
});

axiosServices.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the current route is not '/login'
      //   if (window.location.pathname !== '/login') {
      //     // Redirect to login page
      //     // window.location.href = '/login';
      //   }
    }
    return Promise.reject(
      (error.response && error.response?.data?.detail) ||
        'Something went wrong, Please try again later',
    );
  },
);

export default axiosServices;
