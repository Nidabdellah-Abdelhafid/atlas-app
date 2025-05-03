import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoveDownIcon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  // Add this near the top of your component
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState('Club All-In');
  const [currentEvasionSlide, setCurrentEvasionSlide] = useState(0);
  const evasionCarouselRef = useRef(null);
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
  }, []);

  const slides = {
    'Club All-In': [
      {
        id: 1,
        image: '/assets/images/afrique-sud.png',
        title: 'Club Atlas Marrakech',
        description: "Un palace marocain alliant tradition et modernité, avec spa, golf et services personnalisés.",
        location: 'Marrakech, Maroc',
        category: 'Club All-In'
      },
      {
        id: 2,
        image: '/assets/images/afrique-sud.png',
        title: 'Club Atlas Maldives',
        description: "Villas sur pilotis luxueuses avec majordome personnel et activités nautiques exclusives.",
        location: 'Malé, Maldives',
        category: 'Club All-In'
      },
      {
        id: 3,
        image: '/assets/images/afrique-sud.png',
        title: 'Club Atlas Bali',
        description: "Un sanctuaire de luxe au cœur de la jungle balinaise, mêlant spa holistique et gastronomie raffinée.",
        location: 'Ubud, Bali',
        category: 'Club All-In'
      },
      {
        id: 19,
        image: '/assets/images/afrique-sud.png',
        title: 'Club Atlas Dubai',
        description: "Une oasis urbaine de luxe avec vue sur Burj Khalifa, spa de classe mondiale et expériences exclusives.",
        location: 'Dubai, UAE',
        category: 'Club All-In'
      },
      {
        id: 20,
        image: '/assets/images/afrique-sud.png',
        title: 'Club Atlas Mauritius',
        description: "Resort privé sur une plage immaculée, offrant golf, spa et cuisine gastronomique.",
        location: 'Belle Mare, Mauritius',
        category: 'Club All-In'
      }
    ],
    'Famille': [
      {
        id: 4,
        image: '/assets/images/afrique-sud.png',
        title: 'Safari Tanzanie',
        description: "Une aventure familiale inoubliable à travers le Serengeti, avec hébergements luxueux et guides experts.",
        location: 'Serengeti, Tanzanie',
        category: 'Famille'
      },
      {
        id: 5,
        image: '/assets/images/afrique-sud.png',
        title: 'Disney World Deluxe',
        description: "Séjour premium avec accès VIP aux attractions, suite familiale et service de conciergerie personnalisé.",
        location: 'Orlando, USA',
        category: 'Famille'
      },
      {
        id: 6,
        image: '/assets/images/afrique-sud.png',
        title: 'Costa Rica Adventure',
        description: "Découverte de la jungle, volcans et plages en famille avec activités adaptées à tous les âges.",
        location: 'Arenal, Costa Rica',
        category: 'Famille'
      },
      {
        id: 24,
        image: '/assets/images/afrique-sud.png',
        title: 'Laponie Magique',
        description: "Rencontre avec le Père Noël, chiens de traîneau et aurores boréales en famille.",
        location: 'Rovaniemi, Finlande',
        category: 'Famille'
      },
      {
        id: 25,
        image: '/assets/images/afrique-sud.png',
        title: 'Australia Adventure',
        description: "Découverte de la Grande Barrière de Corail et de la faune australienne.",
        location: 'Queensland, Australie',
        category: 'Famille'
      }
    ],
    'Croisière': [
      {
        id: 7,
        image: '/assets/images/afrique-sud.png',
        title: 'Fjords Norvégiens',
        description: "Croisière de luxe à travers les majestueux fjords, avec escales exclusives et excursions privées.",
        location: 'Bergen, Norvège',
        category: 'Croisière'
      },
      {
        id: 8,
        image: '/assets/images/afrique-sud.png',
        title: 'Îles Grecques',
        description: "Navigation de luxe entre les plus belles îles grecques, avec expériences gastronomiques et culturelles.",
        location: 'Cyclades, Grèce',
        category: 'Croisière'
      },
      {
        id: 9,
        image: '/assets/images/afrique-sud.png',
        title: 'Caraïbes Élite',
        description: "Yacht privé avec équipage, exploration des îles paradisiaques et activités nautiques exclusives.",
        location: 'Antilles',
        category: 'Croisière'
      },
      {
        id: 29,
        image: '/assets/images/afrique-sud.png',
        title: 'Alaska Luxury',
        description: "Croisière d'exception à travers les glaciers avec excursions en hélicoptère.",
        location: 'Alaska, USA',
        category: 'Croisière'
      },
      {
        id: 30,
        image: '/assets/images/afrique-sud.png',
        title: 'Mediterranean Elite',
        description: "Voyage luxueux le long des côtes méditerranéennes avec escales exclusives.",
        location: 'Méditerranée',
        category: 'Croisière'
      }
    ],
    'Ski': [
      {
        id: 10,
        image: '/assets/images/afrique-sud.png',
        title: 'Courchevel 1850',
        description: "Chalet privé avec service 5 étoiles, accès direct aux pistes et instructeur personnel.",
        location: 'Courchevel, France',
        category: 'Ski'
      },
      {
        id: 11,
        image: '/assets/images/afrique-sud.png',
        title: 'Zermatt Luxury',
        description: "Séjour premium face au Cervin, avec héliski et restaurants étoilés.",
        location: 'Zermatt, Suisse',
        category: 'Ski'
      },
      {
        id: 12,
        image: '/assets/images/afrique-sud.png',
        title: 'Aspen Elite',
        description: "L'excellence du ski américain avec lodge privé et expériences exclusives.",
        location: 'Aspen, USA',
        category: 'Ski'
      },
      {
        id: 34,
        image: '/assets/images/afrique-sud.png',
        title: 'Verbier Excellence',
        description: "Domaine skiable prestigieux avec chalet privé et service 5 étoiles.",
        location: 'Verbier, Suisse',
        category: 'Ski'
      },
      {
        id: 35,
        image: '/assets/images/afrique-sud.png',
        title: 'Val d\'Isère Prestige',
        description: "Ski de haute altitude avec hébergement luxueux et après-ski raffiné.",
        location: 'Val d\'Isère, France',
        category: 'Ski'
      }
    ],
    'Honeymoon': [
      {
        id: 13,
        image: '/assets/images/afrique-sud.png',
        title: 'Bora Bora Paradise',
        description: "Villa sur pilotis avec piscine privée, spa en suite et service de majordome 24/7.",
        location: 'Bora Bora',
        category: 'Honeymoon'
      },
      {
        id: 14,
        image: '/assets/images/afrique-sud.png',
        title: 'Amalfi Romance',
        description: "Séjour romantique sur la côte amalfitaine avec expériences privées et dîners étoilés.",
        location: 'Amalfi, Italie',
        category: 'Honeymoon'
      },
      {
        id: 15,
        image: '/assets/images/afrique-sud.png',
        title: 'Santorini Dream',
        description: "Suite cave avec vue caldera, jacuzzi privé et services personnalisés.",
        location: 'Santorini, Grèce',
        category: 'Honeymoon'
      },
      {
        id: 39,
        image: '/assets/images/afrique-sud.png',
        title: 'Maldives Dream',
        description: "Villa sur l'eau avec piscine à débordement et expériences romantiques.",
        location: 'Maldives',
        category: 'Honeymoon'
      },
      {
        id: 40,
        image: '/assets/images/afrique-sud.png',
        title: 'Venice Romance',
        description: "Séjour romantique dans un palais vénitien avec services exclusifs.",
        location: 'Venise, Italie',
        category: 'Honeymoon'
      }
    ],
    'Plage': [
      {
        id: 16,
        image: '/assets/images/afrique-sud.png',
        title: 'Seychelles Exclusive',
        description: "Villa privée sur plage isolée avec service personnalisé et activités exclusives.",
        location: 'Mahé, Seychelles',
        category: 'Plage'
      },
      {
        id: 17,
        image: '/assets/images/afrique-sud.png',
        title: 'Maldives Premium',
        description: "Île privée avec villa sur-mesure et expériences uniques au cœur de l'océan Indien.",
        location: 'Malé, Maldives',
        category: 'Plage'
      },
      {
        id: 18,
        image: '/assets/images/afrique-sud.png',
        title: 'Turks & Caicos',
        description: "Resort exclusif avec plage privée et service de conciergerie dédié.",
        location: 'Providenciales',
        category: 'Plage'
      },
      {
        id: 44,
        image: '/assets/images/afrique-sud.png',
        title: 'Zanzibar Luxury',
        description: "Plages immaculées et villa privée avec service personnalisé.",
        location: 'Zanzibar, Tanzanie',
        category: 'Plage'
      },
      {
        id: 45,
        image: '/assets/images/afrique-sud.png',
        title: 'Fiji Private Island',
        description: "Île privée aux Fidji avec expériences exclusives et spa.",
        location: 'Fidji',
        category: 'Plage'
      }
    ]
  };

  const carouselRef = React.useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.children[1].offsetLeft,
        behavior: 'smooth'
      });
    }
  }, []);

  const nextSlide = () => {
  if (carouselRef.current) {
    const scrollWidth = carouselRef.current.scrollWidth;
    const itemWidth = scrollWidth / slides[activeTab].length;
    const newScrollPosition = ((currentSlide + 1) % slides[activeTab].length) * itemWidth;
    
    carouselRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
    setCurrentSlide((currentSlide + 1) % slides[activeTab].length);
  }
};

const prevSlide = () => {
  if (carouselRef.current) {
    const scrollWidth = carouselRef.current.scrollWidth;
    const itemWidth = scrollWidth / slides[activeTab].length;
    const newScrollPosition = ((currentSlide - 1 + slides[activeTab].length) % slides[activeTab].length) * itemWidth;
    
    carouselRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
    setCurrentSlide((currentSlide - 1 + slides[activeTab].length) % slides[activeTab].length);
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
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Où souhaitez-vous partir ?"
              className="font-manrope font-normal w-full py-3 px-4 pr-12 bg-white/90 backdrop-blur"
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-1'>
              <Search className="text-white" size={20} />
            </div>
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
            {Object.keys(slides).map((category) => (
                <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`font-griffiths text-2xl ${
                    activeTab === category
                    ? "text-black border-b-2 border-black"
                    : "text-gray-400 hover:text-black transition-colors"
                }`}
                >
                {category}
                </button>
            ))}
            </div>

        {/* Slider Section */}
        <div className="relative px-4">
            <div className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth max-w-[90vw] sm:max-w-[95vw] lg:max-w-[90vw] mx-auto space-x-4 carousel-container"
            style={carouselStyles}
            ref={carouselRef}
            >
              {slides[activeTab].map((slide, index) => (
                <div 
                    key={slide.id} 
                    className="flex-none snap-center relative max-w-[90vw] sm:max-w-[95vw] lg:max-w-[80vw] h-[400px] sm:h-[500px]"
                >
                  <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${index === currentSlide ? 'opacity-0' : 'opacity-50'}`} />
                  <img 
                    src={`${process.env.PUBLIC_URL}${slide.image}`}
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 text-white w-full">
                    <h3 className="font-griffiths text-2xl sm:text-3xl lg:text-4xl font-light mb-2 sm:mb-3 lg:mb-4">{slide.title}</h3>
                    <p className="font-manrope font-normal mb-3 sm:mb-4 max-w-xl text-white/90 text-sm sm:text-base">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    
                      <button className="font-manrope font-medium w-full sm:w-auto border border-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
                        Découvrir {'>'}
                      </button>
                      <div className="font-manrope font-light text-xs sm:text-sm text-white/80 bg-white/20 px-4 sm:px-6 py-1.5 sm:py-2 w-full sm:w-auto text-center sm:text-left">
                        {slide.location}
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
          <div className="relative group cursor-pointer rounded-lg">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/greece.png`}
              alt="Greece" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 ">
              <h3 className="font-manrope font-medium text-white text-2xl">Greece</h3>
            </div>
            <div className="absolute bottom-0 right-0 p-6 ">
              <ChevronRight className="text-white bg-black rounded-full " size={24} />
            </div>
          </div>

          <div className="relative group cursor-pointer rounded-lg">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/dubai.png`}
              alt="Dubai" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 ">
              <h3 className="font-manrope font-medium text-white text-2xl">Dubai</h3>
            </div>
            <div className="absolute bottom-0 right-0 p-6 ">
              <ChevronRight className="text-white bg-black rounded-full " size={24} />
            </div>
            
          </div>

          <div className="relative group cursor-pointer rounded-lg">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/argentine.png`}
              alt="Argentine" 
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 ">
              <h3 className="font-manrope font-medium text-white text-2xl">Argentine</h3>
            </div>
            <div className="absolute bottom-0 right-0 p-6 ">
              <ChevronRight className="text-white bg-black rounded-full " size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10">
            <div className="relative group cursor-pointer rounded-lg  sm:col-span-4">
              <img 
              src={`${process.env.PUBLIC_URL}/assets/images/japon.png`}
              alt="Japon" 
              className="w-full h-full object-cover rounded-lg"
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
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-manrope font-medium text-white text-2xl">Thailande</h3>
            </div>
            <div className="absolute bottom-6 right-6">
              <ChevronRight className="text-white bg-black/50 rounded-full p-1" size={32} />
            </div>
          
          
          </div>


        </div>

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
          <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/tanzanie.png`}
                  alt="Tanzanie" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">Tanzanie</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">Sauvage, vibrante<br />et indomptable</h3>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/bali.png`}
                  alt="Bali" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">Bali</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">Vibration tropicale<br />et âmes libres</h3>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/iceland.png`}
                  alt="Islande" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">Islande</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">Terres mystiques<br />et horizons infinis</h3>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/newyork.png`}
                  alt="New York" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">New York</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">Shopping Art<br />& Nightlife</h3>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/mexique.png`}
                  alt="Mexique" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">Mexique</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">Bienvenue<br />chez les Mayas !</h3>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/seychelles.png`}
                  alt="Seychelles" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base">Seychelles</span>
                  <span className="font-manrope font-light text-gray-500 text-sm sm:text-base hover:text-[#8C6EA8] transition-colors">En savoir plus {'>'}</span>
                </div>
                <h3 className="font-griffiths font-medium text-xl sm:text-2xl">luxe et plages<br />de rêve</h3>
              </div>
            </div>

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
            <div className="group cursor-pointer bg-[#F8F4F8] p-4 rounded-[20px] sm:rounded-[40px]">
              <div className="relative h-[300px] sm:h-[400px] rounded-[20px] sm:rounded-[34px] overflow-hidden mb-6">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/brazil.png`}
                  alt="Brazil" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-griffiths text-2xl mb-2">3 habitudes typiquement<br />brésiliennes</h3>
                <div className="w-full">
                  <p className="font-manrope font-medium text-gray-600 mb-4 ">
                    Lorsqu’il a déménagé au Brésil, notre correspondant Olivier a été quelque peu dérouté par le mode de vie des habitants. Quelques mois lui ont été nécessaires pour s’accoutumer aux retards fréquents ou au goût prononcé des Brésiliens pour la chaleur humaine et la proximité sociale. Autant d’habitudes qu’il conseille aux voyageurs d’adopter s’ils souhaitent se fondre dans le décor au cours de leur itinéraire au Brésil.
                  </p> 
                </div>
                
                <div className="flex justify-between items-center my-4 mt-8">
                <div className='flex flex-col'>
                  <span className="font-manrope font-light text-gray-500">Par Olivier</span>
                  <span className="font-manrope font-light text-gray-500">29 mars 2023</span>
                </div>
                <button className="font-manrope font-light text-gray-500 hover:text-[#8C6EA8] transition-colors underline">
                  Lire l'article {'>'}
                </button>
                </div>
                
              </div>
            </div>

            <div className="group cursor-pointer bg-[#F8F4F8] p-4 rounded-[20px] sm:rounded-[40px]">
              <div className="relative h-[300px] sm:h-[400px] rounded-[20px] sm:rounded-[34px] overflow-hidden mb-6">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/cuba.png`}
                  alt="Cuba" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-griffiths text-2xl mb-2">Cuba dans le rétro</h3>
                <div className="w-full">
                  <p className="font-manrope font-medium text-gray-600 mb-4 ">
                    À Cuba, les Cadillac rutilantes, les Chevrolet ragaillardies et les Buick rapiécées sillonnent les rues comme si on n’avait pas changé de siècle.
                    Mais pourquoi y a-t-il autant de vieilles voitures américaines sur l’île ? Comment peuvent-elles encore être en état de rouler ? Sont-elles en train d’être remplacées par des modèles flambants neufs ? Embarquez avec nous pour un voyage à Cuba et dans le temps ; fenêtres ouvertes et salsa à fond dans les enceintes.  
                  </p>
                </div>
                
                <div className="flex justify-between items-center my-4 mt-8">
                <div className='flex flex-col'>
                  <span className="font-manrope font-light text-gray-500">La Rédaction</span>
                  <span className="font-manrope font-light text-gray-500">13 janvier 2023</span>
                </div>
                <button className="font-manrope font-light text-gray-500 hover:text-[#8C6EA8] transition-colors underline">
                  Lire l'article {'>'}
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home