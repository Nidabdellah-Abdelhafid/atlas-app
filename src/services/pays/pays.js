import { AppService } from '../app_service/app-service';

export class PaysService extends AppService {
  constructor() {
    super('/api/pays');
  }
}