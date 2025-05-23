import axiosInstance from './axiosInterceptor';
const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
  login(data) {
    return axiosInstance.post(
      `${API_URL}/login`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  },

  logOutTkn() {
    return axiosInstance.get(`${API_URL}/refreshToken`);
  },

  getAuthUser() {
    return axiosInstance.get(`${API_URL}/profile`);
  },

  updateUser(id, userData) {
    return axiosInstance.put(`${API_URL}/profile/${id}`, userData);
  }
};