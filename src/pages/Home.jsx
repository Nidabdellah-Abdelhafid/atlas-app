import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoveDownIcon, Search } from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';
import { fetchBlogs, fetchOffres, fetchPays} from '../services/fetchers/dataFetchers';
import { encodeLabel } from '../utils/idEncoder';
import { useApiStatus } from '../context/ApiStatusContext';

function Home() {
  // Add this near the top of your component
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState('Club All-In');
  const [filteredOffresByTheme, setFilteredOffresByTheme] = useState([]);
  const [filteredOffresByBadge, setFilteredOffresByBadge] = useState([]);
  const [currentEvasionSlide, setCurrentEvasionSlide] = useState(0);
  const evasionCarouselRef = useRef(null);
  const [pays, setPays] = useState([]);
  const [offres, setOffres] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { apiStatus } = useApiStatus();
  const carouselStyles = {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    scrollBehavior: 'smooth',
    userSelect: 'none',
    touchAction: 'none',
    pointerEvents: 'auto',
    scrollSnapType: 'x mandatory'
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    loadPaysData();
    loadOffresData();
    loadBlogsData();
  }, []);

  const loadPaysData = async () => {
    try {
      const paysData = await fetchPays();
      // console.log(paysData)
      setPays(paysData);
    } catch (error) {
      console.error('Error fetching pays:', error);

    }
  };

  const loadOffresData = async () => {
    try {
      setIsLoading(true);
      const offresData = await fetchOffres();
      // console.log("offres : ", offresData);
      setOffres(offresData);
      setFilteredOffresByTheme(offresData);
      setFilteredOffresByBadge(offresData.filter(offre => 
        offre.badges.some(badge => badge.label === "TENDANCE")
      ));
      
    } catch (error) {
      console.error('Error fetching offres:', error);

    } finally {
      setIsLoading(false);
    }
  };

  const loadBlogsData = async () => {
    try {
      setIsLoading(true);
      const blogsData = await fetchBlogs();
      // console.log("blogs : ", blogsData);
      setBlogs(blogsData);
      
    } catch (error) {
      console.error('Error fetching offres:', error);

    } finally {
      setIsLoading(false);
    }
  };

  const displayedOffres = filteredOffresByBadge.slice(0, 3);
  // const displayedPays = pays.slice(0, 3);
  const displayedBlogs = blogs.slice(0, 2);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const carouselRef = React.useRef(null);
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    const initializeCarousel = () => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        const slideWidth = carouselRef.current.offsetWidth;
        // Set to index 1 (second slide)
        const activeSlide = 1;
        
        carouselRef.current.scrollLeft = slideWidth * activeSlide;
        setCurrentSlide(activeSlide);
        setIsCarouselReady(true);
      }
    };

    // Initialize after DOM is ready
    const timer = setTimeout(initializeCarousel, 100);
    return () => clearTimeout(timer);
  }, [activeTab, filteredOffresByTheme]);

  // Update the nextSlide function
  const nextSlide = () => {
    if (carouselRef.current && isCarouselReady) {
      const slideWidth = carouselRef.current.offsetWidth;
      const nextSlideIndex = (currentSlide + 1) % filteredOffresByTheme.length;
      
      carouselRef.current.scrollTo({
        left: slideWidth * nextSlideIndex,
        behavior: 'smooth'
      });
      setCurrentSlide(nextSlideIndex);
    }
  };

  // Update the prevSlide function
  const prevSlide = () => {
    if (carouselRef.current && isCarouselReady) {
      const slideWidth = carouselRef.current.offsetWidth;
      const prevSlideIndex = (currentSlide - 1 + filteredOffresByTheme.length) % filteredOffresByTheme.length;
      
      carouselRef.current.scrollTo({
        left: slideWidth * prevSlideIndex,
        behavior: 'smooth'
      });
      setCurrentSlide(prevSlideIndex);
    }
  };

  

  // Add these functions before the return statement
  const nextEvasionSlide = () => {
    if (evasionCarouselRef.current) {
      const items = evasionCarouselRef.current.children;
      const nextIndex = (currentEvasionSlide + 1) % items.length;
      setCurrentEvasionSlide(nextIndex);
      items[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const prevEvasionSlide = () => {
    if (evasionCarouselRef.current) {
      const items = evasionCarouselRef.current.children;
      const prevIndex = (currentEvasionSlide - 1 + items.length) % items.length;
      setCurrentEvasionSlide(prevIndex);
      items[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  if (apiStatus === 'down') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F5F9]">
        <div className="text-center px-4 py-8">
          <img 
            src={`${process.env.PUBLIC_URL}/assets/images/Logo_AV.png`}
            alt="Atlas Voyages"
            className="w-32 mx-auto mb-8"
          />
          <h2 className="font-griffiths text-3xl sm:text-4xl text-[#8C6EA8] mb-4">
            Service temporairement indisponible
          </h2>
          <p className="font-manrope text-gray-600 mb-8 max-w-md mx-auto">
            Nous effectuons actuellement une maintenance. Veuillez réessayer dans quelques instants.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="font-manrope font-medium bg-[#8C6EA8] text-white px-8 py-3 rounded hover:bg-opacity-90 transition-colors"
          >
            Actualiser la page {'>'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div >
    <div className="relative min-h-screen">
      {/* Hero Section with Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero-bg.png)`,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex justify-end min-h-screen flex-col px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="font-griffiths text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-2">
          Des voyages signature
        </h1>
        <h2 className="font-griffiths text-white text-3xl sm:text-4xl lg:text-6xl font-700 mb-8 lg:mb-12 mt-2">
          depuis 1964
        </h2>

        {/* Search Inputs */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl">
        <div className="flex-1 relative" ref={searchRef}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCountry(null);
              if (e.target.value) {
                const filtered = pays.filter(country =>
                  country.label.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setSuggestions(filtered);
              } else {
                setSuggestions([]);
              }
            }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Où souhaitez-vous partir ?"
            className="font-manrope font-normal w-full py-3 px-4 pr-12 bg-white/90 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#8C6EA8]/50 transition-all duration-300"
          />
          <div 
            onClick={() => selectedCountry && navigate(`/destinationDetails/${encodeLabel(selectedCountry.label)}`)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${selectedCountry ? 'bg-[#8C6EA8]' : 'bg-gray-700'} hover:bg-[#8C6EA8] rounded-full p-1.5 cursor-pointer transition-colors duration-300`}
          >
            <Search className="text-white" size={18} />
          </div>
        </div>

  
          {/* Suggestions dropdown */}
          {isSearchFocused && suggestions.length > 0 && (
            <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
              {suggestions.map((country) => (
                <div
                  key={country.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setSearchQuery(country.label);
                    setSelectedCountry(country);
                    setSuggestions([]);
                    setIsSearchFocused(false);
                  }}
                >
                  {country.image && (
                    <img 
                      src={`${country.image}`} 
                      alt={country.label}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <span className="font-manrope text-gray-800">{country.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
          <button className="font-manrope font-normal bg-white/5 backdrop-blur-sm py-3 px-6 border border-1 border-white text-white w-full sm:w-96 text-start">
            Proposez-moi une destination {'>'}
          </button>
        </div>

        {/* Scroll Icons */}
        <div className="text-white flex flex-row items-center justify-center pt-24">
          <div className="w-[1px] h-16 bg-white mr-2">
            
          </div>
          <div className="w-6 h-10 border border-white rounded-full flex justify-center items-center">
            <MoveDownIcon className='animate-bounce' color='white' size={20}/>
          </div>
        </div>

       
      </div> 

      </div>
        
      {/* 60 Years Section */}
      <div className="bg-white ">
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
            <div className='mx-8 sm:mx-8 lg:mx-24  flex justify-center items-center'>
              <div className="relative space-y-2 py-10 lg:py-20 my-8 sm:my-20 lg:my-10">
                <div 
                    className="absolute inset-0 bg-contain bg-start bg-no-repeat"
                    style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/semicer.png)`,
                    // filter: 'brightness(0.7)'
                    }}
                />
                <div className='relative'>
                  <div className='flex flex-row gap-4 items-center'>
                    <div className="text-5xl sm:text-5xl lg:text-[90px] leading-[0.9] tracking-tight">
                      60 ANS
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl tracking-wider">
                      D'ÉVASION<br />DANS
                    </div>
                  </div>
                  <div className="font-griffiths text-7xl sm:text-8xl lg:text-[150px] leading-[1] font-medium">
                    le Luxe
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F9F5F9] flex flex-col justify-center py-24 px-4 md:px-16">
              <p className="font-manrope font-light text-gray-600 text-md leading-relaxed mb-8">
                Depuis notre fondation en 1964, nous avons forgé une réputation d'excellence dans la création de voyages luxueux, guidés par une passion pour l'exploration et un dévouement envers nos clients. Chaque voyage est méticuleusement conçu pour refléter les désirs uniques de nos clients, tout en garantissant une aventure authentique et mémorable. Notre luxe réside dans l'espace, l'intimité et le style.
              </p>
              <div>
                <button className="font-manrope font-medium bg-[#8C6EA8] text-white px-6 py-3 hover:bg-opacity-90 transition-colors">
                  Plus sur Atlas Voyages {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* envies Section */}
      <div className="py-10 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h3 className="font-manrope font-normal text-gray-500 mb-2">DÉCOUVREZ</h3>
            <h2 className="font-manrope font-medium text-3xl">LE MONDE SELON VOS ENVIES</h2>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-16 text-lg sm:text-xl">
            <div className='flex items-center justify-center'>
                <div className='h-0.5 w-14 bg-gray-500'></div>
            </div>
            {["Club All-In", "Famille", "Croisière", "Ski", "Honeymoon", "Plage"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => {
                    setActiveTab(theme);
                    setFilteredOffresByTheme(theme === 'Club All-In' 
                      ? offres 
                      : offres.filter(offre => offre.themes.some(t => t.label === theme))
                    );
                  }}
                  className={`font-griffiths text-2xl ${
                    activeTab === theme
                      ? "text-black border-b-2 border-black"
                      : "text-gray-400 hover:text-black transition-colors"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>

        {/* Slider Section */}
        <div className="relative px-4">
            <div className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth max-w-[90vw] sm:max-w-[95vw] lg:max-w-[90vw] mx-auto space-x-4 carousel-container"
            style={carouselStyles}
            ref={carouselRef}
            >
              {filteredOffresByTheme.map((offre, index) => (
                <div 
                  key={offre.id} 
                  className="flex-none snap-center relative max-w-[90vw] sm:max-w-[95vw] lg:max-w-[80vw] h-[400px] sm:h-[500px]"
                >
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${index === currentSlide ? 'opacity-0' : 'opacity-50'}`} />
                  <img 
                    src={offre.image}
                    alt={offre.label} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white w-full">
                    <h3 className="font-griffiths text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 lg:mb-4">{offre.label}</h3>
                    <p className="font-manrope font-normal mb-3 sm:mb-4 max-w-xl text-white/90 text-sm sm:text-base line-clamp-2">
                      {offre.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <Link to={`/destinationDetails/${encodeLabel(offre?.pays.label)}`} className="font-manrope font-medium w-full sm:w-auto border border-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
                        Découvrir {'>'}
                      </Link>
                      <div className="font-manrope font-light text-xs sm:text-sm text-white/80 bg-white/20 px-4 sm:px-6 py-1.5 sm:py-2 w-full sm:w-auto text-center sm:text-left">
                        {offre.pays.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 p-2 sm:p-4 z-10"
            >
              <ChevronLeft size={100} className='text-white hover:text-[#8C6EA8] transition-colors duration-300'/>
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 p-2 sm:p-4 z-10 "
            >
                <ChevronRight size={100} className='text-white hover:text-[#8C6EA8] transition-colors duration-300'/>
            </button>
        </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="font-manrope font-medium bg-[#8C6EA8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors">
              Voir toutes vos envies {'>'}
            </button>
          </div>
        </div>


      </div>

     {/* Vedette Section */}
     <div className="flex items-center justify-center py-10 px-4 sm:px-8 lg:px-8 lg:mx-16">
     <div className="bg-[#F9F5F9] container mx-auto p-4 sm:p-6 lg:p-16">
        <h2 className="font-griffiths text-5xl mb-2">En Vedette</h2>
        <p className="font-manrope font-light text-gray-600 mb-12">
          Nos nouvelles inspirations de voyages,<br />
          soigneusement conçues et entièrement adaptées à vos envies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 mb-10">
          {pays.slice(0, pays.length > 3 ? 3 : pays.length).map((pays) => (
            <div key={pays.id} className="relative group cursor-pointer rounded-lg">
              <img 
                src={pays.image}
                alt={pays.label}
                className="w-full h-[484px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-manrope font-medium text-white text-2xl">{pays.label}</h3>
              </div>
              <div className="absolute bottom-0 right-0 p-6">
                <Link to={`/destinationDetails/${encodeLabel(pays.label)}`}>
                <ChevronRight className="text-white bg-black rounded-full" size={24} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Second row for remaining items */}
        {pays.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
            {pays.slice(3, pays.length > 4 ? 5 : 4).map((pays, index) => (
              <div 
                key={pays.id} 
                className={`relative group cursor-pointer rounded-lg ${
                  pays.length === 4 || index === 1 ? 'sm:col-span-8' : 'sm:col-span-4'
                }`}
              >
                <img 
                  src={pays.image}
                  alt={pays.label}
                  className="w-full h-[484px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-manrope font-medium text-white text-2xl">{pays.label}</h3>
                </div>
                <div className="absolute bottom-0 right-0 p-6">
                  <Link to={`/destinationDetails/${encodeLabel(pays.label)}`}>
                    <ChevronRight className="text-white bg-black rounded-full" size={24} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
            <div className="relative group cursor-pointer rounded-lg  sm:col-span-4">
              <img 
              src={`${process.env.PUBLIC_URL}/assets/images/japon.png`}
              alt="Japon" 
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 ">
              <h3 className="font-manrope font-medium text-white text-2xl">Japon</h3>
            </div>
            <div className="absolute bottom-6 right-6">
              <ChevronRight className="text-white bg-black/50 rounded-full p-1" size={32} />
            </div>
          </div>

          <div className="relative group cursor-pointer rounded-lg h-[484px] sm:h-[550px] lg:h-[622px] sm:col-span-8">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/thailande.png`}
              alt="Thailande" 
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-manrope font-medium text-white text-2xl">Thailande</h3>
            </div>
            <div className="absolute bottom-6 right-6">
              <ChevronRight className="text-white bg-black/50 rounded-full p-1" size={32} />
            </div>
          
          
          </div>


        </div> */}

        <div className="text-right mt-4">
          <button className="font-manrope font-medium text-gray-600 hover:text-black transition-colors">
            Voir plus {'>'}
          </button>
        </div>
      </div>
    </div>


     {/* Tendance Section */}
     <div className="py-8 sm:py-10 lg:py-14 px-4 sm:px-8 lg:px-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">TENDANCE du moment</h2>
            <p className="font-manrope font-light text-gray-600 text-sm sm:text-base">
              Les tendances voyages du moment,<br className="hidden sm:block" />
              pensées pour sublimer chaque envie d'évasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">

          {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3 sm:space-y-4 animate-pulse">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg bg-gray-200"></div>
              <div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : (
          displayedOffres?.map((offre, index) => (
          <div key={offre.id} 
          className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={offre.pays.image}
                    alt={offre.pays.label} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">
                    {offre.pays.label}
                    </span>
                  <Link to={`/destinationDetails/${encodeLabel(offre.pays.label)}`} className="flex font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">
                  En savoir plus 
                  <ChevronRight className="" size={24} />
                    </Link>
                    
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">
                  {offre.label}
                  </h3>
              </div>
            </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to={'/destinationsTendances'} className="font-manrope font-medium bg-[#8C6EA8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors">
              Voir toutes les tendances {'>'}
            </Link>
          </div>
        </div>
      </div>

      {/* Évasions Section */} 
      <div className="py-8 sm:py-10 lg:py-14 px-4 sm:px-8 lg:px-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">Évasions Inattendues</h2>
            <p className="font-manrope font-light text-gray-600 text-sm sm:text-base">
              Découvrez des lieux hors des sentiers battus,<br className="hidden sm:block" /> où chaque détour révèle une nouvelle merveille.
            </p>
          </div>

          <div className="relative">
            <div className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth max-w-[90vw] sm:max-w-[85vw] lg:max-w-[90vw] mx-auto space-x-2 sm:space-x-2 carousel-container"
              style={carouselStyles}
              ref={evasionCarouselRef}
            >
              {[0, 1, 2, 3,4].map((index) => (
                <div 
                  key={index}
                  className={`flex-none w-[280px] sm:w-[350px] lg:w-[420px] snap-center group rounded-lg p-4 ${
                    currentEvasionSlide === index 
                      ? 'scale-95 opacity-100 z-10' 
                      : 'scale-95 opacity-90'
                  } transition-all duration-500`}
                >
                  <div className="relative h-[400px] sm:h-[460px] lg:h-[510px] rounded-lg overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                    <img 
                      src={`${process.env.PUBLIC_URL}/assets/images/${
                        index === 0 ? 'paris' : index === 1 ? 'rome' : 'tokyo'
                      }.png`}
                      alt={index === 0 ? 'Paris' : index === 1 ? 'Rome' : 'Tokyo'} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
                    />
                    <div className={`absolute inset-0 bg-black transition-opacity rounded-lg duration-500 ${
                      currentEvasionSlide === index ? 'opacity-0' : 'opacity-20'
                    }`} />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 group-hover:from-black/80`} />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      <span className="font-light text-xs sm:text-sm mb-1 sm:mb-2 block opacity-90 group-hover:opacity-100">
                        {index === 0 ? 'Paris' : index === 1 ? 'Rome' : 'Tokyo'}
                      </span>
                      <h3 className="font-griffiths text-xl sm:text-2xl mb-2 sm:mb-4 transform transition-all duration-300 group-hover:text-[1.7rem]">
                        Sauvage, vibrante<br />et indomptable
                      </h3>
                      <p className="font-manrope font-medium text-xs sm:text-sm text-white/80 mb-2 sm:mb-4 transition-opacity duration-300 group-hover:text-white hidden sm:block">
                        L'Afrique du Sud est un pays diversifié, connu pour ses paysages spectaculaires, sa faune sauvage et son histoire de lutte contre l'apartheid.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className='max-w-[90vw] sm:max-w-[85vw] lg:max-w-[80vw] flex justify-end items-center gap-2 sm:gap-4 mt-4'>
            <button 
              onClick={prevEvasionSlide}
              className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
            >
              <ChevronLeft size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
            </button>
            <button 
              onClick={nextEvasionSlide}
              className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
            >
              <ChevronRight size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
            </button>
          </div>
        </div>
      </div>

      {/* Actus Section */} 
      <div className="py-10 px-4 sm:px-8 lg:px-28 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-griffiths text-5xl mb-4 hover:text-[#8C6EA8] transition-colors">Actus Atlas</h2>
            <p className="font-manrope font-light text-gray-600">
              Articles, Blogs, Podcast, E-Mag
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isLoading ? (
            // Loading skeleton
            [...Array(2)].map((_, index) => (
              <div key={index} className="group bg-[#F8F4F8] p-4 rounded-[20px] sm:rounded-[40px] animate-pulse">
                <div className="relative h-[300px] sm:h-[400px] rounded-[20px] sm:rounded-[34px] overflow-hidden mb-6 bg-gray-200"></div>
                <div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex justify-between items-center mt-8">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayedBlogs?.map((blog) => (
          <div key={blog.id} className="group cursor-pointer bg-[#F8F4F8] p-4 rounded-[20px] sm:rounded-[40px]">
              <div className="relative h-[300px] sm:h-[400px] rounded-[20px] sm:rounded-[34px] overflow-hidden mb-6">
                <img 
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-griffiths text-2xl mb-2">{blog.subTitle}</h3>
                <div className="w-full">
                  <p className="font-manrope font-light text-gray-600 mb-4 line-clamp-4">
                    {blog.description}
                    </p> 
                </div>
                
                <div className="flex justify-between items-center my-4 mt-8">
                <div className='flex flex-col'>
                  <span className="font-manrope font-light text-gray-500">Par Atlas Voyages</span>
                  <span className="font-manrope font-light text-gray-500">{blog.createdAt}</span>
                </div>
                <Link to={`/blogDetails/${encodeLabel(blog.title)}`}  className="flex font-manrope font-light text-gray-500 hover:text-[#8C6EA8] transition-colors underline">
                  Lire l'article                   
                  <ChevronRight className="" size={24} />

                </Link>
                </div>
                
              </div>
            </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home