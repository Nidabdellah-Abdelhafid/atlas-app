import { AppService } from '../app_service/app-service';

export class ThemeService extends AppService {
  constructor() {
    super('/api/themes');
  }
}