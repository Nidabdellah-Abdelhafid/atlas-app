const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const encodeId = (id) => {
    if (!id) return '';
    const timestamp = Date.now();
    const data = `${id}-${timestamp}-${SECRET_KEY}`;
    return btoa(data).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };
  
export  const decodeId = (encodedId) => {
    try {
      if (!encodedId) return null;
      const padding = '='.repeat((4 - (encodedId.length % 4)) % 4);
      const base64 = encodedId.replace(/-/g, '+').replace(/_/g, '/') + padding;
      const decoded = atob(base64);
      const [id, timestamp] = decoded.split('-');
      
      // Validate timestamp (e.g., link expires after 24 hours)
      const now = Date.now();
      const validDuration = 24 * 60 * 60 * 1000; // 24 hours
      if (now - parseInt(timestamp) > validDuration) {
        return null;
      }
      
      return id;
    } catch (error) {
      return null;
    }
  };