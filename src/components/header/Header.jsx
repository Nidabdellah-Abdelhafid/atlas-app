import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, ChevronRight, User, UserCircle, LogOut  } from 'lucide-react';
import { jwtTokenService } from '../../services/auth/jwtTokenService';
import { authService } from '../../services/auth/authService';
import { useAuth } from '../../context/AuthContext';
import { fetchPays } from '../../services/fetchers/dataFetchers';
import { encodeLabel } from '../../utils/idEncoder';

function Header() {
  const location = useLocation();
  const [destinationsOpen, setDestinationsOpen] = useState(false);
  const [enviesOpen, setEnviesOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isLoggedIn } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pays, setPays] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = jwtTokenService.getAccessToken();
        if (token) {
          const response = await authService.getAuthUser();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const isAuthPage = () => {
    return location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/espaceClient';
  };
  
  
  useEffect(() => {
    const loadPaysData = async () => {
      try {
        const response = await fetchPays();
        setPays(response);
      } catch (error) {
        console.error('Error fetching pays:', error);
      }
    };
    loadPaysData();
  }, []);

  const envies = [
    { title: 'Partir en famille', img: '/assets/images/family.png' },
    { title: 'Croisière de rêve', img: '/assets/images/cruise.png' },
    { title: 'À deux', img: '/assets/images/couple.png' },
    { title: 'Voyage en plage', img: '/assets/images/beach.png' },
    { title: 'All Inc', img: '/assets/images/allinc.png' }
  ];

  const destinations = pays?.map(pays => pays.label);

// Add this state near your other states
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEnviesOpen(false);
      }

      if (modalRef2.current && !modalRef2.current.contains(event.target)) {
        setDestinationsOpen(false);
      }

    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = React.useCallback(() => {
    if(destinationsOpen){
        setStateOpen(true);
        setEnviesOpen(false); 
    }else if(enviesOpen){
      setStateOpen(true);
      setDestinationsOpen(false);
    }else{
        setStateOpen(false);
    }
  }, [destinationsOpen, enviesOpen]);

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  
  
  // Update the logo and menu button section
  return (
    <header className={`fixed w-full z-50 ${
      isAuthPage() ? "bg-[#8C6EA8]" : 
      stateOpen ? "bg-white" : 
      isScrolled ? "bg-[#8C6EA8]" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between py-2 md:py-4">
          {/* Left Menu Items */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <button 
              className={`hover:text-gray-200 ${stateOpen? "text-black":"text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} className="md:w-6 md:h-6" />
            </button>
  
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button className={`flex items-center space-x-1 hover:text-gray-200 ${stateOpen? "text-black":"text-white"} text-base`}
              onClick={() => setDestinationsOpen(!destinationsOpen)}>
                <span>Destinations</span>
                {destinationsOpen? (<ChevronDown size={14} className="w-4 h-4"/>) :(<ChevronRight size={14} className="w-4 h-4"/>)}
              </button>
              <button 
                className={`flex items-center space-x-1 hover:text-gray-200 ${stateOpen? "text-black":"text-white"} text-base`}
                onClick={() => setEnviesOpen(!enviesOpen)}
              >
                <span>Vos envies</span>
                {enviesOpen? (<ChevronDown size={14} className="w-4 h-4"/>) :(<ChevronRight size={14} className="w-4 h-4"/>)}
              </button>
              <Link to="/blogs" className={`hover:text-gray-200 ${stateOpen? "text-black":"text-white"} text-sm md:text-base`}
              
              >
                  Blogs
                </Link>
            </div>
            
          </div>
  
          {/* Center Logo - Hidden on mobile */}
          <Link to="/" className={`hidden md:flex flex-col items-center ${stateOpen? "hidden":""}`}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/Logo_AV.png`} 
              alt="Atlas Voyages" 
              className="w-20 h-20 pt-4 object-contain"
            />
          </Link>
  
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white md:hidden">
              <div className="flex flex-col p-4 space-y-4">
                <button 
                  className="flex items-center space-x-1 text-black"
                  onClick={() => {
                    setDestinationsOpen(!destinationsOpen);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Destinations</span>
                  <ChevronRight size={14} />
                </button>
                <button 
                  className="flex items-center space-x-1 text-black"
                  onClick={() => {
                    setEnviesOpen(!enviesOpen);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Vos envies</span>
                  <ChevronRight size={14} />
                </button>
                <Link to="/blogs" className="text-black" onClick={() => setMobileMenuOpen(false)}>
                  Blogs
                </Link>
                <a href="tel:+212529001002" className="text-black">
                  +212 5 29 001 002
                </a>
              </div>
            </div>
          )}

          {/* Right Menu Items */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="tel:+212529001002" className={`border border-1 py-1 px-2 hover:text-gray-200 ${stateOpen? "text-black border-black":"text-white border-white"} text-xs md:text-base hidden sm:block`}>
              +212 5 29 001 002
            </a>
            <button className={`hover:text-gray-200 ${stateOpen? "text-black":"text-white"} text-sm md:text-base`}>
              Des propositions ?
            </button>
            {/* Account Button */}
            {user ? (
            <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className={`flex items-center text-[#8C6EA8] bg-white gap-2 hover:text-white hover:bg-[#8C6EA8] hover:border hover:border-white text-sm md:text-base px-4 py-1 rounded-sm`}
            >
              <User size={20} />
              <span className="">{user.fullname}</span>
              <ChevronDown size={14} className={`transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <Link
                to="/espaceClient"
                className="px-4 py-2 text-sm text-gray-700 hover:bg-[#8C6EA8] hover:text-white flex items-center gap-2"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <UserCircle size={16} />
                Espace Client
              </Link>
              <button
                onClick={() => {
                  jwtTokenService.remove();
                  window.location.href = '/';
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#8C6EA8] hover:text-white flex items-center gap-2"
              >
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          )}
          </div>
          ) : (
            <Link to='/login'
              className={`flex items-center text-[#8C6EA8] bg-white gap-2 hover:text-white hover:bg-[#8C6EA8] hover:border hover:border-white text-sm md:text-base px-4 py-1 rounded-sm`}
            >
              <User size={20} />
              <span className="">Se connecter</span>
            </Link>
          )}

          

              
          </div>
        </nav>

        {/* Envies Modal */}
        {enviesOpen && (
          <div className="absolute top-full left-0 w-full h-screen md:h-[84vh] bg-white p-4 md:p-10 flex flex-col items-center justify-center" ref={modalRef}>
            <h2 className="text-xl md:text-2xl text-gray-800 mb-4 md:mb-6">LE MONDE SELON VOS ENVIES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6 max-w-5xl mx-auto">
              {envies.map((envie, index) => (
                <Link 
                  key={index} 
                  to={`/`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden h-36 md:h-48">
                    <img 
                      src={envie.img} 
                      alt={envie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="bg-white py-2 md:py-3">
                    <span className="text-black text-base md:text-lg">{envie.title}</span>
                  </div>
                </Link>
              ))}
              <Link 
                to="/"
                className="aspect-[4/3] bg-[#8C6EA8] w-full h-36 md:h-48 hover:bg-purple-400 transition-colors flex items-center justify-center text-white text-xs md:text-sm"
              >
                <div className='border border-1 border-white py-1 px-2 md:py-2 md:px-4'>
                  Voir toutes vos envies {'>'}
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Destinations Modal */}
        {destinationsOpen && (
          <div className="absolute top-full left-0 w-full h-screen md:h-[84vh] bg-white p-4 md:p-10 overflow-y-auto" ref={modalRef2}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-16 gap-y-2 md:gap-y-4 max-w-6xl mx-auto">
            {destinations.map((destination, index) => (
              <Link 
                key={index}
                to={`/destinationDetails/${encodeLabel(destination)}`}
                className="text-gray-500 hover:text-black transition-colors text-sm md:text-base"
                onClick={() => setDestinationsOpen(false)}
              >
                {destination}
              </Link>
            ))}
          </div>
        </div>
        )}
      </div>
    </header>
  );
}

export default Header