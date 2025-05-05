import { AppService } from '../app_service/app-service';

export class BlogContentService extends AppService {
  constructor() {
    super('/api/blog-contents');
  }
}