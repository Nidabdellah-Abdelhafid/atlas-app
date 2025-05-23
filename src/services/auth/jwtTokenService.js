export const jwtTokenService = {
    set(data) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('email', data.email);
    },
  
    handle(data) {
      this.set(data);
    },
  
    getAccessToken() {
      return localStorage.getItem('access_token');
    },
  
    getRefreshToken() {
      return localStorage.getItem('refresh_token');
    },
  
    getEmail() {
      return localStorage.getItem('email');
    },
  
    remove() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('email');
    },
  
    decode(payload) {
      return JSON.parse(atob(payload));
    },
  
    payload(accessToken) {
      const payload = accessToken.split('.')[1];
      return this.decode(payload);
    },
  
    isValid() {
      const accessToken = this.getAccessToken();
      const email = this.getEmail();
  
      if (accessToken) {
        const payload = this.payload(accessToken);
        if (payload) {
          return email === payload.sub;
        }
      }
      return false;
    },
  
    getInfos() {
      const accessToken = this.getAccessToken();
      if (accessToken) {
        const payload = this.payload(accessToken);
        return payload ? payload : null;
      }
      return null;
    },
  
    loggedIn() {
      return this.isValid();
    }
  };