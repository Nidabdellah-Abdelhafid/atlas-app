import { AppService } from '../app_service/app-service';

export class BadgeService extends AppService {
  constructor() {
    super('/api/badges');
  }
}