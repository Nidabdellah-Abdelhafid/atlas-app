import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DestinationsTendances from './pages/DestinationsTendances';
import OffreDetails from './pages/OffreDetails';
// import Footer from './components/footer/Footer';
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
            <Route path="/destinationDetails/:id" element={<DestinationDetails />} />
            <Route path="/offreDetails/:id" element={<OffreDetails />} />
            <Route path="/blogDetails/:id" element={<BlogDetails />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}


export default App;
