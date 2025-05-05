import { AppService } from '../app_service/app-service';

export class ProgrammeService extends AppService {
  constructor() {
    super('/api/programmes');
  }
}