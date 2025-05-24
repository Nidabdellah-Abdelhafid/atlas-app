import { AppService } from '../app_service/app-service';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export class OffreService extends AppService {
  constructor() {
    super('/api/offres');
  }

  static async addFavoriteToOffre(data) {
    return await axios.post(`${BASE_URL}/api/offres/userFvrOffre`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  static async removeFavoriteFromOffre(data) {
    return await axios.delete(`${BASE_URL}/api/offres/userFvrOffre`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      data: data
    });
  }
  
}