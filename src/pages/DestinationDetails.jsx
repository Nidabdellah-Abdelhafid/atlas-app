import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';

function DestinationDetails() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Add state for offer galleries
  const [currentOffer1Slide, setCurrentOffer1Slide] = useState(0);
  const [currentOffer2Slide, setCurrentOffer2Slide] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slides = [
    {
      id: 1,
      image: '/assets/images/dest1.png'
    },
    {
      id: 2,
      image: '/assets/images/dest3.png'
    },
    {
      id: 3,
      image: '/assets/images/dest2.png'
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

  // Define image sets for each offer
  const offer1Images = [
    '/assets/images/dest4.png',
    '/assets/images/dest6.png',
    '/assets/images/dest7.png'
  ];
  
  const offer2Images = [
    '/assets/images/dest5.png',
    '/assets/images/dest7.png',
    '/assets/images/dest6.png',
  ];

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 400); // Match this with transition duration
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 400); // Match this with transition duration
  };

  // Navigation functions for offer 1 gallery
  const nextOffer1Slide = () => {
    setCurrentOffer1Slide((prev) => (prev + 1) % offer1Images.length);
  };
  
  const prevOffer1Slide = () => {
    setCurrentOffer1Slide((prev) => (prev - 1 + offer1Images.length) % offer1Images.length);
  };
  
  // Navigation functions for offer 2 gallery
  const nextOffer2Slide = () => {
    setCurrentOffer2Slide((prev) => (prev + 1) % offer2Images.length);
  };
  
  const prevOffer2Slide = () => {
    setCurrentOffer2Slide((prev) => (prev - 1 + offer2Images.length) % offer2Images.length);
  };

  // Calculate previous and next indices
  const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
  const nextIndex = (currentSlide + 1) % slides.length;
  const bestPeriods = {
    janvier: [1],
    février: [1, 2],
    mars: [1, 2, 3],
    avril: [1, 2, 3],
    mai: [1, 2, 3],
    juin: [1, 2, 3],
    juillet: [1, 2, 3],
    août: [1, 2, 3],
    septembre: [1, 2],
    octobre: [1, 2],
    novembre: [1, 2],
    décembre: [1, 2]
  };
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center flex items-center justify-center min-h-screen"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${process.env.PUBLIC_URL}/assets/images/dest.png')`,
          paddingTop: '80px' // Add padding to compensate for the header
        }}
      >
        <div className="text-center text-white z-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light mb-4 font-griffiths leading-tight">
            Escapade en Afrique du Sud
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-light font-manrope">
            Loin des foules, proche de la nature
          </h2>
        </div>
      </div>

      <div className="py-4 sm:py-8 lg:py-10">
        <div className="container mx-auto ">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-2 text-center font-manrope">
            Escapade en
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-7xl mb-6 sm:mb-8 lg:mb-10 text-center font-griffiths font-normal">
            Afrique du Sud
          </h3>
        </div>

        <div className="container mx-auto px-6 sm:px-16 lg:px-48 ">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 text-center leading-relaxed mb-6 sm:mb-8 font-manrope">
            Entre safaris privés et lodges somptueux, l'Afrique du Sud dévoile un luxe sauvage où chaque lever de soleil est une œuvre d'art. 
            Dégustez un grand cru face aux lions, laissez le vent d'Afrique murmurer à votre âme.
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
                src={slides[prevIndex].image}
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
                src={slides[currentSlide].image}
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
                src={slides[nextIndex].image}
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
            pour découvrir l'afrique du sud
          </h2>
          
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <div className="min-w-[940px] px-4">
              <div className="grid grid-cols-12 gap-2 sm:gap-10">
                {Object.entries(bestPeriods).map(([month, dots]) => (
                  <div key={month} className="flex flex-col items-center">
                    <span className="text-xs sm:text-sm font-manrope capitalize mb-2">
                      {month}
                    </span>
                    <div className="flex flex-col gap-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                            dots.includes(dot) 
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">oui</span>
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">18h(1escale)</span>
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">UTC +2</span>
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">Rand</span>
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">Afrikaans - Anglais</span>
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
                      <span className="text-lg sm:text-lg font-normal font-manrope">Non</span>
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
          <div className="mb-6">
          <div className='px-6 sm:px-16 lg:px-20 w-full sm:w-full lg:w-1/2'>

                <h2 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-bold mb-1">
                  Afrique du Sud
                </h2>
                <h3 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-normal mb-6 flex items-baseline w-full">
                  <span className='w-full'>Loin des foules</span>
                  <span className="inline-block w-full h-0.5 bg-black"></span>
                </h3>

          </div>

            <div className="flex flex-col md:flex-row py-4">
              {/* Left side - Text content */}
              <div className="md:w-1/2">
              <div className='px-6 sm:px-16 lg:px-20 '>
                <p className="text-gray-700 mb-8 font-manrope">
                  Bienvenue en Afrique australe ! 
                  L'Afrique australe, trésor du continent, offre une expérience de voyage unique 
                  et émouvante, avec des destinations inoubliables comme Le Cap, le parc 
                  national de Chobe et les chutes Victoria. Le Cap fascine avec ses paysages 
                  époustouflants et sa culture vibrante. Le parc national de Chobe séduit par 
                  sa faune exceptionnelle, abritant l'une des plus grandes populations 
                  d'éléphants d'Afrique.
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="mr-12">
                    <p className="text-gray-700 font-manrope">9 nuits / 10 jours</p>
                    <p className="text-xl font-semibold font-griffiths">
                      Tarif à partir de : 32 000Dhs
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
                
                <a href="/offreDetails" className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-manrope">
                  Voir l'offre <span className="ml-1">&gt;</span>
                </a>
              </div>
              </div>
              
              {/* Right side - Images with slider */}
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-full">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer1Images[currentOffer1Slide]}`} 
                        alt="Safari view" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="w-1/3 ml-4">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer1Images[(currentOffer1Slide + 1) % offer1Images.length]}`} 
                        alt="Safari wildlife" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Navigation Arrows */}
                  <div className='w-full px-6 flex justify-end items-center gap-2 sm:gap-4 my-4'>
                    <button 
                      onClick={prevOffer1Slide}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronLeft size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                    <button 
                      onClick={nextOffer1Slide}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronRight size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Offer */}
          <div>
          <div className='px-6 sm:px-16 lg:px-20 w-full sm:w-full lg:w-1/2'>
            <h2 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-bold mb-1">
              Afrique du Sud
            </h2>
            <h3 className="font-griffiths text-2xl sm:text-4xl lg:text-6xl font-normal mb-6 flex items-baseline w-full">
              <span className='w-full'>Proche de la nature</span>
              <span className="inline-block w-1/2 h-0.5 bg-black"></span>
            </h3>

            </div>
            <div className="flex flex-col md:flex-row py-4">
              {/* Left side - Text content */}
              <div className="md:w-1/2">
              <div className='px-6 sm:px-16 lg:px-20'>
                <p className="text-gray-700 mb-8 font-manrope">
                  Bienvenue en Afrique australe ! 
                  L'Afrique australe, trésor du continent, offre une expérience de voyage unique 
                  et émouvante, avec des destinations inoubliables comme Le Cap, le parc 
                  national de Chobe et les chutes Victoria. Le Cap fascine avec ses paysages 
                  époustouflants et sa culture vibrante. Le parc national de Chobe séduit par 
                  sa faune exceptionnelle, abritant l'une des plus grandes populations 
                  d'éléphants d'Afrique.
                </p>
                
                <div className="flex items-center mb-4">
                  <div className="mr-12">
                    <p className="text-gray-700 font-manrope">13 jours</p>
                    <p className="text-xl font-semibold font-griffiths">
                      Tarif à partir de : 39 000Dhs
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
                
                <a href="/offre/afrique-sud-nature" className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-manrope">
                  Voir l'offre <span className="ml-1">&gt;</span>
                </a>
              </div>
              </div>
              
              {/* Right side - Images with slider */}
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-full">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer2Images[currentOffer2Slide]}`} 
                        alt="Safari view" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="w-1/3 ml-4">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer2Images[(currentOffer2Slide + 1) % offer2Images.length]}`} 
                        alt="Safari wildlife" 
                        className="w-full h-[300px] object-cover duration-300 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className='w-full px-6 flex justify-end items-center gap-2 sm:gap-4 my-4'>
                    <button 
                      onClick={prevOffer2Slide}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronLeft size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                    <button 
                      onClick={nextOffer2Slide}
                      className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100 hover:scale-110 transition-all duration-300"
                    >
                      <ChevronRight size={20} className="text-gray-800 hover:text-[#8C6EA8] transition-colors sm:size-24" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offres of destination */}

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