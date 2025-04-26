import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoveDownIcon, Search } from 'lucide-react';

function Home() {
  // Add this near the top of your component
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState('Club All-In');
  
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
    const nextIndex = (currentSlide + 1) % slides[activeTab].length;
    setCurrentSlide(nextIndex);
    carouselRef.current.scrollTo({
      left: carouselRef.current.children[nextIndex].offsetLeft,
      behavior: 'smooth'
    });
  };
  
  const prevSlide = () => {
    const prevIndex = (currentSlide - 1 + slides[activeTab].length) % slides[activeTab].length;
    setCurrentSlide(prevIndex);
    carouselRef.current.scrollTo({
      left: carouselRef.current.children[prevIndex].offsetLeft,
      behavior: 'smooth'
    });
  };


  // Replace your carousel section with this:
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
      <div className="relative z-10 flex justify-end min-h-screen  flex-col px-4 max-w-6xl mx-auto">
        <h1 className="text-white text-7xl font-bold mb-2">
          Des voyages signature
        </h1>
        <h2 className="text-white text-6xl font-700 mb-12 mt-2">
          depuis 1964
        </h2>

        {/* Search Inputs */}
        <div className="flex gap-4 max-w-4xl">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Où souhaitez-vous partir ?"
              className="w-full py-3 px-4 pr-12  bg-white/90 backdrop-blur"
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-1'>
            <Search className="text-white" size={20} />
            </div>
          </div>
          <button className="bg-white/5 backdrop-blur-sm py-3 px-6 border border-1 border-white text-white w-96 text-start">
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
      <div className="bg-white">
        <div className="container mx-auto ">
          <div className="grid md:grid-cols-2 gap-20">
            <div className='mx-24 '>
            <div className="relative space-y-2 py-20 my-10">
                <div 
                    className="absolute inset-0 bg-contain bg-start bg-no-repeat"
                    style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/semi-C.png)`,
                    // filter: 'brightness(0.7)'
                    }}
                />
                <div className='relative'>
                    <div className='flex flex-row gap-4 items-center'>
                        <div className="text-[90px] leading-[0.9] tracking-tight">
                    60 ANS
                </div>
                <div className="text-3xl tracking-wider">
                    D'ÉVASION
                    <br />
                    DANS
                </div>
                    </div>
                
                <div className="text-[160px] leading-[1] font-meduim">
                    le Luxe
                </div>
                </div>
                
            </div>
            </div>
            
            <div className="bg-[#F9F5F9] flex flex-col justify-center py-24 px-4 md:px-16">
              <p className="text-gray-600 text-md leading-relaxed mb-8">
                Depuis notre fondation en 1964, nous avons forgé une réputation d'excellence dans la création de voyages luxueux, guidés par une passion pour l'exploration et un dévouement envers nos clients. Chaque voyage est méticuleusement conçu pour refléter les désirs uniques de nos clients, tout en garantissant une aventure authentique et mémorable. Notre luxe réside dans l'espace, l'intimité et le style.
              </p>
              <div>
                <button className="bg-[#8C6EA8] text-white px-6 py-3 hover:bg-opacity-90 transition-colors">
                  Plus sur Atlas Voyages {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* envies Section */}
        <div className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h3 className="text-gray-500 mb-2">DÉCOUVREZ</h3>
            <h2 className="text-3xl">LE MONDE SELON VOS ENVIES</h2>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-8 mb-16 text-xl">
            <div className='flex items-center justify-center'>
                <div className='h-0.5 w-14 bg-gray-500'></div>
            </div>
            {Object.keys(slides).map((category) => (
                <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`${
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
        <div className="relative px-10">
            <div className="carousel carousel-center max-w-[90vw] mx-auto space-x-4"
            ref={carouselRef}
            >
              {slides[activeTab].map((slide, index) => (
                <div 
                    key={slide.id} 
                    className="carousel-item relative w-[70vw] h-[500px]"
                >
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${index === currentSlide ? 'opacity-0' : 'opacity-50'}`} />
                  <img 
                    src={`${process.env.PUBLIC_URL}${slide.image}`}
                    alt={slide.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-8 text-white bg-gradient-to-t from-black/50 to-transparent w-full">
                    <h3 className="text-4xl font-light mb-4">{slide.title}</h3>
                    <p className="mb-4 max-w-xl text-white/90">
                      {slide.description}
                    </p>
                    <div className="flex justify-between items-end">
                      <button className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors">
                        Découvrir {'>'}
                      </button>
                      <div className="text-sm text-white/80 bg-white/20 px-6 py-2">
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
                className="absolute left-10 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-lg z-10 transition-colors"
            >
                <ChevronLeft size={100} className='text-white hover:text-[#8C6EA8] transition-colors duration-300'/>
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-10 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-lg z-10 transition-colors"
            >
                <ChevronRight size={100} className='text-white hover:text-[#8C6EA8] transition-colors duration-300'/>
            </button>
        </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="bg-[#8C6EA8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors">
              Voir toutes vos envies {'>'}
            </button>
          </div>
        </div>


      </div>
      
      {/* Vedette Section */}

    </div>
  );
}

export default Home