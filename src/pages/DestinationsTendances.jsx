import React, { useEffect, useState, useRef } from 'react'
import { ChevronRight } from 'lucide-react';
import { fetchOffres } from '../services/fetchers/dataFetchers';
import { Link } from 'react-router-dom';
import { encodeId } from '../utils/idEncoder';

function DestinationsTendances() {

  const [showAll, setShowAll] = useState(false);
  const blogSectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredOffresByBadge, setFilteredOffresByBadge] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
        loadOffresData();
  }, []);
  
  const loadOffresData = async () => {
    try {
      setIsLoading(true);
      const offresData = await fetchOffres();
      setFilteredOffresByBadge(offresData.filter(offre => 
        offre.badges.some(badge => badge.label === "TENDANCE")
      ));
    } catch (error) {
      console.error('Error fetching offres:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedOffres = showAll ? filteredOffresByBadge : filteredOffresByBadge.slice(0, 3);
  // Update the button click handler
  const handleShowToggle = () => {
    setShowAll(!showAll);
    if (showAll) {
      blogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/destTen.png)`,
            filter: 'brightness(0.5)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <p className="font-manrope font-medium text-xl sm:text-3xl mb-4">Le bonheur en</p>
          <h1 className="font-griffiths text-5xl sm:text-6xl lg:text-8xl font-bold">All inclusive</h1>
        </div>
      </div>

      {/* Blog header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <div className='px-4 sm:px-6 lg:px-14'>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center mb-2">
            <div className='w-full sm:w-1/3'>
          <h2 className="font-manrope font-medium text-4xl sm:text-3xl lg:text-4xl mt-4 sm:mb-4 ">
            Le luxe en
            <span className="inline-block w-20 h-1 bg-black ml-4 align-middle"></span>
          </h2>
          <div className='w-full'>
            
          <h3 className="font-griffiths text-5xl sm:text-5xl lg:text-8xl mb-6">
            All Inclusive
          </h3>
          </div>
          </div>
          <div className='w-full sm:w-2/3 flex flex-col justify-between'>
            <p className="font-manrope font-light text-gray-600 text-sm sm:text-base leading-relaxed mb-6 md:mb-8">
            Découvrez le voyage en All Inclusive : détente totale, plaisir illimité. Plages de 
              rêve, repas exquis, activités passionnantes, TOUT est inclus. Laissez-vous 
              choyer dans un monde de luxe et de tranquillité. Embarquez pour des vacances 
              sans soucis durant lesquelles tous vos désirs seront comblés.
            </p>
            <div>
            <button className="bg-[#8C6EA8] text-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-opacity-90 transition-colors flex items-center font-manrope text-sm sm:text-base">
              Créer votre voyage 
              <span className="ml-2 inline-flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            </div>
            
          </div>
          </div>
          

          
          </div>
      </div>

      {/* Our Blogs */}
      <div className="py-8 sm:py-10 lg:pb-14 px-4 sm:px-8 lg:px-20 bg-white"
      ref={blogSectionRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">Destinations Tendances</h2>
            <p className="font-manrope font-light text-gray-600 text-sm sm:text-base">
            Vous n'avez pas d'inspiration ?<br className="hidden sm:block" />
              Voici nos recommandations pour un voyage de luxe réussi
            </p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
        {isLoading ? (
        [...Array(3)].map((_, index) => (
          <div key={index} className="space-y-3 sm:space-y-4 animate-pulse">
            <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg bg-gray-200"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))
      ) : (
          displayedOffres.map((offre) => (
          <div key={offre.id} className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={offre.pays.image}
                  alt={offre.pays.label} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className='absolute bottom-4 p-2 flex flex-row w-full justify-between items-center'>
                  <p className='text-white font-manrope font-medium'>{offre.offreDayNumber} jours, {offre.price} Dhs</p>
                  <Link to={`/destinationDetails/${encodeId(offre?.pays.id)}`} className="bg-white rounded-full p-1 cursor-pointer">
                  <span className="text-black"><ChevronRight size={20}/></span>
                  </Link>
                </div>
                
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-griffiths font-semibold text-lg sm:text-2xl hover:text-[#8C6EA8] transition-colors">{offre.label}</span>
                </div>
                <h3 className="font-manrope font-light text-sm sm:text-base">{offre.description}</h3>
              </div>
            </div>
          ))
        )}
        </div>

        <div className="text-center mt-12">
          <button onClick={handleShowToggle} 
            className="bg-[#8C6EA8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors"
          >
            {showAll ? 'Voir moins' : 'Voir toutes nos suggestions >'} 
          </button>
        </div>
      </div>
      </div>

      {/* Devis Section */}         
      <div className="  sm:container mx-6 sm:mx-auto px-6 sm:px-6 lg:px-28 py-10 sm:py-12 lg:py-8">
          {/* Background Image */}
          <div className='relative px-6 h-[300px] sm:h-[400px] lg:h-[550px] group'>
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden duration-300 group-hover:scale-105"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/blogAtlas.png)`,
              filter: 'brightness(0.5)'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center sm:items-start justify-between h-full text-white p-4 sm:p-8 lg:p-16">
            <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-7xl font-medium mb-4 text-center sm:text-left max-w-[60vw]">
              <span>Préparez votre voyage <br/>de luxe</span>
              <span className="mt-2">  AVEC ATLAS VOYAGES</span>
            </h2>
            
            <button className="font-manrope font-medium mt-4 sm:mt-6 lg:mt-8 border-2 border-white px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
              Demander un devis {'>'}
            </button>
          </div>
          </div>
          
        </div> 

    </div>
  )
}
export default DestinationsTendances
