import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const BASE_URL = process.env.REACT_APP_API_URL;

export class MessageService {
    constructor() {
        this.url = `${BASE_URL}/api/messages`;
    }

    async getAll() {
        try {
          const response = await axios.get(this.url, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
    }
    
    async create(resource) {
        try {
          const response = await axios.post(this.url, resource, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          return response.data;
        } catch (error) {
          throw error;
        }
    }

    static setupWebSocket(token, email, onMessageReceived) {
        const stompClient = new Client({
          webSocketFactory: () => {
            const socket = new SockJS(`${BASE_URL}/ws`);
            socket.transportOptions = {
              'xhr': {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
            };
            return socket;
          },
          connectHeaders: {
            'Authorization': `Bearer ${token}`
          },
          onConnect: () => {
            console.log('Connected to WebSocket');
            MessageService.subscribeToMessages(stompClient, email, onMessageReceived);
          },
          onStompError: (frame) => {
            console.error('STOMP error:', frame);
          }
        });
    
        stompClient.activate();
        return stompClient;
    }

    static subscribeToMessages(stompClient, email, onMessageReceived) {
        if (email) {
          stompClient.subscribe(`/user/${email}/queue/messages`, message => {
            const newMessage = JSON.parse(message.body);
            onMessageReceived(newMessage);
          });
        }
    }
    
      
}

