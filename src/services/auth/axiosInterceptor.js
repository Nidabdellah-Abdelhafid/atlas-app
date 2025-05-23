import axios from 'axios';
import { jwtTokenService } from './jwtTokenService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url.includes('/login')) {
      return config;
    }

    if (config.url.includes('/refreshToken')) {
      const refreshToken = jwtTokenService.getRefreshToken();
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      }
      return config;
    }

    const token = jwtTokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;