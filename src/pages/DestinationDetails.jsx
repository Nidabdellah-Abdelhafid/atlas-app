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

  // Define image sets for each offer
  const offer1Images = [
    '/assets/images/dest4.png',
    '/assets/images/dest6.png'
  ];
  
  const offer2Images = [
    '/assets/images/dest5.png',
    '/assets/images/dest7.png'
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${process.env.PUBLIC_URL}/assets/images/dest.png')`,
          height: '100vh',
          paddingTop: '80px' // Add padding to compensate for the header
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-8xl font-light mb-4 font-griffiths">
            Escapade en Afrique du Sud
          </h1>
          <h2 className="text-4xl font-light font-manrope">
            Loin des foules, proche de la nature
          </h2>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-light mb-2 text-center font-manrope">
                Escapade en
            </h2>
            <h3 className="text-6xl mb-10 text-center font-griffiths">
                Afrique du Sud
            </h3>
        </div>

        <div className="container mx-auto md:w-2/6">
            <p className="text-gray-600 text-center leading-relaxed mb-8 font-manrope">
            Entre safaris privés et lodges somptueux, l'Afrique du Sud dévoile un luxe sauvage où chaque lever de soleil est une œuvre d'art. 
            Dégustez un grand cru face aux lions, laissez le vent d'Afrique murmurer à votre âme.
            </p>
        </div>
      </div>

      {/* Carousel Section with Side Previews - Full Width */}
      <div className="py-10 sm:py-20 bg-white">
        <div className="w-full">
          {/* Carousel with side previews */}
          <div className="relative flex justify-center items-center w-full" style={{ minHeight: '600px' }}>
            {/* Previous slide (left side) */}
            <div 
              className="absolute left-0 w-1/5 h-[400px] z-0 overflow-hidden transition-all duration-500 ease-in-out"
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
              className="relative z-10 w-3/5 mx-4 transition-all duration-500 ease-in-out"
              style={{ 
                opacity: isTransitioning ? 0.8 : 1,
                transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              <img 
                src={slides[currentSlide].image}
                alt="Current slide" 
                className="w-full h-[550px] object-cover"
              />
            </div>
            
            {/* Next slide (right side) */}
            <div 
              className="absolute right-0 w-1/5 h-[400px] z-0 overflow-hidden transition-all duration-500 ease-in-out"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 z-20 transition-colors disabled:opacity-50"
              aria-label="Previous slide"
              disabled={isTransitioning}
            >
              <ChevronLeft size={60} className="text-white hover:text-[#8C6EA8] transition-colors duration-300"/>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 z-20 transition-colors disabled:opacity-50"
              aria-label="Next slide"
              disabled={isTransitioning}
            >
              <ChevronRight size={60} className="text-white hover:text-[#8C6EA8] transition-colors duration-300"/>
            </button>
          </div>
        </div>
      </div>

            {/* Practical Information Section - Contained Width */}
            <div className="py-5">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-[#faf8f5] p-8 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-start">
                    {/* Left side - Title */}
                    <div className="md:w-1/3">
                      <h2 className="text-4xl font-bold font-griffiths">
                        Infos<br />Pratique
                      </h2>
                    </div>
                    
                    {/* Right side - Information list */}
                    <div className="md:w-2/3">
                      <div className="space-y-2">
                        {/* Visa */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosVisa.png`} 
                              alt="Visa" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Visa</span>
                            <span className="text-gray-900 font-medium font-manrope">oui</span>
                          </div>
                        </div>
                        
                        {/* Flight Duration */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosVol.png`} 
                              alt="Durée du vol" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Durée du vol</span>
                            <span className="text-gray-900 font-medium font-manrope">18h(1escale)</span>
                          </div>
                        </div>
                        
                        {/* Local Time */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosHeure.png`} 
                              alt="Heure locale" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Heure locale</span>
                            <span className="text-gray-900 font-medium font-manrope">UTC +2</span>
                          </div>
                        </div>
                        
                        {/* Local Currency */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosMonnais.png`} 
                              alt="Monnaie locale" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Monnaie locale</span>
                            <span className="text-gray-900 font-medium font-manrope">Rand</span>
                          </div>
                        </div>
                        
                        {/* Spoken Language */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosLangue.png`} 
                              alt="Langue parlée" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Langue parlée</span>
                            <span className="text-gray-900 font-medium font-manrope">Afrikaans - Anglais</span>
                          </div>
                        </div>
                        
                        {/* Required Vaccines */}
                        <div className="flex items-center">
                          <div className="w-8 h-8 mr-4">
                            <img 
                              src={`${process.env.PUBLIC_URL}/assets/images/infosVaccins.png`} 
                              alt="Vaccins nécessaires" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex justify-between w-full">
                            <span className="text-gray-700 italic font-griffiths">Vaccins nécessaires</span>
                            <span className="text-gray-900 font-medium font-manrope">Non</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="py-10 bg-white"></div>

      {/* Destination Offers Section */}
      <div className="py-20 bg-[#faf8f5]">
        <div className="container mx-auto px-4">
          {/* First Offer */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row">
              {/* Left side - Text content */}
              <div className="md:w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-1 font-griffiths">
                  Afrique du Sud
                </h2>
                <h3 className="text-3xl font-light mb-6 flex items-center font-griffiths">
                  Loin des foules
                  <span className="ml-4 inline-block w-20 h-0.5 bg-black"></span>
                </h3>
                
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
                
                <a href="/offre/afrique-sud" className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors font-manrope">
                  Voir l'offre <span className="ml-1">&gt;</span>
                </a>
              </div>
              
              {/* Right side - Images with slider */}
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-full">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer1Images[currentOffer1Slide]}`} 
                        alt="Safari view" 
                        className="w-full h-[300px] object-cover rounded-lg duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="w-1/3 ml-4">
                      <img 
                        src={`${process.env.PUBLIC_URL}${offer1Images[(currentOffer1Slide + 1) % offer1Images.length]}`} 
                        alt="Safari wildlife" 
                        className="w-full h-[300px] object-cover rounded-lg duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button 
                      onClick={prevOffer1Slide}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} className="text-gray-800" />
                    </button>
                    <button 
                      onClick={nextOffer1Slide}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Offer */}
          <div>
            <div className="flex flex-col md:flex-row">
              {/* Left side - Text content */}
              <div className="md:w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-1 font-griffiths">
                  Afrique du Sud
                </h2>
                <h3 className="text-3xl font-light mb-6 flex items-center font-griffiths">
                  Proche de la nature
                  <span className="ml-4 inline-block w-20 h-0.5 bg-black"></span>
                </h3>
                
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
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button 
                      onClick={prevOffer2Slide}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} className="text-gray-800" />
                    </button>
                    <button 
                      onClick={nextOffer2Slide}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} className="text-gray-800" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 flex justify-center">
        <div 
          className="relative bg-cover bg-center rounded-lg overflow-hidden max-w-6xl w-full mx-4 duration-300 hover:scale-105"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/assets/images/dest8.png')`,
          }}
        >
          <div className="container mx-auto px-8 py-16 text-white">
            <div className="mx-auto" >
              <h2 className="text-5xl font-light mb-4 font-griffiths">
                Visitez l'afrique de sud
              </h2>
              <h2 className="text-5xl font-light mb-8 font-manrope">
                avec Atlas Voyages<br />
              </h2>
              
              
              <a href="/decouvrir" className="inline-block border border-white text-white px-7 py-1.5 hover:bg-white hover:text-gray-800 transition-colors flex items-center font-manrope" style={{ width: 'fit-content' }}>
                Découvrir
                <span className="ml-2 inline-flex items-center justify-center">
                  &gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Ideas Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-normal mb-4 font-griffiths text-center">
              Des idées de voyages selon vos envies
            </h2>
            
            <p className="text-gray-700 mb-16 font-manrope text-center max-w-4xl mx-auto">
              Parce que chaque voyageur a ses propres envies et attentes, 
              chaque aventure doit être unique et personnalisée pour offrir une expérience inoubliable.
            </p>
          </div>
          
          {/* Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Paris Card */}
            <div className="relative h-[600px] rounded-lg overflow-hidden group">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/images/paris.png`} 
                alt="Paris" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-sm mb-2 block">Paris</span>
                <h3 className="text-2xl font-bold mb-3 font-griffiths">
                  Sauvage, vibrante<br />et indomptable
                </h3>
                <p className="text-sm text-white/80 mb-4 font-manrope">
                  L'Afrique du Sud est un pays diversifié, connu pour ses paysages spectaculaires, sa faune sauvage et son histoire riche, marquée par la lutte contre l'apartheid.
                </p>
              </div>
            </div>
            
            {/* Rome Card */}
            <div className="relative h-[600px] rounded-lg overflow-hidden group">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/images/rome.png`} 
                alt="Rome" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-sm mb-2 block">Rome</span>
                <h3 className="text-2xl font-bold mb-3 font-griffiths">
                  Sauvage, vibrante<br />et indomptable
                </h3>
                <p className="text-sm text-white/80 mb-4 font-manrope">
                  L'Afrique du Sud est un pays diversifié, connu pour ses paysages spectaculaires, sa faune sauvage et son histoire riche, marquée par la lutte contre l'apartheid.
                </p>
              </div>
            </div>
            
            {/* Tokyo Card */}
            <div className="relative h-[600px] rounded-lg overflow-hidden group">
              <img 
                src={`${process.env.PUBLIC_URL}/assets/images/tokyo.png`} 
                alt="Tokyo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-sm mb-2 block">Tokyo</span>
                <h3 className="text-2xl font-bold mb-3 font-griffiths">
                  Sauvage, vibrante<br />et indomptable
                </h3>
                <p className="text-sm text-white/80 mb-4 font-manrope">
                  L'Afrique du Sud est un pays diversifié, connu pour ses paysages spectaculaires, sa faune sauvage et son histoire riche, marquée par la lutte contre l'apartheid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetails;