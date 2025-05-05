import { AppService } from '../app_service/app-service';

export class OffreService extends AppService {
  constructor() {
    super('/api/offres');
  }
}