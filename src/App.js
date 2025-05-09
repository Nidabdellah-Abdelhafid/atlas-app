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

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <Router>
      <Header />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinationsTendances" element={<DestinationsTendances />} />
          <Route 
            path="/destinationDetails/:encodedId" 
            element={<DestinationDetails />
            } 
          />
          <Route 
            path="/offreDetails/:encodedId" 
            element={<OffreDetails />
            } 
          />
          <Route 
            path="/blogDetails/:encodedId" 
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