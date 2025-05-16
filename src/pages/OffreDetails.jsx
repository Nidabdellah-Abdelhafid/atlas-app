import { useState, useRef, useEffect, useCallback} from 'react';
import { ChevronLeft, ChevronRight, Map as MapIcon, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { fetchOffres, fetchPlanings } from '../services/fetchers/dataFetchers';
import { decodeLabel} from '../utils/idEncoder';
import LoadingUI from '../components/LoadingUI';
import { useApiStatus } from '../context/ApiStatusContext';

function OffreDetails() {
  const { encodedLabel } = useParams();
  const label = decodeLabel(encodedLabel);
  const [offre, setOffre] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [planings, setPlanings] = useState(null);
  const [planingDay, setPlaningDay] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [showProgram, setShowProgram] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { apiStatus } = useApiStatus();

  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isScrollingPlan, setIsScrollingPlan] = useState(false);
  const planStackRef = useRef(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
    const loadPlanings = useCallback(async () => {
      try {
        const planingsData = await fetchPlanings();
        const offrePlanings = planingsData.filter(planing => 
          planing.offre?.label.toLowerCase() === label.toLowerCase()
        );
        setPlanings(offrePlanings);
      } catch (error) {
        console.error('Error fetching planings:', error);
      }
    }, [label]);

    useEffect(() => {
      const loadOffre = async () => {
        setIsLoading(true);
        try {
          const offresData = await fetchOffres();
          // console.log("offresData:\n", offresData);
          const selectedOffre = offresData.find(o => o.label.toLowerCase() === label.toLowerCase());
          // console.log("selectedOffre:\n", selectedOffre);

          setOffre(selectedOffre);
        } catch (error) {
          console.error('Error fetching offre:', error);
        } finally {
        // Add a minimum loading time of 1 second
        setTimeout(() => setIsLoading(false), 1000);
      }
      };
  
      loadOffre();
      loadPlanings();
    }, [label, loadPlanings]); // Added loadPlanings to dependencies

    // Move loadPlaningDay outside useEffect and memoize it
    const loadPlaningDay = useCallback(async (planingId) => {
      try {
        const planingDayhere = planings?.find(planing => 
          planing.id === parseInt(planingId)
        );
        setPlaningDay(planingDayhere);
      } catch (error) {
        console.error('Error fetching planingDayhere:', error);
      }
    }, [planings]); // Add planings as dependency

    // Second useEffect with proper dependency
    useEffect(() => {
      if (planings && planings.length > 0) {
        loadPlaningDay(planings[0].id);
      }
    }, [planings, loadPlaningDay]);

    

    const otherOffers = [
      {
        title: "Afrique du Sud",
        subtitle: "Proche de la nature",
        description: "Bienvenue en Afrique australe ! L'Afrique australe, trésor du continent, offre une expérience de voyage unique et envoûtante, avec des destinations inoubliables comme Le Cap, le parc national de Chobe et les chutes Victoria. Le Cap fascine avec ses paysages époustouflants et sa culture vibrante.",
        duration: "13 jours",
        price: "39 000Dhs",
        image: "/assets/images/anotherOff1.png",
        includes: ["vols Eco Std", "Hotels", "Transfert"]
      },
      {
        title: "Tanzanie",
        subtitle: "Au paradis sauvage",
        description: "Bienvenue en Afrique australe ! L'Afrique australe, trésor du continent, offre une expérience de voyage unique et envoûtante, avec des destinations inoubliables comme Le Cap, le parc national de Chobe et les chutes Victoria. Le Cap fascine avec ses paysages époustouflants et sa culture vibrante.",
        duration: "13 jours",
        price: "39 000Dhs",
        image: "/assets/images/anotherOff2.png",
        includes: ["vols Eco Std", "Hotels", "Transfert"]
      }
    ];

    const gridOffers = [
      {
        title: "Paris",
        subtitle: "Sauvage, vibrante et indomptable",
        description: "L'Afrique du Sud est un pays aux paysages spectaculaires, où la faune sauvage et les traditions côtoient une modernité par la diversité.",
        image: "/assets/images/paris.png"
      },
      {
        title: "Rome",
        subtitle: "Sauvage, vibrante et indomptable",
        description: "L'Afrique du Sud est un pays aux paysages spectaculaires, où la faune sauvage et les traditions côtoient une modernité par la diversité.",
        image: "/assets/images/rome.png"
      },
      {
        title: "Tokyo",
        subtitle: "Sauvage, vibrante et indomptable",
        description: "L'Afrique du Sud est un pays aux paysages spectaculaires, où la faune sauvage et les traditions côtoient une modernité par la diversité.",
        image: "/assets/images/tokyo.png"
      }
    ];

    const rotatePlanCards = useCallback((index) => {
      planings?.forEach((plan, i) => {
        const planElement = document.getElementById(`plan-${plan.id}`);
        if (planElement) {
          if (i < index) {
            planElement.style.transform = `translateY(-120vh) rotate(0deg)`;
            planElement.classList.add("away");
          } else {
            planElement.style.transform = `rotate(0deg)`;
            planElement.style.zIndex = planings.length - i;
            planElement.classList.remove("away");
          }
        }
      });
    }, [planings]);
    
    // Add this function to handle plan button clicks
    const handlePlanButtonClick = (index, planId) => {
      setActivePlanIndex(index);
      setActiveDay(index + 1);
      setIsScrollingPlan(true);
      loadPlaningDay(planId);
    
      rotatePlanCards(index);
      setCurrentSlide(0);
    
      window.scrollTo({
        top: planStackRef.current.offsetTop + index * window.innerHeight * 0.7,
        behavior: "smooth",
      });
    
      setTimeout(() => {
        setIsScrollingPlan(false);
      }, 700);
    };
    
    // Add this useEffect for scroll handling
    useEffect(() => {
      const planStack = planStackRef.current;
      if (!planStack) return;
    
      const handlePlanScroll = () => {
        if (isScrollingPlan) return;
        setCurrentSlide(0);
        let distance = window.innerHeight * 0.5;
        let topVal = planStack.getBoundingClientRect().top;
        let index = Math.floor(-1 * (topVal / distance + 1));
    
        if (index !== activePlanIndex && index >= 0 && index < (planings?.length || 0)) {
          setActivePlanIndex(index);
          rotatePlanCards(index);
          setActiveDay(index + 1);
          if (planings?.[index]) {
            loadPlaningDay(planings[index].id);
          }
        }
      };
    
      window.addEventListener("scroll", handlePlanScroll);
      return () => window.removeEventListener("scroll", handlePlanScroll);
    }, [activePlanIndex, planings, isScrollingPlan, loadPlaningDay, rotatePlanCards]);
    
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % (planingDay?.photos?.length || 1));
    };
    
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + (planingDay?.photos?.length || 1)) % (planingDay?.photos?.length || 1));
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

    if (isLoading) {
      return <LoadingUI title={'Chargement de votre voyage...'}/>;
    }
    
  return (
    <div className="bg-[#FFFCF7]">
      <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
          backgroundImage: `url(${offre?.image})`,
          filter: 'brightness(0.7)'
          }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen text-center text-white p-4 sm:p-6 lg:p-8">
          <h1 className="font-griffiths text-4xl sm:text-5xl lg:text-8xl font-bold mb-2 sm:mb-3 lg:mb-4">
          {offre?.label}
          </h1>
          <h2 className="font-manrope font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 lg:mb-4">
          {offre?.pays.label}
          </h2>
          
          <p className="font-manrope font-normal max-w-sm sm:max-w-xl lg:max-w-3xl text-xs sm:text-sm lg:text-lg mb-3 sm:mb-4 lg:mb-6 text-white/90 px-4 sm:px-0 line-clamp-2">
          {offre?.pays.description}
          </p>

          <div className="bg-black/60 w-full sm:w-auto p-2 sm:p-3 lg:p-4 backdrop-blur-sm">
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8 border-b pb-4">
              <p className="font-griffiths text-base sm:text-lg">Tarif à partir de</p>
              <h3 className="font-griffiths text-3xl sm:text-4xl lg:text-5xl font-medium">
              {offre?.price}Dhs
              </h3>
              <p className="font-manrope font-normal text-xs sm:text-sm lg:text-base">
              {(offre?.offreDayNumber-1)} nuits / {offre?.offreDayNumber} jours
              </p>
          </div>

          <button className="font-manrope font-medium border-2 border-white px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
              Demander un devis {'>'}
          </button>
          </div>
      </div>
      </div>

      {/* Detailed Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-manrope font-thin text-2xl sm:text-4xl lg:text-6xl mb-4">{offre?.pays.label}</h2>
            <h1 className="font-griffiths text-3xl sm:text-4xl lg:text-8xl font-normal mb-8">{offre?.label}</h1>
            
            <p className="font-manrope font-light text-gray-700 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
              {offre?.description}
              </p>

          </div>
          {/* Right Content - Map */}
          <div className="lg:w-1/2 h-full">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/MapAfrica.png`}
              alt="Africa Map" 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Information flight Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex lg:justify-center lg:items-center gap-16">
              <div className="flex flex-col items-center ">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <img src={`${process.env.PUBLIC_URL}/assets/images/iconflight.png`} 
                  alt="Duration" className="w-10 h-10" />
                  <h3 className="font-griffiths text-2xl sm:text-4xl font-bold text-gray-800">Durée du vol</h3>
                </div>
                <p className="font-manrope font-normal text-xl sm:text-3xl">{offre?.pays.dureeDuVol?.split(' ')[0]}</p>
                <p className="font-manrope font-light text-md sm:text-lg text-gray-500">{offre?.pays.dureeDuVol?.split(' ')[1]}{offre?.pays.dureeDuVol?.split(' ')[2]}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <img src={`${process.env.PUBLIC_URL}/assets/images/iconstime.png`} 
                  alt="Time" className="w-10 h-10" />
                  <h3 className="font-griffiths text-2xl sm:text-4xl font-bold text-gray-800">Heure locale</h3>
                </div>
                <p className="font-manrope font-normal text-xl sm:text-2xl">UTC</p>
                <p className="font-manrope font-normal text-lg sm:text-2xl">{offre?.pays.heureLocale?.replace('GTM', '')}</p>
              </div>
            </div>

            <div className="border-l border-black pl-8 sm:pl-20 ml-4">
              <h3 className="font-manrope font-normal text-gray-800 mb-3">Inclus: Total pour 1 voyageur</h3>
              <ul className="font-manrope font-normal space-y-1.5 text-gray-700">
                <li>vols Eco Std</li>
                <li>Hotels</li>
                <li>Transfert</li>
              </ul>
            </div>
          </div>
      </div>

      {/* Planing /program Section Disktop*/}
      <div className="mt-16 hidden lg:block"
      ref={planStackRef}
      style={{
        height: `${(planings?.length || 1) * 100}vh`,
      }}
      >
        {/* Days Navigation tab*/}
        <div className="sticky top-28 z-30 overflow-x-auto mb-2 scrollbar-hide bg-[#FFFCF7]" 
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div className="flex w-full">
          {planings?.map((planing, index) => (
            <button
              key={planing.id}
              onClick={() => handlePlanButtonClick(index, planing.id)}
              className={`font-manrope font-normal flex-1 px-6 lg:px-16 py-4 text-xl whitespace-nowrap border border-1 transition-colors ${
                index === activePlanIndex 
                ? 'bg-[#ACACAC] text-black' 
                : 'bg-transparent hover:bg-[#ACACAC]'
              }`}
            >
              Jour {index + 1}
            </button>
          ))}
        </div>
      </div>

        {/* tab Content */}
        <div 
        className="flex flex-col justify-start items-center sticky top-52 h-[90vh]"
        >
      {planings?.map((planing, index) => (
            <div
              key={planing.id}
              id={`plan-${planing.id}`}
              className="absolute w-full transition-all duration-500 bg-[#FFFCF7] h-[90vh]"
              style={{
                transform: `translateY(${index * 10}px)`,
                zIndex: (planings?.length || 1) - index
              }}
            >
          {/* Program Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-6 sm:px-8 lg:px-20 py-2 bg-[#FFFCF7]">
              {/* Left Content */}
              <div className="flex flex-col h-full justify-between bg-[#FFFCF7]">
              <div className={`${showProgram? 'flex flex-row w-full':''}`}>
              <div className={`${showProgram? 'w-1/2':''}`}>
              <h2 className="font-griffiths text-5xl font-medium mb-4">
                  {planing?.label || `Jour ${activeDay}`}
              </h2>
              <p className="font-manrope font-normal text-gray-600 mb-6 leading-relaxed">
              {planing?.description || `Description pour le jour ${activeDay}`}
              </p>
              </div>
              {showProgram ? (
              <div className={`${showProgram? 'w-1/2':''} inset-0 overflow-y-auto mt-16 h-full`} >
                  <div className="ml-4 ">
                  <div className="space-y-4 border-l border-black px-6 h-full mb-8">
                  {planing?.planing_programmes?.map((programme, index, array) => (
                      <div key={index} className="flex gap-4 pl-6 group">
                          <div className="flex-1 relative h-full">
                          <div className="absolute top-2 -left-6 w-4 h-4 bg-black rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8C6EA8]" />
                          <h3 className="font-manrope font-light text-md mb-4 lg:mb-4 h-48 lg:h-24 leading-relaxed  text-gray-800 group-hover:text-black transition-colors">{programme.description}</h3>
                          {index !== array.length - 1 && (
                              <div className="w-0.5 h-20 bg-black absolute top-8 -left-[18px] transition-all duration-300 group-hover:bg-[#8C6EA8] group-hover:h-20"/>
                          )}
                          </div>
                      </div>
                      ))}
                      <div className='w-full flex items-center justify-between'>
                      <button 
                          onClick={() => setShowProgram(false)}
                          className="flex items-center gap-2 mt-8 p-2 border border-black rounded-full"
                        >
                        <ChevronLeft size={24} />
                      </button>
                      {/* Show Map */}
                      <button
                        onClick={() => setIsMapModalOpen(true)}
                        className="flex items-center gap-2 mt-8 p-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                      >
                        <MapIcon size={24} />
                      </button>
                      </div>
                      
                  </div>

                  
                  </div>
                  
              </div>
              ) : null}
              </div>

              {/* Map Modal */}
              {isMapModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
                  <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden relative">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-griffiths text-2xl">Itinéraire du jour {activeDay}</h3>
                      <button
                        onClick={() => setIsMapModalOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <div className="flex w-full items-center justify-center relative min-h-[400px]">
                      {isMapLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                          <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-[#8C6EA8] rounded-full animate-spin" 
                              style={{ borderTopColor: 'transparent' }}></div>
                          </div>
                        </div>
                      )}
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/south-africa-map.png`}
                        alt={`Itinéraire jour ${activeDay}`}
                        className="w-96 h-96 object-contain"
                        onLoad={() => setIsMapLoading(false)}
                        onError={() => setIsMapLoading(false)}
                      />
                    </div>
                  </div>
                </div>
              )}
            <div className="flex flex-col w-60">
            <button 
                  onClick={() => setShowProgram(true)}
                  className={`${showProgram? 'hidden':''} font-manrope font-medium underline py-2 my-4 text-start hover:text-[#8C6EA8]`}
                  >
                  Voir le programme {'>'}
                  </button>
              <button className="font-manrope font-medium border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
                  Demander un devis {'>'}
              </button>
              </div>
          </div>

          {/* Right Content */}
            <div className="relative">
              <div className="relative h-[400px] overflow-hidden">
                <div className="relative w-full h-full">
                  {planing?.photos.map((image, index) => (
                    <div 
                      key={index}
                      className="absolute inset-0 w-full h-full transition-opacity duration-300"
                      style={{ opacity: index === currentSlide ? 1 : 0 }}
                    >
                      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                        index === currentSlide ? 'opacity-0' : 'opacity-50'
                      }`} />
                      <img 
                        src={image.url}
                        alt={`Slide ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white hover:bg-white/90"
                >
                  <ChevronLeft size={30} className='text-black transition-colors duration-300'/>
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white hover:bg-white/90"
                >
                  <ChevronRight size={30} className='text-black transition-colors duration-300'/>
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {planing?.photos.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
          </div>
            ))}
        </div>

      </div>

      {/* Mobile/Tablet Planning Section */}
      <div className="lg:hidden mt-16">
        {/* Days Navigation tab */}
        <div className="sticky top-8 sm:top-28 z-30 overflow-x-auto mb-2 scrollbar-hide bg-[#FFFCF7]">
          <div className="flex w-full">
            {planings?.map((planing, index) => (
              <button
                key={planing.id}
                onClick={() => {
                  setActivePlanIndex(index);
                  setActiveDay(index + 1);
                  loadPlaningDay(planing.id);
                  setCurrentSlide(0);
                }}
                className={`font-manrope font-normal flex-1 px-6 py-4 text-xl whitespace-nowrap border border-1 transition-colors ${
                  index === activePlanIndex 
                  ? 'bg-[#ACACAC] text-black' 
                  : 'bg-transparent hover:bg-[#ACACAC]'
                }`}
              >
                Jour {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {planings?.map((planing, index) => (
          <div
            key={planing.id}
            className={`${index === activePlanIndex ? 'block' : 'hidden'} bg-[#FFFCF7]`}
          >
            <div className="grid grid-cols-1 gap-8 mx-auto px-6 sm:px-8 py-2">
              {/* Content Area */}
              <div className="flex flex-col h-full justify-between bg-[#FFFCF7]">
                <div className={`${showProgram ? 'space-y-8' : ''}`}>
                  <div>
                    <h2 className="font-griffiths text-4xl font-medium mb-4">
                      {planing?.label || `Jour ${activeDay}`}
                    </h2>
                    <p className="font-manrope font-normal text-gray-600 mb-6 leading-relaxed">
                      {planing?.description || `Description pour le jour ${activeDay}`}
                    </p>
                  </div>


                  {/* Program Content */}
                  {showProgram && (
                    <div className="space-y-6 border-l border-black/80 px-6 mb-8">
                      {planing?.planing_programmes?.map((programme, index, array) => (
                        <div key={index} className="flex gap-4 pl-6 group">
                          <div className="flex-1 relative h-full">
                            <div className="absolute top-2 -left-6 w-4 h-4 bg-black rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-[#8C6EA8]" />
                            <h3 className="font-manrope font-light text-md mb-4 leading-relaxed text-gray-800 group-hover:text-black transition-colors">
                              {programme.description}
                            </h3>
                            {index !== array.length - 1 && (
                              <div className="w-0.5 h-8 bg-black/80 absolute top-8 -left-[18px] transition-all duration-300 group-hover:bg-[#8C6EA8] group-hover:h-8" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}


                  {/* Action Buttons */}
                  <div className="flex items-center justify-between my-4">
                    <button 
                      onClick={() => setShowProgram(!showProgram)}
                      className="font-manrope text-sm font-medium underline hover:text-[#8C6EA8]"
                    >
                      {showProgram ? (
                        <div className="flex items-center gap-2">
                          <ChevronLeft size={18} />
                          Masquer le programme
                        </div>
                      ) : (
                        'Voir le programme >'
                      )}
                    </button>
                    <button
                      onClick={() => setIsMapModalOpen(true)}
                      className="flex items-center gap-2 p-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                      <MapIcon size={24} />
                    </button>
                  </div>
                  {/* Map Modal */}
                  {isMapModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center p-4">
                      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden relative">
                        <div className="flex justify-between items-center p-4 border-b">
                          <h3 className="font-griffiths text-2xl">Itinéraire du jour {activeDay}</h3>
                          <button
                            onClick={() => setIsMapModalOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X size={24} />
                          </button>
                        </div>
                        <div className="flex w-full items-center justify-center">
                          <img 
                            src={`${process.env.PUBLIC_URL}/assets/images/south-africa-map.png`}
                            alt={`Itinéraire jour ${activeDay}`}
                            className="w-96 h-96 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Carousel */}
                  <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
                    <div className="relative w-full h-full">
                      {planing?.photos.map((image, index) => (
                        <div 
                          key={index}
                          className="absolute inset-0 w-full h-full transition-opacity duration-300"
                          style={{ opacity: index === currentSlide ? 1 : 0 }}
                        >
                          <img 
                            src={image.url}
                            alt={`Slide ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation Controls */}
                    <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white">
                      <ChevronLeft size={30} className="text-black" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white">
                      <ChevronRight size={30} className="text-black" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {planing?.photos.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </div>
                  </div>

                  
                </div>

                <button className="font-manrope font-medium border border-black px-6 py-2 mt-8 hover:bg-black hover:text-white transition-colors w-full">
                  Demander un devis {'>'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      



      {/* Devis Section */}         
      <div className="  sm:container mx-6 sm:mx-auto px-6 sm:px-6 lg:px-28 py-10 sm:py-12 lg:py-20">
        {/* Background Image */}
        <div className='relative px-6 h-[300px] sm:h-[400px] lg:h-[550px] group'>
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/SudAfrica2.png)`,
            filter: 'brightness(0.5)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center sm:items-start justify-center h-full text-white p-4 sm:p-8 lg:p-16">
          <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-7xl font-medium mb-4 text-center sm:text-left max-w-2xl">
            <p>Visitez l'afrique de sud</p>
            <span className="font-griffiths font-medium mt-2">AVEC ATLAS VOYAGES</span>
          </h2>
          
          <button className="font-manrope font-medium mt-4 sm:mt-6 lg:mt-8 border-2 border-white px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
            Demander un devis {'>'}
          </button>
        </div>
        </div>
        
      </div> 


      {/* Another Offres Section */}
      <div className="container mx-auto px-6 sm:px-6 lg:px-28 py-10 sm:py-12 lg:py-16">
    
    
      <h2 className="font-griffiths text-2xl sm:text-3xl lg:text-5xl font-medium text-center mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">Autres évasions</h2>
      <p className="font-manrope font-normal text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-4">
        Parce que chaque voyageur a ses propres envies et attentes,
        chaque aventure doit être unique et personnalisée pour offrir une expérience inoubliable.
      </p>
      
      <div className="space-y-6 sm:space-y-8">
        {otherOffers.map((offer, index) => (
          <div key={index} className="relative h-full overflow-hidden rounded-lg duration-300 hover:scale-105">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}${offer.image})`,
                filter: 'brightness(0.7)'
              }}
            />
            <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)'
              
                }}
              />
            <div className="relative z-10 h-full flex flex-col justify-center items-start sm:items-end p-6 sm:p-8 lg:p-16 text-white">
              <div className="w-full sm:max-w-xl">
                <h3 className="font-griffiths text-2xl sm:text-3xl lg:text-7xl font-medium mb-2">{offer.title}</h3>
                <h4 className="font-griffiths text-xl sm:text-2xl lg:text-7xl mb-2 sm:mb-6">{offer.subtitle}</h4>
                <p className="font-manrope font-normal text-sm sm:text-base mb-6 sm:mb-8 max-w-xl">{offer.description}</p>
                
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4 sm:gap-8 mb-2 sm:mb-8">
                  <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
                    <p className="font-manrope font-medium text-lg sm:text-xl">{offer.duration}</p>
                    <p className="font-manrope font-normal text-xl sm:text-2xl">Tarif à partir de : {offer.price}</p>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <p className="font-manrope font-normal text-sm sm:text-base">Inclus: Total pour 1 voyageur</p>
                    <ul className="font-manrope font-normal text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                      {offer.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <button className="font-manrope font-medium w-full sm:w-auto border-2 border-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
                  Voir l'offre {'>'}
                </button>
              </div>
              </div>
          </div>
        ))}
      </div>
      </div>   

      {/* Another Offres in another content Section */}   
      <div className="container mx-auto px-6 sm:px-6 lg:px-28 py-10 sm:py-6 lg:py-2 ">
        <h2 className="font-griffiths text-2xl sm:text-3xl lg:text-5xl font-medium text-center mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">
          Des idées de voyages selon vos envies
        </h2>
        <p className="font-manrope font-normal text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-4">
          Parce que chaque voyageur a ses propres envies et attentes,
          chaque aventure doit être unique et personnalisée pour offrir une expérience inoubliable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {gridOffers.map((offer, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg cursor-pointer">
              <div className="aspect-w-4 aspect-h-5">
                <img 
                  src={`${process.env.PUBLIC_URL}${offer.image}`}
                  alt={offer.title}
                  className="w-full h-full object-cover duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="font-manrope font-light text-sm mb-2">{offer.title}</p>
                  <h3 className="font-griffiths text-xl font-medium mb-2">{offer.subtitle}</h3>
                  <p className="font-manrope font-normal text-sm ">
                    {offer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OffreDetails;