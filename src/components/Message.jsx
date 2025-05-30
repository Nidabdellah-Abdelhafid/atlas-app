import React, { useEffect, useRef, useState } from 'react';
import { jwtTokenService } from '../services/auth/jwtTokenService';
import { createMessage, fetchMessages, setupMessageWebSocket } from '../services/fetchers/dataFetchers';
import { authService } from '../services/auth/authService';
import { Send, Paperclip, X, ChevronDown, FileText, MoreVertical, Mail, Phone } from 'lucide-react';

const MessageType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  DOCUMENT: 'DOCUMENT'
};


const Message = () => {
  const [user, setUser] = useState(null);
  const scrollContainer = useRef(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
              telephone: '+212 608089640',
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
  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  const sendMessage = async () => {
    if ((!newMessage.trim() && !selectedFile) || !user || !admin) return;
    
    setIsSending(true);

    const messageData = {
      contenu: newMessage.trim() || (selectedFile ? selectedFile.name : ''),
      date: new Date().toISOString(),
      sender: user?.email,
      receiver: admin?.email,
      status: false,
      messageType: selectedFile ? 
        (selectedFile.type.startsWith('image/') ? MessageType.IMAGE : MessageType.DOCUMENT) : 
        MessageType.TEXT,
      fileName: selectedFile ? selectedFile.name : undefined
    };
  
    const formData = new FormData();
    formData.append('message', JSON.stringify(messageData));
    
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
  
    try {
      if (newMessage.trim() && selectedFile) {
        // Send text message first
        const textMessageData = {
          ...messageData,
          contenu: newMessage.trim(),
          messageType: MessageType.TEXT,
          fileName: undefined
        };
        const textFormData = new FormData();
        textFormData.append('message', JSON.stringify(textMessageData));
        
        // Send text message
         await createMessage(textFormData);
        // setMessages(prev => [...prev, textResponse]);
        
        // Then send file message
         await createMessage(formData);
        // setMessages(prev => [...prev, fileResponse]);
      } else {
        // Send single message (either text or file)
         await createMessage(formData);
        // setMessages(prev => [...prev, response]);
      }
  
      // Reset form and scroll to bottom
      setNewMessage('');
      removeSelectedFile();
      scrollToBottom();
  
      // Refresh messages to ensure consistency
      await refreshMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const decodeUser = (base64String) => {
    return base64String ? `data:image/jpg;base64,${base64String}` : '';
  };

  const decode = (data) => {
    if (!data) return;
    
    const url = `${process.env.REACT_APP_API_URL}/uploads/${data}`;
    return new URL(url).href;
  };

  return (
    <div className="flex h-[80vh] bg-base-200">
  <div className="flex-1 flex flex-col">
    {/* Chat Header */}
    <div className="navbar bg-base-100 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="avatar online">
              <div className="w-12 rounded-full bg-[#8C6EA8] ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={`${process.env.PUBLIC_URL}/assets/images/Logo_AV.png`} alt="Admin" className='p-1'/>
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Customer Support</h2>
              <span className="text-sm text-gray-500">Always here to help</span>
            </div>
          </div>
          
          <button 
            className="btn btn-ghost btn-circle hover:bg-base-200"
            onClick={() => setIsDrawerOpen(true)}
          >
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
    </div>
    <div className={`drawer drawer-end ${isDrawerOpen ? 'drawer-open' : ''}`}>
    <input 
      id="contact-drawer" 
      type="checkbox" 
      className="drawer-toggle" 
      checked={isDrawerOpen}
      onChange={(e) => setIsDrawerOpen(e.target.checked)}
    />
    <div className="drawer-side">
      <label htmlFor="contact-drawer" className="drawer-overlay"></label>
      <div className="menu p-4 w-80 max-h-96 bg-base-100 text-base-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Contact Details</h3>
          <button 
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 p-2">
          <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-all duration-300 group backdrop-blur-sm shadow-sm">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Mail size={20} className="text-primary"/>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-base-content/80 text-sm uppercase tracking-wide mb-1">
                Email Address
              </div>
              <a 
                href={`mailto:${admin?.email || 'hafidnid909@gmail.com'}`}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              >
                {admin?.email || 'hafidnid909@gmail.com'}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-all duration-300 group backdrop-blur-sm shadow-sm">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Phone size={20} className="text-primary"/>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-base-content/80 text-sm uppercase tracking-wide mb-1">
                Phone Number
              </div>
              <a 
                href={`tel:${admin?.telephone || '+212608089640'}`}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 group-hover:translate-x-1 transition-transform"
              >
                {admin?.telephone || '+212 608089640'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    {/* Messages Container */}
    <div 
      ref={scrollContainer}
      onScroll={handleScroll}
      className="flex-1 custom-scrollbar p-4 space-y-4 relative"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="loading loading-spinner loading-lg text-[#8C6EA8]"></div>
        </div>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message?.sender?.email === user?.email ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img 
                  src={decodeUser(message?.sender?.userPhoto) || '/assets/default-avatar.png'} 
                  alt={message?.sender?.email} 
                />
              </div>
            </div>
            <div className="chat-header">
              {message?.sender?.email}
              <time className="text-xs opacity-50">
                {new Date(message?.date).toLocaleTimeString()}
              </time>
            </div>
            <div className={`chat-bubble ${
              message?.sender?.email === user?.email ? 'chat-bubble-primary' : ''
            }`}>
              {/* Text Message */}
              {message.messageType === 'TEXT' && (
                <div>{message.contenu}</div>
              )}
              
              {/* Image Message */}
              {message.messageType === 'IMAGE' && (
                <div className="max-w-sm cursor-zoom-in hover:opacity-90 transition-opacity">
                  <img 
                    src={decode(message.mediaUrl)} 
                    alt="Message content" 
                    className="rounded-lg max-h-48 w-auto hover:shadow-lg transition-shadow"
                    onClick={() => openImageModal(decode(message.mediaUrl))}
                    onError={(e) => e.currentTarget.src = '/assets/default-image.png'}
                  />
                </div>
              )}

              {/* Document Message */}
              {message.messageType === 'DOCUMENT' && (
                <div className="flex items-center gap-2 bg-base-200/20 p-2 rounded-lg">
                  <FileText />
                  <div className="flex flex-col">
                    <span className="text-sm">{message.fileName}</span>
                    <a
                      href={decode(message.mediaUrl)}
                      download={message.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      Download
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-footer opacity-50">
              Seen at {new Date(message?.date).toLocaleTimeString()}
            </div>
          </div>
        ))
      )}

      {/* Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-36 right-2 btn btn-circle btn-primary animate-bounce shadow-lg z-50 transition-all duration-300 hover:scale-110"
          title="Scroll to bottom"
        >
          <ChevronDown size={18}/>
        </button>
      )}
    </div>
    

    {/* Message Input */}
    <div className="bg-base-100 p-4 border-t">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-ghost btn-circle"
            title="Select document"
          >
            <Paperclip size={16}/>
          </button>
        </div>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="input input-bordered flex-1 focus:outline-none focus:border-primary"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="btn btn-circle btn-primary btn-sm flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
          disabled={(!newMessage.trim() && !selectedFile) || isSending}
          title="Send Message"
        >
          {isSending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <Send size={16}/>
          )}
        </button>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="mt-2 relative inline-block">
          <div className="relative group">
            {filePreview ? (
              <div className="max-w-xs">
                <img src={filePreview} className="max-h-32 rounded" alt="Preview" />
              </div>
            ) : (
              <div className="p-2 bg-gray-100 rounded">
                <i className="bi bi-file-earmark"></i>
                {selectedFile.name}
              </div>
            )}
            <button
              onClick={removeSelectedFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
              title="Remove file"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
    
  </div>
  {/* Image Modal */}
  {isImageModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img 
          src={selectedImage} 
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
          alt="Full size view" 
        />
        <button 
          onClick={closeImageModal}
          className="absolute -top-4 -right-4 btn btn-circle btn-sm btn-error"
          title="close"
        >
          <X color='white'/>
        </button>
      </div>
    </div>
  )}

  {/* <div className={`drawer drawer-end ${isDrawerOpen ? 'drawer-open' : ''}`}>
    <input 
      id="contact-drawer" 
      type="checkbox" 
      className="drawer-toggle" 
      checked={isDrawerOpen}
      onChange={(e) => setIsDrawerOpen(e.target.checked)}
    />
    <div className="drawer-side">
      <label htmlFor="contact-drawer" className="drawer-overlay"></label>
      <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Contact Details</h3>
          <button 
            className="btn btn-ghost btn-circle btn-sm"
            onClick={() => setIsDrawerOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
            <Mail size={20} className="text-primary"/>
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-sm select-text">{admin?.email || 'hafidnid909@gmail.com'}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
            <Phone size={20} className="text-primary"/>
            <div>
              <div className="font-semibold">Phone</div>
              <div className="text-sm select-text">{admin?.telephone || '+212 6XX-XXXXXX'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> */}
</div>
  );
};

export default Message;