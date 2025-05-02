import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DestinationsTendances from './pages/DestinationsTendances';
import OffreDetails from './pages/OffreDetails';
// import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useEffect } from 'react';
import BlogDetails from './pages/BlogDetails';

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
            <Route path="/offreDetails" element={<OffreDetails />} />
            <Route path="/blogDetails" element={<BlogDetails />} />
          </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}


export default App;
