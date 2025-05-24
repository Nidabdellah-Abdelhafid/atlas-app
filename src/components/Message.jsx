import React, { useEffect, useRef, useState } from 'react';
import { jwtTokenService } from '../services/auth/jwtTokenService';
import { createMessage, fetchMessages, setupMessageWebSocket } from '../services/fetchers/dataFetchers';
import { authService } from '../services/auth/authService';
import { Send } from 'lucide-react';

const Message = () => {
  const [user, setUser] = useState(null);
  const scrollContainer = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const response = await authService.getAuthUser();
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
        // Add minimum loading time for smooth transition
        setTimeout(() => setIsLoading(false), 1000);
        }
        };

        fetchUser();
    }, []);

    useEffect(() => {
      if (user) {
        const loadMessages = async () => {
          try {
            const response = await fetchMessages();
            const filteredMessages = response.filter(msg => 
              (msg.sender?.email === user.email && msg.receiver?.email === 'hafidnid909@gmail.com') ||
              (msg.sender?.email === 'hafidnid909@gmail.com' && msg.receiver?.email === user.email)
            );
            setMessages(filteredMessages);
            setAdmin({
              email: 'hafidnid909@gmail.com',
              fullname: 'Administrator'
            });
          } catch (error) {
            console.error('Error loading messages:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        loadMessages();
        const token = jwtTokenService.getAccessToken();
        const stompClient = setupMessageWebSocket(
          token,
          user.email,
          handleNewMessage
        );
    
        return () => {
          if (stompClient) {
            stompClient.deactivate();
          }
        };
      }
    }, [user]);

  const handleNewMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  

  const scrollToBottom = () => {
    if (scrollContainer.current) {
      setTimeout(() => {
        scrollContainer.current.scrollTo({
          top: scrollContainer.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (scrollContainer.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
      const isNotAtBottom = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isNotAtBottom);
    }
  };

  const refreshMessages = async () => {
    try {
      const response = await fetchMessages();
      const filteredMessages = response.filter(msg => 
        (msg.sender?.email === user?.email && msg.receiver?.email === 'hafidnid909@gmail.com') ||
        (msg.sender?.email === 'hafidnid909@gmail.com' && msg.receiver?.email === user?.email)
      );
      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error refreshing messages:', error);
    }
  };
  

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !admin) return;
    console.log("newMessage : ",newMessage , "sender : ",user?.email, "receiver : ",admin?.email);
    const messageData = {
      contenu: newMessage.trim(),
      date: new Date().toISOString(),
      sender: user?.email,
      receiver: admin?.email,
      status: false
    };

    const formData = new FormData();
    formData.append('message', JSON.stringify(messageData));

    try {
      await createMessage(formData);
      await refreshMessages();
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[80vh] bg-[#FCFAF7]">
      <div className="flex-1 flex flex-col">
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <div className="flex items-center px-4">
              <div className="avatar online">
                <div className="w-12 rounded-full bg-[#8C6EA8] ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`${process.env.PUBLIC_URL}/assets/images/Logo_AV.png`}  alt="Admin" className='p-1'/>
                </div>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">Customer Support</h2>
                <span className="text-sm text-gray-500">Always here to help</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={scrollContainer}
          onScroll={handleScroll}
          className="flex-1 custom-scrollbar p-4 space-y-4 relative"
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${message?.sender?.email === user?.email ? 'chat-end' : 'chat-start'}`}
              >
                <div className="chat-header">
                  {message?.sender?.email || 'Unknown'}
                  <time className="text-xs opacity-50 ml-1">
                    {new Date(message?.date || Date.now()).toLocaleTimeString()}
                  </time>
                </div>
                <div className={`chat-bubble ${
                  message?.sender?.email === user?.email ? 'chat-bubble-primary' : ''
                }`}>
                  {message?.contenu || 'No content'}
                </div>
              </div>
            ))
          )}

        {showScrollButton && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-24 right-4 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-focus transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )}
        </div>

        <div className="bg-base-100 p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input input-bordered flex-1 focus:outline-none focus:border-primary"
              placeholder="Type your message here..."
            />
            <button
              onClick={sendMessage}
              className="btn btn-primary rounded-full p-2"
              disabled={!newMessage.trim()}
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;