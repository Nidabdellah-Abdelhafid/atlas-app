import React, { useEffect } from 'react';

function BlogDetails() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div >
        <div className="relative min-h-screen"> 
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/blog1.png)`,
                filter: 'brightness(0.5)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
                
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-medium text-center">
                Blog Brésil
                </h1>
            </div>
        </div>

        {/* Blog Details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-5xl font-500 mb-6">
                3 habitudes typiquement<br />brésiliennes
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-16">
                Lorsqu'il a déménagé au Brésil, notre correspondant Olivier a été quelque peu déçu par le monde du café. Mais il a rapidement trouvé son bonheur dans des découvertes qui l'ont marqué : la fréquence du goût prononcé des Brésiliens pour le château humaine et la proximité sociale. Autant d'habitudes qu'il conseille à chaque voyageur de prendre dans sa besace avant de partir au cours de leur itinéraire au Brésil.
                </p>
            </div>

            <div className="space-y-20 px-2 sm:px-32">
                {/* First Item */}
                <div className="flex flex-col gap-8">
                    <img 
                    src={`${process.env.PUBLIC_URL}/assets/images/blog2.png`}
                    alt="Rio de Janeiro"
                    className="w-full h-[500px] object-cover"
                    />
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="lg:w-1/3">
                        <h3 className="text-2xl sm:text-3xl font-medium">
                        Prendre son temps
                        </h3>
                    </div>
                    <div className="lg:w-2/3 space-y-6 text-gray-700 text-base sm:text-lg">
                    <p>
                        En retard ? Vous avez dit en retard ? Au Brésil, j'ai rapidement appris que la notion du temps est différente. Peut-être encore plus à Rio de Janeiro. Que ce soit dans la vie privée ou dans la vie professionnelle, le retard est toléré. Celui-ci est même devenu naturel.
                        </p>
                        <p>
                        Il n'est pas rare d'arriver à une fête d'amis avec deux heures de retard. Personne ne vous fera la remarque qu'il est fort probable que vous ne serez pas le dernier à être en retard. Un petit conseil : si vos amis vous attendent à 14 h, partez de chez vous à 14 h ! Une expression brésilienne illustre parfaitement cet état d'esprit : « Personne ne veut arriver le premier à la fête, comme le riz à table ».
                        </p>
                        <p>
                        L'important est que tout le monde soit bien arrivé et surtout, d'être ensemble. L'heure d'arrivée devient donc un concept flexible. Cet état d'esprit permet alors aux Brésiliens, et en particulier aux Cariocas, de garder une attitude zen dans plusieurs circonstances qui sembleraient stressantes en France : files d'attente, embouteillages, démarches bureaucratiques.
                        </p>
                    </div>
                    </div>
                </div>

                {/* Second Item */}
                <div className="flex flex-col gap-8">
                    <img 
                    src={`${process.env.PUBLIC_URL}/assets/images/blog3.png`}
                    alt="Restaurant"
                    className="w-full h-[500px] object-cover"
                    />
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="lg:w-1/3">
                        <h3 className="text-2xl sm:text-3xl font-medium">
                        Manger à toute heure de la journée
                        </h3>
                    </div>
                    <div className="lg:w-2/3 space-y-6 text-gray-700 text-base sm:text-lg">
                    <p>
                        Les Brésiliens sont le plus souvent très gourmands. Les trois repas de la journée sont copieux et servis chauds. Entre ceux-ci, il n'est pas rare de se laisser tenter par un petit salgado, un petit en-cas salé. Le dessert qui suit le déjeuner est sacré pour la majorité des Brésiliens. Idem pour le café tout au long de la journée ou les barbecues qui peuvent durer plus de 24 heures.
                        </p>
                        <p>
                        Dans les grandes villes, les restaurants fonctionnent généralement du matin au soir et sans interruption. Si vous désirez manger au milieu de la nuit ou de l'après-midi, vous serez reçus, sans aucun problème.
                        </p>
                        <p>
                        Les Brésiliens apprécient beaucoup les restaurants à kilo (au kilo). Pas de menu à la carte, mais d'immenses buffets aux multiples saveurs : salades, viandes et poissons, légumes et féculents, desserts. Chacun se sert en fonction de ses envies et de son appétit. Le tout est pesé et l'addition, calculée au poids total de la nourriture consommée.
                        </p>
                    </div>
                    </div>
                </div>

                {/* Third Item */}
                <div className="flex flex-col gap-8">
                    <img 
                    src={`${process.env.PUBLIC_URL}/assets/images/blog4.png`}
                    alt="Street Music"
                    className="w-full h-[500px] object-cover"
                    />
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="lg:w-1/3">
                        <h3 className="text-2xl sm:text-3xl font-medium">
                        Ne pas craindre la promiscuité
                        </h3>
                    </div>
                    <div className="lg:w-2/3 space-y-6 text-gray-700 text-base sm:text-lg">
                    <p>
                        Les Brésiliens sont le plus souvent très gourmands. Les trois repas de la journée sont copieux et servis chauds. Entre ceux-ci, il n'est pas rare de se laisser tenter par un petit salgado, un petit en-cas salé. Le dessert qui suit le déjeuner est sacré pour la majorité des Brésiliens. Idem pour le café tout au long de la journée ou les barbecues qui peuvent durer plus de 24 heures.
                        </p>
                        <p>
                        Dans les grandes villes, les restaurants fonctionnent généralement du matin au soir et sans interruption. Si vous désirez manger au milieu de la nuit ou de l'après-midi, vous serez reçus, sans aucun problème.
                        </p>
                        <p>
                        Les Brésiliens apprécient beaucoup les restaurants à kilo (au kilo). Pas de menu à la carte, mais d'immenses buffets aux multiples saveurs : salades, viandes et poissons, légumes et féculents, desserts. Chacun se sert en fonction de ses envies et de son appétit. Le tout est pesé et l'addition, calculée au poids total de la nourriture consommée.
                        </p>
                        </div>
                    </div>
                </div>
                </div>
        </div>

        {/* Offre Details */}
        <div className="container bg-[#F5F5F5] mx-auto px-4 sm:px-6 lg:px-36 py-16">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
            {/* Background Image */}
            <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/blog5.png)`,
                filter: 'brightness(0.7)'
            }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-between h-full text-white text-center py-20">
            <div>
                <p className="text-xl sm:text-5xl mb-4">Nos idées de voyage</p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-8">Le Brésil</h2>
            </div>
            <button className="border-2 border-white px-14 py-2 hover:bg-white hover:text-black transition-colors">
                Découvrir {'>'}
            </button>
            </div>
        </div>
        </div>
        
        {/* Other Blogs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-36 py-16">
        <h2 className="text-3xl sm:text-4xl font-medium text-center mb-12">
            Vous aimerez aussi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* First Blog Card */}
            <div className="space-y-4">
            <img 
                src={`${process.env.PUBLIC_URL}/assets/images/blog7.png`}
                alt="Grèce"
                className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="space-y-2">
                <p className="text-sm text-gray-500">Méditerranée</p>
                <h3 className="text-2xl font-medium">Où faire le carnaval en Grèce ?</h3>
                <p className="text-gray-600 text-sm">
                Comme le mardi gras catholique, le lundi pur (Kathari Deftera) marque le début du carême orthodoxe pour les Grecs et la fin des festivités du carnaval, une période synonyme de folie collective et d'accès à tous genres, qui connaît un grand succès en Grèce. Voici 5 lieux où se joindre à la fête.
                </p>
                <button className="text-sm hover:underline">
                Voir l'article {'>'}
                </button>
            </div>
            </div>

            {/* Second Blog Card */}
            <div className="space-y-4">
            <img 
                src={`${process.env.PUBLIC_URL}/assets/images/blog6.png`}
                alt="Islande"
                className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="space-y-2">
                <p className="text-sm text-gray-500">Scandinavie</p>
                <h3 className="text-2xl font-medium">3 cascades d'Islande méconnues</h3>
                <p className="text-gray-600 text-sm">
                Les cascades du Sud attirent de nombreuses personnes à un moment ou un autre de leur voyage en Islande. Rien de plus normal, ce sont de superbes manifestations de la puissance des éléments. L'inconvénient, en particulier pendant l'été, c'est que la fréquentation des principales cascades peut être très élevée. Pour éviter les embouteillages, Fred
                </p>
                <button className="text-sm hover:underline">
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