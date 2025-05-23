import { useState, useEffect } from 'react';
import { jwtTokenService } from '../services/auth/jwtTokenService';
import { authService } from '../services/auth/authService';
import { User, Mail, Phone, MapPin, Heart, MessageSquare, LogOut } from 'lucide-react';

function EspaceClient() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');

    const [favorites] = useState([
        { id: 1, title: 'Voyage à Bali', price: '1200€', image: 'https://www.cherifaistesvalises.com/wp-content/uploads/2023/04/Shutterstock_1463319173-3-768x512.jpg' },
        { id: 2, title: 'Tour de Dubai', price: '1500€', image: 'https://lepetitjournal.com/_next/image?url=https%3A%2F%2Fbackoffice.lepetitjournal.com%2Fsites%2Fdefault%2Ffiles%2F2025-03%2Fdubai%2520securit%25C3%25A9.jpeg&w=750&q=75' },
        // Add more favorites
    ]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authService.getAuthUser();
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    const logout = () => {
        jwtTokenService.remove();
        window.location.href = '/';
    };

    const decodeImage = (base64String) => {
        return base64String ? `data:image/jpg;base64,${base64String}` : '';
    };

      
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>;
    }

    return (
        <div className="min-h-screen bg-[#FCFAF7] pt-32">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-[#8C6EA8] flex items-center justify-center text-white mb-4">
                                {user?.userPhoto ? (
                                <img 
                                    src={decodeImage(user.userPhoto)} 
                                    alt={user.fullname} 
                                    className="w-full h-full rounded-full object-cover"
                                />
                                ) : (
                                    <User size={40} />
                                )}
                            </div>
                                <h2 className="text-xl font-semibold">{user?.fullname}</h2>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'profile' ? 'bg-[#8C6EA8] text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <User size={20} /> Profile
                                </button>
                                <button 
                                    onClick={() => setActiveTab('favorites')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'favorites' ? 'bg-[#8C6EA8] text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <Heart size={20} /> Favoris
                                </button>
                                <button 
                                    onClick={() => setActiveTab('messages')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'messages' ? 'bg-[#8C6EA8] text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <MessageSquare size={20} /> Messages
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 text-red-500 hover:bg-red-50"
                                >
                                    <LogOut size={20} /> Se déconnecter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h3 className="text-2xl font-semibold mb-6">Information Personnelle</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="text-gray-400" size={20} />
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="text-gray-700">{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="text-gray-400" size={20} />
                                            <div>
                                                <p className="text-sm text-gray-500">Téléphone</p>
                                                <p className="text-gray-700">{user?.telephone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="text-gray-400" size={20} />
                                            <div>
                                                <p className="text-sm text-gray-500">Pays</p>
                                                <p className="text-gray-700">{user?.pays}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'favorites' && (
                                <div>
                                    <h3 className="text-2xl font-semibold mb-6">Mes Favoris</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {favorites.map(fav => (
                                            <div key={fav.id} className="border rounded-lg overflow-hidden">
                                                <img src={fav.image} alt={fav.title} className="w-full h-48 object-cover" />
                                                <div className="p-4">
                                                    <h4 className="font-semibold">{fav.title}</h4>
                                                    <p className="text-[#8C6EA8] font-medium">{fav.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'messages' && (
                                <div>
                                    <h3 className="text-2xl font-semibold mb-6">Messages</h3>
                                    <div className="text-center py-8 text-gray-500">
                                        <MessageSquare size={40} className="mx-auto mb-4" />
                                        <p>Aucun message pour le moment</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EspaceClient;