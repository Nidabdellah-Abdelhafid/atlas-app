import { 
  BadgeService, 
  BlogService, 
  BlogContentService, 
  OffreService,
  PaysService,
  PhotoService,
  PlaningService,
  ProgrammeService,
  ThemeService,
  MessageService
} from '../index';

export const fetchBadges = async () => {
  try {
    const badgeService = new BadgeService();
    return await badgeService.getAll();
  } catch (error) {
    console.error('Error fetching badges:', error);
    throw error;
  }
};

export const fetchBlogs = async () => {
  try {
    const blogService = new BlogService();
    return await blogService.getAll();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const fetchBlogContents = async () => {
  try {
    const blogContentService = new BlogContentService();
    return await blogContentService.getAll();
  } catch (error) {
    console.error('Error fetching blog contents:', error);
    throw error;
  }
};

export const fetchOffres = async () => {
  try {
    const offreService = new OffreService();
    return await offreService.getAll();
  } catch (error) {
    console.error('Error fetching offres:', error);
    throw error;
  }
};

export const fetchPays = async () => {
  try {
    const paysService = new PaysService();
    return await paysService.getAll();
  } catch (error) {
    console.error('Error fetching pays:', error);
    throw error;
  }
};

export const fetchPhotos = async () => {
  try {
    const photoService = new PhotoService();
    return await photoService.getAll();
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
};

export const fetchPlanings = async () => {
  try {
    const planingService = new PlaningService();
    return await planingService.getAll();
  } catch (error) {
    console.error('Error fetching planings:', error);
    throw error;
  }
};

export const fetchProgrammes = async () => {
  try {
    const programmeService = new ProgrammeService();
    return await programmeService.getAll();
  } catch (error) {
    console.error('Error fetching programmes:', error);
    throw error;
  }
};

export const fetchThemes = async () => {
  try {
    const themeService = new ThemeService();
    return await themeService.getAll();
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
};


export const fetchMessages = async () => {
  try {
    const messageService = new MessageService();
    return await messageService.getAll();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const createMessage = async (messageData) => {
  try {
    const messageService = new MessageService();
    return await messageService.create(messageData);
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

export const setupMessageWebSocket = (token, userEmail, onMessageReceived) => {
  try {
    return MessageService.setupWebSocket(token, userEmail, onMessageReceived);
  } catch (error) {
    console.error('Error setting up WebSocket:', error);
    throw error;
  }
};

export const addOffreFavorite = async (data) => {
  try {
    return await OffreService.addFavoriteToOffre(data);
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

export const removeOffreFavorite = async (data) => {
  try {
    return await OffreService.removeFavoriteFromOffre(data);
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

