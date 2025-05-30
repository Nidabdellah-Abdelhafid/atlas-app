import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DestinationsTendances from './pages/DestinationsTendances';
import OffreDetails from './pages/OffreDetails';
import Header from './components/header/Header';
import { useEffect } from 'react';
import BlogDetails from './pages/BlogDetails';
import Blogs from './pages/Blogs';
import DestinationDetails from './pages/DestinationDetails';
import File from './pages/File';
import { ApiStatusProvider } from './context/ApiStatusContext';
import { useApiStatus } from './context/ApiStatusContext';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import EspaceClient from './pages/EspaceClient';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './context/ProtectedRoute';
import { RedirectIfAuthenticated } from './components/RedirectIfAuthenticated';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <ApiStatusProvider>
      <AuthProvider>
        <Router>
          <AppContent />
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ApiStatusProvider>
  );
}

function AppContent() {
  const { apiStatus } = useApiStatus();

  return (
     <>
    {apiStatus !== 'down' && ( <Header /> )}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/destinationsTendances" 
            element={<DestinationsTendances />

            } 
          />
          <Route 
            path="/destinationDetails/:encodedLabel" 
            element={<DestinationDetails />
            } 
          />
          <Route 
            path="/offreDetails/:encodedLabel" 
            element={<OffreDetails />
            } 
          />
          <Route 
            path="/file" 
            element={<File />
            } 
          />
          <Route 
            path="/register" 
            element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            } 
          />
          <Route 
            path="/login" 
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } 
          />
          <Route 
            path="/espaceClient" 
            element={
              <ProtectedRoute>
                <EspaceClient />
              </ProtectedRoute>
            } 
          />
            
          <Route 
            path="/blogDetails/:encodedLabel" 
            element={<BlogDetails />
            } 
          />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;