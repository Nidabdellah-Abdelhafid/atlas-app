import { AppService } from '../app_service/app-service';

export class BlogService extends AppService {
  constructor() {
    super('/api/blogs');
  }
}