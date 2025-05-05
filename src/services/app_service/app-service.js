import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export class AppService {
  constructor(endpoint) {
    this.url = `${BASE_URL}${endpoint}`;
  }

  async getAll() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async create(resource) {
    try {
      const response = await axios.post(this.url, resource);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(resource) {
    try {
      const response = await axios.put(`${this.url}/${resource.id}`, resource);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async delete(resource) {
    try {
      const response = await axios.delete(`${this.url}/${resource.id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}