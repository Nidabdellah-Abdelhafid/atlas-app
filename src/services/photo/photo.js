import { AppService } from '../app_service/app-service';

export class PhotoService extends AppService {
  constructor() {
    super('/api/photos');
  }
}