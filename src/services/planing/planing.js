import { AppService } from '../app_service/app-service';

export class PlaningService extends AppService {
  constructor() {
    super('/api/planings');
  }
}