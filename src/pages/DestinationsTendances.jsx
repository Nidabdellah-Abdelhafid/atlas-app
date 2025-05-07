import React, { useEffect } from 'react'
import { ChevronRight } from 'lucide-react';

function DestinationsTendances() {

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    const blogPosts = [
        {
          id: 1,
          image: '/assets/images/blog1.png',
          title: 'Escapade en Afrique du Sud - Loin des foules, proche de la nature',
          description: 'Une escapade en Afrique australe. Découvrez notre sélection des plus beaux endroits à visiter, loin des sentiers battus.',
        },
        {
          id: 2,
          image: '/assets/images/blog2.png',
          title: `au Lune d'ALULA - L'Arabie Saoudite en adresse exclusives`,
          description: `Découvrez les merveilles cachées de l'Arabie Saoudite à travers nos adresses exclusives.`,
        },
        {
          id: 3,
          image: '/assets/images/blog3.png',
          title: `Escapade en Norvège - Tour en finesse au fil d'adresses privilégiées`,
          description: `Un voyage au cœur des fjords norvégiens, entre nature sauvage et confort absolu.`,
        },
        {
          id: 4,
          image: '/assets/images/blog4.png',
          title: `Escapade en Asie - Une aventure en pleine nature`,
          description: `Une escapade en Asie, une aventure en pleine nature.`,
        },
        {
          id: 5,
          image: '/assets/images/blog5.png',
          title: `Escapade en Nouvelle-Zélande - Un voyage en pleine nature`,
          description: `Une escapade en Nouvelle-Zélande, un voyage en pleine nature.`,
     
        },
        {
          id: 6,
          image: '/assets/images/blog6.png',
          title: `Escapade en Asie - Une aventure en pleine nature`,
          description: `Une escapade en Asie, une aventure en pleine nature.`,
        },
      ];
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
      <div className="py-8 sm:py-10 lg:pb-14 px-4 sm:px-8 lg:px-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-griffiths text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 hover:text-[#8C6EA8] transition-colors">Destinations Tendances</h2>
            <p className="font-manrope font-light text-gray-600 text-sm sm:text-base">
            Vous n'avez pas d'inspiration ?<br className="hidden sm:block" />
              Voici nos recommandations pour un voyage de luxe réussi
            </p>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          {destinations.map((post) => (
          <div key={post.id} className="space-y-3 sm:space-y-4">
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}${post.image}`}
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className='absolute bottom-4 p-2 flex flex-row w-full justify-between items-center'>
                  <p className='text-white font-manrope font-medium'>08 jours, de 16 500 à 21 000 Dhs</p>
                  <a href="/destinationDetails" className="bg-white rounded-full p-1 cursor-pointer">
                  <span className="text-black"><ChevronRight size={20}/></span>
                  </a>
                </div>
                
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <span className="font-griffiths font-semibold text-lg sm:text-2xl hover:text-[#8C6EA8] transition-colors">{post.title}</span>
                </div>
                <h3 className="font-manrope font-light text-sm sm:text-base">{post.description}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-[#8C6EA8] text-white px-8 py-3 hover:bg-opacity-90 transition-colors">
          Voir toutes nos suggestions {'>'}
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
