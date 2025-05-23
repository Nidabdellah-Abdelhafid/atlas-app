import axiosInstance from '../auth/axiosInterceptor';
const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  addUser(data) {
    return axiosInstance.post(`${API_URL}/users/createUser`, data);
  },

  addRoleToUser(data) {
    return axiosInstance.post(`${API_URL}/addRoleToUser`, data);
  },

  getUsers() {
    return axiosInstance.get(`${API_URL}/users`);
  }
};