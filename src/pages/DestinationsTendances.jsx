import React, { useEffect } from 'react'

function DestinationsTendances() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample destination data
  const destinations = [
    {
      id: 1,
      image: '/assets/images/destTen1.png',
      duration: '13 jours, de 25 000 à 32 000 Dhs',
      title: 'Escapade en Afrique du Sud - Loin des foules, proche de la nature',
      description: 'Privés et lodges somptueux, l\'Afrique du Sud dévoile un luxe sauvage où chaque lever de soleil est une œuvre d\'art. Dégustez un grand cru face aux lions, laissez le vent d\'Afrique murmurer à votre âme.'
    },
    {
      id: 2,
      image: '/assets/images/destTen2.png',
      duration: '08 jours, de 16 500 à 21 000 Dhs',
      title: 'au Luxe d\'Al Ula - L\'Arabie Saudit en adresse exclusives',
      description: 'Sous un ciel étoilé d\'AlUla, Luxe et histoire se rencontrent entre canyons dorés et tentes somptueuses. Chaque souffle du désert murmure une légende gravée dans la roche.'
    },
    {
      id: 3,
      image: '/assets/images/destTen3.png',
      duration: '12 jours, de 24 500 à 29 000 Dhs',
      title: 'Escapade en Norvège - Tout en finesse au fil d\'adresses privilégiées',
      description: 'Fjords majestueux et aurores boréales dans un chalet raffiné. Là où le silence glacé rencontre le feu d\'une cheminée, l\'évasion devient art.'
    },
    // Duplicate the first 3 destinations to create 9 total
    {
      id: 4,
      image: '/assets/images/destTen1.png',
      duration: '13 jours, de 25 000 à 32 000 Dhs',
      title: 'Escapade en Afrique du Sud - Loin des foules, proche de la nature',
      description: 'Privés et lodges somptueux, l\'Afrique du Sud dévoile un luxe sauvage où chaque lever de soleil est une œuvre d\'art. Dégustez un grand cru face aux lions, laissez le vent d\'Afrique murmurer à votre âme.'
    },
    {
      id: 5,
      image: '/assets/images/destTen2.png',
      duration: '08 jours, de 16 500 à 21 000 Dhs',
      title: 'au Luxe d\'Al Ula - L\'Arabie Saudit en adresse exclusives',
      description: 'Sous un ciel étoilé d\'AlUla, Luxe et histoire se rencontrent entre canyons dorés et tentes somptueuses. Chaque souffle du désert murmure une légende gravée dans la roche.'
    },
    {
      id: 6,
      image: '/assets/images/destTen3.png',
      duration: '12 jours, de 24 500 à 29 000 Dhs',
      title: 'Escapade en Norvège - Tout en finesse au fil d\'adresses privilégiées',
      description: 'Fjords majestueux et aurores boréales dans un chalet raffiné. Là où le silence glacé rencontre le feu d\'une cheminée, l\'évasion devient art.'
    },
    {
      id: 7,
      image: '/assets/images/destTen1.png',
      duration: '13 jours, de 25 000 à 32 000 Dhs',
      title: 'Escapade en Afrique du Sud - Loin des foules, proche de la nature',
      description: 'Privés et lodges somptueux, l\'Afrique du Sud dévoile un luxe sauvage où chaque lever de soleil est une œuvre d\'art. Dégustez un grand cru face aux lions, laissez le vent d\'Afrique murmurer à votre âme.'
    },
    {
      id: 8,
      image: '/assets/images/destTen2.png',
      duration: '08 jours, de 16 500 à 21 000 Dhs',
      title: 'au Luxe d\'Al Ula - L\'Arabie Saudit en adresse exclusives',
      description: 'Sous un ciel étoilé d\'AlUla, Luxe et histoire se rencontrent entre canyons dorés et tentes somptueuses. Chaque souffle du désert murmure une légende gravée dans la roche.'
    },
    {
      id: 9,
      image: '/assets/images/destTen3.png',
      duration: '12 jours, de 24 500 à 29 000 Dhs',
      title: 'Escapade en Norvège - Tout en finesse au fil d\'adresses privilégiées',
      description: 'Fjords majestueux et aurores boréales dans un chalet raffiné. Là où le silence glacé rencontre le feu d\'une cheminée, l\'évasion devient art.'
    }
  ];

  // Also update the hero section background image
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative w-full bg-cover bg-center flex items-center justify-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${process.env.PUBLIC_URL}/assets/images/destTen.png')`,
          height: '100vh',
          paddingTop: '80px' // Add padding to compensate for the header
        }}
      >
        <div className="text-center text-white z-10">
          <h2 className="text-2xl md:text-4xl font-light font-manrope">
            Le bonheur en
          </h2>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-light mb-4 font-griffiths">
            All inclusive
          </h1>
        </div>
      </div>

      {/* All Inclusive Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-light mb-2 md:mb-4 font-manrope">
              Le luxe en 
              <span className="hidden md:inline-block ml-11 w-20 h-1 bg-black align-middle"></span>
              <span className="inline-block md:hidden ml-4 w-12 h-1 bg-black align-middle"></span>
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl mb-6 md:mb-8 font-griffiths">
              All Inclusive
            </h3>
          </div>
          
          <div className="w-full md:w-2/3">
            <p className="text-gray-600 text-sm md:text-md leading-relaxed mb-6 md:mb-8 font-manrope">
              Découvrez le voyage en All Inclusive : détente totale, plaisir illimité. Plages de 
              rêve, repas exquis, activités passionnantes, TOUT est inclus. Laissez-vous 
              choyer dans un monde de luxe et de tranquillité. Embarquez pour des vacances 
              sans soucis durant lesquelles tous vos désirs seront comblés.
            </p>
            
            <button className="bg-[#8C6EA8] text-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-opacity-90 transition-colors flex items-center font-manrope text-sm sm:text-base">
              Créer votre voyage 
              <span className="ml-2 inline-flex items-center justify-center">
                &gt;
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Destinations Tendances Section */}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 md:mb-4 font-griffiths sans-serif">
            Destinations Tendances
          </h2>
          <p className="text-base md:text-lg text-center mb-8 md:mb-12 font-manrope px-4">
            Vous n'avez pas d'inspiration ? <br className="md:hidden" /> Voici nos recommandations pour un voyage de luxe réussi
          </p>
          
          {/* Destination cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 py-4 md:py-10 px-2 sm:px-4 md:px-8 lg:mx-16 xl:mx-32">
            {destinations.map((destination) => (
              <div key={destination.id} className="overflow-hidden max-w-xs mx-auto w-full rounded-lg">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-72 sm:h-80 md:h-96 lg:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex justify-between items-center">
                    <p className="text-white text-xs sm:text-sm font-medium">{destination.duration}</p>
                    <a href={`/DestinationDetails`} className="text-white bg-black bg-opacity-50 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-opacity-70">
                      &gt;
                    </a>
                  </div>
                </div>
                <div className="pt-3 md:pt-4">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 md:mb-2 font-griffiths line-clamp-2">
                    {destination.title}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-manrope line-clamp-3">
                    {destination.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Suggestions Button - Moved below the destinations */}
          <div className="flex justify-center mt-6 md:mt-8">
            <a href="/suggestions" className="bg-[#8C6EA8] text-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-opacity-90 transition-colors flex items-center font-manrope text-sm sm:text-base">
              Voir toutes nos suggestions
              <span className="ml-2 inline-flex items-center justify-center">
                &gt;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Prepare Your Luxury Trip Section */}
      <div className="py-10 md:py-20 flex justify-center">
        <div 
          className="relative bg-cover bg-center rounded-lg overflow-hidden w-full mx-2 sm:mx-4 max-w-6xl duration-300 hover:scale-105"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${process.env.PUBLIC_URL}/assets/images/destTen4.png')`,
          }}
        >
          <div className="container mx-auto px-4 sm:px-8 py-8 sm:py-12 md:py-16 text-white">
            <div className="mx-auto" >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 md:mb-8 font-griffiths">
                Préparez votre voyage<br />
                <span className="mt-1 md:mt-3 inline-block">de luxe avec Atlas Voyages</span>
              </h2>
              
              <a href="/decouvrir" className="inline-block border border-white text-white px-4 sm:px-7 py-1 sm:py-1.5 hover:bg-white hover:text-gray-800 transition-colors flex items-center font-manrope text-sm sm:text-base" style={{ width: 'fit-content' }}>
                Découvrir
                <span className="ml-2 inline-flex items-center justify-center">
                  &gt;
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationsTendances