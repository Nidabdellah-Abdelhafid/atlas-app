import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AlertTriangle, X } from 'lucide-react';

const BASE_URL = process.env.REACT_APP_API_URL;
const ApiStatusContext = createContext();

export const ApiStatusProvider = ({ children }) => {
    const [apiStatus, setApiStatus] = useState('checking');
    const [showAlert, setShowAlert] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

  const checkApiStatus = async () => {
    try {
      await axios.get(`${BASE_URL}/actuator/health`);
      setApiStatus('up');
      setShowAlert(false);
    } catch (error) {
      setApiStatus('down');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 60000*10); // Check every 10 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showAlert) {
      setIsVisible(true);
    }
  }, [showAlert]);

  return (
    <ApiStatusContext.Provider value={{ apiStatus, showAlert }}>
      {apiStatus === 'down' && showAlert && (
        <div 
          className={`fixed top-0 left-0 w-full transform transition-all duration-500 ease-in-out ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg">
            <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap">
                <div className="w-0 flex-1 flex items-center min-w-0">
                  <span className="flex p-2 rounded-lg bg-red-600">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </span>
                  <p className="ml-3 font-manrope text-white truncate">
                    <span className="md:hidden">Serveur indisponible</span>
                    <span className="hidden md:inline">
                      Le serveur n'est pas disponible. Veuillez réessayer dans quelques instants.
                    </span>
                  </p>
                </div>
                <div className="flex-shrink-0 sm:ml-3">
                  <button
                    type="button"
                    className="mr-1 flex p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                    onClick={() => setIsVisible(false)}
                  >
                    <span className="sr-only">Fermer</span>
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </ApiStatusContext.Provider>
  );
};

export const useApiStatus = () => useContext(ApiStatusContext);