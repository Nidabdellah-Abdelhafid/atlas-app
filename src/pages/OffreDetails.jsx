import { useState, useRef, useEffect} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function OffreDetails() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const [activeDay, setActiveDay] = useState(1);
    const [showProgram, setShowProgram] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const daysData = [
        {
          label: "Vol pour Le Cap",
          description: "À l'arrivée, prise en charge de la voiture de location et installation pour quatre nuits. Ici, loin de la plage de Blouberg bien connue des kitesurfers, les quartiers de la ville sont joliment aménagés, chacune avec son caractère unique. Les murs s'habillent de couleurs vives, les tissus imprimés et l'artisanat local donnent le ton. Les cafés et restaurants sont à la pointe de la modernité. Sur une terrasse ensoleillée, un petit bassin permet de se rafraîchir aux heures les plus chaudes.",
          photos: [
            '/assets/images/slider1.png',
            '/assets/images/slider1.png',
            '/assets/images/slider1.png',
            '/assets/images/slider1.png',
          ]
        },
        {
          label: "Le Cap - Parc Kruger",
          description: "Vol pour le nord-est du pays (2h20). Prise en charge de votre second véhicule de location et route vers la réserve privée de Balule. Vous passez ces quatre jours dans un camp confortable. Les tentes, de style africain, sont spacieuses et les espaces communs sont décorés avec goût. Chacune dispose de sa propre terrasse et s'ouvre sur les paysages de la savane.",
          photos: [
            '/assets/images/slider1.png',
            '/assets/images/slider1.png',
            '/assets/images/slider1.png',
          ]
        },
        // Add more days as needed
      ];

      const programData = [
        {
          day: 1,
          activities: [
            {
              label: "Transfert vers la zone de conservation de Ngorongoro",
              time: "08:00",
              description: "Départ matinal vers la réserve",
              photo: "/assets/images/activity1.png"
            },
            {
              label: "Explorez le cratère lors d'un safari photo, suivi d'un pique-nique délicieux",
              time: "10:30",
              description: "Safari et déjeuner en pleine nature",
              photo: "/assets/images/activity2.png"
            },
            {
              label: "Transfert au Ngorongoro Wild Camp, dîner et nuit",
              time: "16:00",
              description: "Installation au camp",
              photo: "/assets/images/activity3.png"
            }
          ]
        },
        // Add more days...
      ];

      const images = daysData[activeDay - 1]?.photos || ['/assets/images/slider1.png'];
    
    // Add these functions before the return statement
    const nextSlide = () => {
    if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const itemWidth = scrollWidth / images.length;
        const newScrollPosition = ((currentSlide + 1) % images.length) * itemWidth;
        
        carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
        });
        setCurrentSlide((currentSlide + 1) % images.length);
    }
    };

    const prevSlide = () => {
    if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const itemWidth = scrollWidth / images.length;
        const newScrollPosition = ((currentSlide - 1 + images.length) % images.length) * itemWidth;
        
        carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
        });
        setCurrentSlide((currentSlide - 1 + images.length) % images.length);
    }
    };

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
    
  return (
    <div className="bg-[#FFFCF7]">
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/offreImage.png)`,
            filter: 'brightness(0.7)'
            }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen text-center text-white p-4 sm:p-6 lg:p-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-3 lg:mb-4">
            Loin des foules
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 lg:mb-8">
            Afrique du Sud
            </h2>
            
            <p className="max-w-sm sm:max-w-xl lg:max-w-2xl text-xs sm:text-sm lg:text-lg mb-6 sm:mb-8 lg:mb-12 text-white/90 px-4 sm:px-0">
            Bienvenue en Afrique australe !<br />
            L'Afrique australe, trésor du continent, offre une expérience de voyage unique<br className="hidden sm:block" />
            et envoûtante, avec des destinations inoubliables comme Le Cap !
            </p>

            <div className="bg-black/60 w-full sm:w-auto p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-6 lg:mb-8">
                <p className="text-base sm:text-lg">Tarif à partir de</p>
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
                32 000Dhs
                </h3>
                <p className="text-xs sm:text-sm lg:text-base">
                9 nuits / 10 jours
                </p>
            </div>

            <button className="border-2 border-white px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm lg:text-base hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4">AFRIQUE DU SUD</h2>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Loin des foules</h1>
              
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
                Bienvenue en Afrique australe !<br />
                L'Afrique australe, trésor du continent, offre une expérience de voyage unique et envoûtante, avec des destinations inoubliables comme Le Cap, le parc national de Chobe et les chutes Victoria. Le Cap fascine avec ses paysages époustouflants et sa culture vibrante. Le parc national de Chobe séduit par sa faune exceptionnelle, abritant l'une des plus grandes populations d'éléphants d'Afrique.
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
                    alt="Duration" className="w-8 h-8" />
                    <h3 className="text-2xl font-bold text-gray-800">Durée du vol</h3>
                  </div>
                  <p className="text-3xl font-bold">18h</p>
                  <p className="text-lg text-gray-500">(l'escale)</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center gap-3 mb-2">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/iconstime.png`} 
                    alt="Time" className="w-8 h-8" />
                    <h3 className="text-2xl font-bold text-gray-800">Heure locale</h3>
                  </div>
                  <p className="text-3xl font-bold">UTC</p>
                  <p className="text-lg text-gray-500">+2</p>
                </div>
              </div>

              <div className="border-l border-black pl-20 ml-4">
                <h3 className="font-medium text-gray-800 mb-3">Inclus: Total pour 1 voyageur</h3>
                <ul className="space-y-1.5 text-gray-700">
                  <li>vols Eco Std</li>
                  <li>Hotels</li>
                  <li>Transfert</li>
                </ul>
              </div>
            </div>
        </div>

        {/* Planing /program Section */}
        <div className="mt-16">
          {/* Days Navigation tab*/}
          <div className="flex overflow-x-auto mb-12 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <div className="flex w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((day) => (
                <button
                  key={day}
                  onClick={() => {setActiveDay(day);setShowProgram(false)}}
                  className={`flex-1 px-6 lg:px-16 py-5 text-xl whitespace-nowrap border border-1 transition-colors ${
                    day === activeDay 
                    ? 'bg-[#ACACAC] text-black' 
                    : 'bg-transparent hover:bg-[#ACACAC]'
                  }`}
                >
                  Jour {day}
                </button>
              ))}
            </div>
          </div>
          {/* tab Content */}
            <div className="flex flex-col justify-center items-center">
            {/* Program Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mx-auto px-6 sm:px-8 lg:px-20 py-12">
                {/* Left Content */}
                <div className="flex flex-col h-full justify-between">
                <div className={`${showProgram? 'flex flex-row w-full':''}`}>
                <div className={`${showProgram? 'w-1/2':''}`}>
                <h2 className="text-4xl font-medium mb-4">
                    {daysData[activeDay - 1]?.label || `Jour ${activeDay}`}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    {daysData[activeDay - 1]?.description || `Description pour le jour ${activeDay}`}
                </p>
                </div>
                {showProgram ? (
                <div className={`${showProgram? 'w-1/2':''} inset-0 overflow-y-auto mt-16 h-full`} >
                    <div className="ml-4 ">
                    
                    
                    <div className="space-y-4 border-l border-black px-6 h-full mb-8">
                    {programData[activeDay - 1]?.activities.map((activity, index, array) => (
                        <div key={index} className="flex gap-4 pl-6 ">
                            <div className="flex-1 relative h-full">
                            <div className="absolute top-2 -left-6 w-4 h-4 bg-black rounded-full" />
                            <h3 className="font-light text-md mb-4 lg:mb-4 h-48 lg:h-24">{activity.label}</h3>
                            {index !== array.length - 1 && (
                                <div className="w-0.5 h-20 bg-black absolute top-8 -left-[18px]"/>
                            )}
                            </div>
                        </div>
                        ))}
                        <button 
                        onClick={() => setShowProgram(false)}
                        className="flex items-center gap-2 mt-8 p-2 border border-black rounded-full "
                    >
                        <ChevronLeft size={24} />
                    </button>
                    </div>

                    
                    </div>
                    
                </div>
                ) : null}
                </div>
                
              <div className="flex flex-col w-60">
              <button 
                    onClick={() => setShowProgram(true)}
                    className={`${showProgram? 'hidden':''} underline py-2 my-4 text-start hover:text-[#8C6EA8]`}
                    >
                    Voir le programme {'>'}
                    </button>
                <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors">
                    Demander un devis {'>'}
                </button>
                </div>
            </div>

            {/* Right Content */}
            <div className="relative">
            <div className="relative h-[400px] overflow-hidden">
                <div 
                ref={carouselRef}
                className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth h-full"
                >
                {images.map((image, index) => (
                    <div 
                    key={index}
                    className="flex-none snap-center relative w-full h-full"
                    >
                    <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${index === currentSlide ? 'opacity-0' : 'opacity-50'}`} />
                    <img 
                        src={`${process.env.PUBLIC_URL}${image}`}
                        alt={`Slide ${index + 1}`} 
                        className="w-full h-full object-cover"
                    />
                    </div>
                ))}
                </div>
                
                {/* Navigation Arrows */}
                <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white"
                >
                <ChevronLeft size={30} className='text-black  transition-colors duration-300'/>
                </button>
                <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 z-10 rounded-full bg-white"
                >
                <ChevronRight size={30} className='text-black transition-colors duration-300'/>
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => {
                        setCurrentSlide(index);
                        carouselRef.current?.scrollTo({
                        left: (carouselRef.current.scrollWidth / images.length) * index,
                        behavior: 'smooth'
                        });
                    }}
                    />
                ))}
                </div>
            </div>
            </div>
            
          </div>
          {/* Map */}
            <div className="p-4">
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/south-africa-map.png`}
                  alt="South Africa Map" 
                  className="w-full"
                />
              </div>
        </div>
        </div>

       {/* Devis Section */}         
        <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] sm:container mx-6 sm:mx-auto px-6 sm:px-6 lg:px-20 py-10 sm:py-12 lg:py-16">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/SudAfrica2.png)`,
              filter: 'brightness(0.5)'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center sm:items-start justify-center h-full text-white p-4 sm:p-8 lg:p-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-medium mb-4 text-center sm:text-left max-w-2xl">
              Visitez l'afrique de sud<br />
              <span className="font-medium">AVEC ATLAS VOYAGES</span>
            </h2>
            
            <button className="mt-4 sm:mt-6 lg:mt-8 border-2 border-white px-6 sm:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
              Demander un devis {'>'}
            </button>
          </div>
        </div> 


       {/* Another Offres Section */}
      <div className="container mx-auto px-6 sm:px-6 lg:px-20 py-10 sm:py-12 lg:py-16">
      
      
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-center mb-3 sm:mb-4">Autres évasions</h2>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-4">
          Parce que chaque voyageur a ses propres envies et attentes,
          chaque aventure doit être unique et personnalisée pour offrir une expérience inoubliable.
        </p>
        
        <div className="space-y-6 sm:space-y-8">
          {otherOffers.map((offer, index) => (
            <div key={index} className="relative h-full overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}${offer.image})`,
                  filter: 'brightness(0.7)'
                }}
              />
              <div className="relative z-10 h-full flex flex-col justify-center items-start sm:items-end p-6 sm:p-8 lg:p-16 text-white">
                <div className="w-full sm:max-w-xl">
                  <h3 className="text-2xl sm:text-3xl lg:text-5xl font-medium mb-2">{offer.title}</h3>
                  <h4 className="text-xl sm:text-2xl lg:text-4xl mb-2 sm:mb-6">{offer.subtitle}</h4>
                  <p className="text-sm sm:text-base mb-6 sm:mb-8 max-w-xl">{offer.description}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-4 sm:gap-8 mb-2 sm:mb-8">
                    <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
                      <p className="text-lg sm:text-xl">{offer.duration}</p>
                      <p className="text-xl sm:text-2xl font-bold">Tarif à partir de : {offer.price}</p>
                    </div>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <p className="text-sm sm:text-base">Inclus: Total pour 1 voyageur</p>
                      <ul className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                        {offer.includes.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <button className="w-full sm:w-auto border-2 border-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base hover:bg-white hover:text-black transition-colors">
                    Voir l'offre {'>'}
                  </button>
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