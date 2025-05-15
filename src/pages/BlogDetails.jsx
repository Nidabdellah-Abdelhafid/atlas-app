import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchBlogs } from '../services/fetchers/dataFetchers';
import { decodeLabel, encodeLabel } from '../utils/idEncoder';
import LoadingUI from '../components/LoadingUI';
import { useApiStatus } from '../context/ApiStatusContext';

function BlogDetails() {  
    const { encodedLabel } = useParams();
    const label = decodeLabel(encodedLabel);
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { apiStatus } = useApiStatus();

    const loadBlogsContentData = useCallback(async () => {
        try {
            setIsLoading(true);
            const blogData = await fetchBlogs();
            const selectedBlog = blogData.find(o => o.title.toLowerCase() === label.toLowerCase());
            setBlog(selectedBlog);
        } catch (error) {
            console.error('Error fetching offres:', error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
        }, [label]);
  
useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogsContentData();
}, [loadBlogsContentData]);

  const isFeminineWord = (word) => {
    if (!word) return false;
    const lowercaseWord = word.toLowerCase();
    const feminineEndings = ['tion', 'sion', 'té', 'ie', 'ure', 'ance', 'ence', 'ette', 'elle'];
    return feminineEndings.some(ending => lowercaseWord.endsWith(ending));
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
    return <LoadingUI title="Chargement de l'article..." />;
  }

  return (
    <div >
        <div className="relative min-h-screen"> 
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                backgroundImage: `url(${blog?.imageUrl})`,
                filter: 'brightness(0.5)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
                
                <h1 className="font-griffiths text-5xl sm:text-6xl lg:text-8xl font-bold text-center">
                Blog {blog?.title}
                </h1>
            </div>
        </div>

        {/* Blog Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-12">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-griffiths text-3xl sm:text-7xl font-500 mb-6">
                {blog?.subTitle}
                </h2>
                <p className="font-manrope font-light  text-gray-600 text-sm sm:text-base mb-16">
                {blog?.description}
                
                </p>
            </div>

            <div className="space-y-20 px-2 sm:px-32">
                
                {blog?.blogContents?.map((blogContent,index)=>(
                
                <div key={blogContent.id} className="flex flex-col gap-8">
                    <img 
                    src={blogContent.imageUrl}
                    alt={blogContent.title}
                    className="w-full h-[500px] object-cover bg-center bg-no-repeat"
                      style={{ objectPosition: 'center center' }}
                    />
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="lg:w-1/3">
                        <h3 className="font-gilroy font-medium text-2xl sm:text-7xl">
                        {blogContent.title}
                        </h3>
                    </div>
                    <div className="font-manrope font-light lg:w-2/3 space-y-6 text-gray-700 text-base sm:text-lg">
                        <p>
                        {blogContent.paragraph1}
                        </p>
                        <p>
                        {blogContent.paragraph2}
                        </p>
                        <p>
                        {blogContent.paragraph3}
                        </p>
                    </div>
                    </div>
                </div>
))}
                </div>
        </div>

        {/* Offre Details */}
        <div className="bg-[#F5F5F5] px-4 sm:px-6 lg:px-36 py-16">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
            {/* Background Image */}
            <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${blog?.pays?.image})`,
                filter: 'brightness(0.7)'
            }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full text-white text-center py-20">
            <div>
                <p className="font-manrope font-medium text-xl sm:text-5xl mb-4">Nos idées de voyage</p>
                <h2 className="font-griffiths text-4xl sm:text-5xl lg:text-9xl font-medium mb-8">
                {blog?.title?.toLowerCase().startsWith('a') || 
                    blog?.title?.toLowerCase().startsWith('e') || 
                    blog?.title?.toLowerCase().startsWith('i') || 
                    blog?.title?.toLowerCase().startsWith('o') || 
                    blog?.title?.toLowerCase().startsWith('u') || 
                    blog?.title?.toLowerCase().startsWith('y') 
                        ? "L'"
                        : isFeminineWord(blog?.title) 
                        ? "La "
                        : "Le "
                    }
                    {blog?.title}
                </h2>
            </div>
            <Link to={`/destinationDetails/${encodeLabel(blog?.pays?.label)}`} className="font-manrope font-medium border-2 border-white px-14 py-2 hover:bg-white hover:text-black transition-colors">
                Découvrir {'>'}
            </Link>
            </div>
        </div>
        </div>
        
        {/* Other Blogs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-36 py-16">
        <h2 className="font-griffiths text-3xl sm:text-6xl font-medium text-center mb-12">
            Vous aimerez aussi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Blog Card */}
            <div className="space-y-4 group">
            <img 
                src={`${process.env.PUBLIC_URL}/assets/images/blog7.png`}
                alt="Grèce"
                className="w-full h-[300px] object-cover rounded-lg duration-300 group-hover:scale-105"
            />
            <div className="space-y-2">
                <p className="font-manrope font-light text-sm text-gray-500">Méditerranée</p>
                <h3 className="font-griffiths text-3xl font-bold">Où faire le carnaval en Grèce ?</h3>
                <p className="font-manrope font-normal text-gray-600 text-sm">
                Comme le mardi gras catholique, le lundi pur (Kathari Deftera) marque le début du carême orthodoxe 
                pour les Grecs et la fin des festivités du carnaval, une période synonyme de folie collective et
                 d'accès à tous genres, qui connaît un grand succès en Grèce. Voici 5 lieux où se joindre à la fête.
                </p>
                <button className="font-manrope font-light text-sm hover:underline">
                Voir l'article {'>'}
                </button>
            </div>
            </div>

            {/* Second Blog Card */}
            <div className="space-y-4 group">
            <img 
                src={`${process.env.PUBLIC_URL}/assets/images/blog6.png`}
                alt="Islande"
                className="w-full h-[300px] object-cover rounded-lg duration-300 group-hover:scale-105"
            />
            <div className="space-y-2">
                <p className="font-manrope font-light text-sm text-gray-500">Scandinavie</p>
                <h3 className="font-griffiths text-3xl font-bold">3 cascades d'Islande méconnues</h3>
                <p className="font-manrope font-normal text-gray-600 text-sm">
                Les cascades du Sud attirent de nombreuses personnes à un moment ou un autre de leur voyage en Islande.
                 Rien de plus normal, ce sont de superbes manifestations de la puissance des éléments. L'inconvénient, 
                 en particulier pendant l'été, c'est que la fréquentation des principales cascades peut être très élevée.
                </p>
                <button className="font-manrope font-light text-sm hover:underline">
                Voir l'article {'>'}
                </button>
            </div>
            </div>
        </div>
        </div>

    </div>
  );
}

export default BlogDetails;