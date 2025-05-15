import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { fetchOffres, fetchPays, fetchPhotos } from '../services/fetchers/dataFetchers';
import { decodeLabel, encodeLabel } from '../utils/idEncoder';
import LoadingUI from '../components/LoadingUI';

function DestinationDetails() {
  const { encodedLabel } = useParams();
  const label = decodeLabel(encodedLabel);
  const [pays, setPays] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [offres, setOffres] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentOfferSlides, setCurrentOfferSlides] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const loadPhotos = useCallback(async () => {
    try {
      const photosData = await fetchPhotos();
      // console.log(photosData);
      const countryPhotos = photosData.filter(photo => 
        photo.pays?.label.toLowerCase() === label.toLowerCase()
      );
      setPhotos(countryPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }, [label]);

  // console.log(photosByOffre);
  
  const loadOffres = useCallback(async () => {
    try {
      const offresData = await fetchOffres();
      const countryOffres = offresData.filter(offre => 
        offre.pays?.label.toLowerCase() === label.toLowerCase()
      );
      setOffres(countryOffres);
    } catch (error) {
      console.error('Error fetching offres:', error);
    }
  }, [label]);

  // console.log(offres);
  
  // Update the useEffect
  useEffect(() => {
    const loadPays = async () => {
      setIsLoading(true);
      try {
        const paysData = await fetchPays();
        const selectedPays = paysData.find(o => o.label.toLowerCase() === label.toLowerCase());
        setPays(selectedPays);
        await Promise.all([loadPhotos(), loadOffres()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Add minimum loading time
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    loadPays();
  }, [label, loadPhotos, loadOffres]);
  

  // console.log(offres);

  const slides = photos?.map(photo => ({
    id: photo.id,
    image: photo.url
  }));

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


  
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
    setTimeout(() => setIsTransitioning(false), 400); // Match this with transition duration
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
    setTimeout(() => setIsTransitioning(false), 400); // Match this with transition duration
  };

  useEffect(() => {
    if (offres) {
      const initialSlides = {};
      offres.forEach(offre => {
        initialSlides[offre.id] = 0;
      });
      setCurrentOfferSlides(initialSlides);
      
    }
  }, [offres]);
  
  // Replace the navigation functions
  const nextOfferSlide = (offerId, totalPhotos) => {
    setCurrentOfferSlides(prev => ({
      ...prev,
      [offerId]: (prev[offerId] + 1) % totalPhotos
    }));
  };
  
  const prevOfferSlide = (offerId, totalPhotos) => {
    setCurrentOfferSlides(prev => ({
      ...prev,
      [offerId]: (prev[offerId] - 1 + totalPhotos) % totalPhotos
    }));
  };
  
  // Calculate previous and next indices
  const prevIndex = (currentSlide - 1 + slides?.length) % slides?.length;
  const nextIndex = (currentSlide + 1) % slides?.length;
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  if (isLoading) {
    return <LoadingUI title={'Découvrez votre destination...'}/>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center flex items-center justify-center min-h-screen"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${pays?.image}')`,
          paddingTop: '80px' // Add padding to compensate for the header
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light mb-4 font-griffiths leading-tight">
            {pays?.label}
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-light font-manrope">
          {pays?.subTitle}
          </h2>
        </div>
      </div>

      <div className="py-4 sm:py-8 lg:py-10">
        <div className="container mx-auto ">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 text-center font-manrope">
            Escapade en
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-7xl mb-6 sm:mb-8 lg:mb-10 text-center font-griffiths font-normal">
          {pays?.label}
          </h3>
        </div>

        <div className="container mx-auto px-6 sm:px-16 lg:px-48 ">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center leading-relaxed mb-6 sm:mb-8 font-manrope">
          {pays?.description}
            </p>
        </div>
      </div>

      {/* Carousel Section with Side Previews - Full Width */}
      <div className="py-6 sm:py-10 lg:py-20 bg-white">
        <div className="w-full">
          {/* Carousel with side previews */}
          <div className="relative flex justify-center items-center w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[600px]">
            {/* Previous slide (left side) - Hidden on mobile */}
            <div 
              className="hidden sm:block absolute left-0 w-1/6 sm:w-1/5 h-[200px] sm:h-[300px] lg:h-[400px] z-0 overflow-hidden transition-all duration-500 ease-in-out"
              style={{ 
                opacity: isTransitioning ? 0 : 0.7,
                transform: isTransitioning ? 'translateX(-20px)' : 'translateX(0)'
              }}
            >
              <img 
                src={slides && slides[prevIndex]?.image}
                alt="Previous slide" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Current slide (center) */}
            <div 
              className="relative z-10 w-full sm:w-2/3 lg:w-3/5 mx-0 sm:mx-2 lg:mx-4 transition-all duration-500 ease-in-out overflow-hidden"
              style={{ 
                opacity: isTransitioning ? 0.8 : 1,
                transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              <img 
                src={slides && slides[currentSlide]?.image}
                alt="Current slide" 
                className="w-full h-[300px] sm:h-[400px] lg:h-[550px] object-cover"
              />
            </div>
            
            {/* Next slide (right side) - Hidden on mobile */}
            <div 
              className="hidden sm:block absolute right-0 w-1/6 sm:w-1/5 h-[200px] sm:h-[300px] lg:h-[400px] z-0 overflow-hidden transition-all duration-500 ease-in-out"
              style={{ 
                opacity: isTransitioning ? 0 : 0.7,
                transform: isTransitioning ? 'translateX(20px)' : 'translateX(0)'
              }}
            >
              <img 
                src={slides && slides[nextIndex]?.image}
                alt="Next slide" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 z-20 transition-colors disabled:opacity-50"
              aria-label="Previous slide"
              disabled={isTransitioning}
            >
              <ChevronLeft size={24} className="text-white hover:text-[#8C6EA8] transition-colors duration-300 sm:w-8 sm:h-8 lg:w-12 lg:h-12"/>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 z-20 transition-colors disabled:opacity-50"
              aria-label="Next slide"
              disabled={isTransitioning}
            >
              <ChevronRight size={24} className="text-white hover:text-[#8C6EA8] transition-colors duration-300 sm:w-8 sm:h-8 lg:w-12 lg:h-12"/>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-center mb-8 sm:mb-12 font-griffiths">
            les meilleures périodes<br />
            pour découvrir {pays?.label}
          </h2>
          
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <div className="min-w-[940px] px-4">
              <div className="grid grid-cols-12 gap-2 sm:gap-10">
                {months.map((month) => (
                  <div key={month} className="flex flex-col items-center">
                    <span className="text-xs sm:text-sm font-manrope capitalize mb-2">
                      {month}
                    </span>
                    <div className="flex flex-col gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                            pays && pays[month] >= dot
                              ? 'bg-[#DDBE8B]' 
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Information Section */}
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-[#FCFAF7] p-6 sm:p-8 lg:p-10 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 lg:gap-12">
              {/* Title */}
              <div className="md:w-1/3">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-griffiths">
                  Infos<br className='hidden sm:block'/> Pratique
                </h2>
              </div>
              
              {/* Information list */}
              <div className="md:w-2/3">
                <div className="space-y-3 sm:space-y-4">
                  {/* Visa */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosVisa.png`} 
                        alt="Visa" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Visa</span>
                      <span className="inline-block w-32 sm:w-72  h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.visa? 'Oui':'Non'}</span>
                    </div>
                  </div>
                  
                  {/* Flight Duration */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosVol.png`} 
                        alt="Durée du vol" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Durée du vol</span>
                      <span className="inline-block w-16 sm:w-36 h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.dureeDuVol}</span>
                    </div>
                  </div>
                  
                  {/* Local Time */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosHeure.png`} 
                        alt="Heure locale" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Heure locale</span>
                      <span className="inline-block w-32 sm:w-48 h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.heureLocale}</span>
                    </div>
                  </div>
                  
                  {/* Local Currency */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosMonnais.png`} 
                        alt="Monnaie locale" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Monnaie locale</span>
                      <span className="inline-block w-28 sm:w-48 h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.monnaieLocale}</span>
                    </div>
                  </div>
                  
                  {/* Spoken Language */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosLangue.png`} 
                        alt="Langue parlée" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Langue parlée</span>
                      <span className="inline-block w-16 h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.langueParlee}</span>
                    </div>
                  </div>
                  
                  {/* Required Vaccines */}
                  <div className="flex items-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 flex-shrink-0">
                      <img 
                        src={`${process.env.PUBLIC_URL}/assets/images/infosVaccins.png`} 
                        alt="Vaccins nécessaires" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <span className="text-lg sm:text-2xl font-semibold font-griffiths">Vaccins nécessaires</span>
                      <span className="inline-block w-24 sm:w-36 h-0.5 bg-[#707070]"></span>
                      <span className="text-lg sm:text-lg font-normal font-manrope">{pays?.vaccinsNecessaires? 'Oui':'Non'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Offers Section */}
      <div className="py-20 bg-[#FFFCF7]">
        <div className="">
          {/* First Offer */}
          {offres?.map((offre , index) => (
          <div key={offre.id} className="mb-6">
          <div className='px-6 sm:px-16 lg:px-20 w-full sm:w-full lg:w-1/2'>

                <h2 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-bold mb-1">
                {offre?.pays.label}
                </h2>
                <h3 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-normal mb-6 flex items-baseline w-full">
                  <span className='w-full'>{offre?.label}</span>
                  <span className="inline-block w-full h-0.5 bg-black"></span>
                </h3>

          </div>

            <div className="flex flex-col md:flex-row py-4">
              {/* Left side - Text content */}
              <div className="md:w-1/2">
              <div className='px-6 sm:px-16 lg:px-20 '>
                <p className="text-gray-700 mb-8 font-manrope">
                {offre?.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="mr-12">
                    <p className="text-gray-700 font-manrope">{(offre?.offreDayNumber-1)} nuits / {offre?.offreDayNumber} jours</p>
                    <p className="text-xl font-semibold font-griffiths">
                      Tarif à partir de :  {offre?.price} Dhs
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-semibold mb-1 font-manrope">Inclus: Total pour 1 voyageur</p>
                    <ul className="text-gray-700 font-manrope">
                      <li>vols Eco Std</li>
                      <li>Hôtels</li>
                      <li>Transfert</li>
                    </ul>
                  </div>
                </div>
                
                <Link to={`/offreDetails/${encodeLabel(offre.label)}`} className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-manrope">
                  Voir l'offre <span className="ml-1">&gt;</span>
                </Link>
              </div>
              </div>
              
              {/* Right side - Images with slider */}
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-full">
                      <img 
                        src={offre.photos[currentOfferSlides[offre.id] || 0]?.url} 
                        alt="Offer view" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105 bg-center bg-no-repeat"
                      style={{ objectPosition: 'center center' }}
                      />
                    </div>
                    <div className="w-1/3 ml-4">
                      <img 
                        src={offre.photos[(currentOfferSlides[offre.id] + 1) % offre.photos.length]?.url} 
                        alt="Offer preview" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Navigation Arrows */}
                  <div className='w-full px-6 flex justify-end items-center gap-2 sm:gap-4 my-4'>
                    <button 
                      onClick={() => prevOfferSlide(offre.id, offre.photos.length)}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronLeft size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                    <button 
                      onClick={() => nextOfferSlide(offre.id, offre.photos.length)}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronRight size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
      </div>
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
                  className="w-full h-full object-cover rounded-lg duration-300 group-hover:scale-105"
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
  )
}

export default DestinationDetails;