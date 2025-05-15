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

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <ApiStatusProvider>
      <AppContent />
    </ApiStatusProvider>
  );
}

function AppContent() {
  const { apiStatus } = useApiStatus();

  return (
     <Router>
    {apiStatus !== 'down' && ( <Header /> )}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinationsTendances" element={<DestinationsTendances />} />
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
            path="/blogDetails/:encodedLabel" 
            element={<BlogDetails />
            } 
          />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;