import { useState, useEffect } from 'react';
import { jwtTokenService } from '../services/auth/jwtTokenService';
import { authService } from '../services/auth/authService';
import { User, Mail, Phone, MapPin, Heart, MessageSquare, LogOut, ChevronRight, EllipsisVertical, Pencil, Trash2} from 'lucide-react';
import LoadingUI from '../components/LoadingUI';
import { useApiStatus } from '../context/ApiStatusContext';
import Message from '../components/Message';
import { fetchOffres } from '../services/fetchers/dataFetchers';
import { encodeLabel } from '../utils/idEncoder';
import { Link } from 'react-router-dom';
import { removeOffreFavorite } from '../services/fetchers/dataFetchers';
import Swal from 'sweetalert2';
import UpdateProfileForm from '../components/Profile.tsx';

function EspaceClient() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { apiStatus } = useApiStatus();
    const [activeTab, setActiveTab] = useState('profile');
    const [userFavorites, setUserFavorites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const response = await authService.getAuthUser();
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
            // Add minimum loading time for smooth transition
            setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const loadFavorites = async () => {
          try {
            const offresData = await fetchOffres();
            const userFavorites = offresData.filter(offre => 
              offre.usersFvrOffre?.some(u => u.id === user?.id)
            );
            setUserFavorites(userFavorites);
          } catch (error) {
            console.error('Error fetching favorites:', error);
          }
        };
      
        if (user) {
          loadFavorites();
        }
      }, [user]);

      const handleToggleFavorite = async (offre) => {
        try {
          await removeOffreFavorite({
            offre: offre,
            appUser: user
          });

          setUserFavorites(prevFavorites => 
            prevFavorites.filter(fav => fav.id !== offre.id)
          );
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      };
    
      const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            html: "Cette action est <b>irréversible</b>. Votre compte sera définitivement supprimé.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8C6EA8',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer mon compte',
            cancelButtonText: 'Non, annuler',
            reverseButtons: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showClass: {
                popup: 'animate__animated animate__fadeIn'
            },
            customClass: {
                container: 'font-manrope',
                popup: 'rounded-xl border-2',
                title: 'text-xl font-griffiths',
                htmlContainer: 'font-manrope text-gray-600',
                confirmButton: 'bg-[#8C6EA8] font-manrope px-6 py-2 rounded-lg',
                cancelButton: 'bg-[#d33] font-manrope px-6 py-2 rounded-lg text-white',
                actions: 'space-x-3 mt-6'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                try {

                    const res = authService.deleteProfile();
                    
                    Swal.fire({
                        title: 'Compte supprimé',
                        text: 'Votre compte a été supprimé avec succès.',
                        icon: 'success',
                        confirmButtonColor: '#8C6EA8',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        customClass: {
                            container: 'font-manrope',
                            popup: 'rounded-xl border-2',
                            title: 'text-xl font-griffiths',
                            htmlContainer: 'font-manrope text-gray-600',
                            confirmButton: 'bg-[#8C6EA8] font-manrope px-6 py-2 rounded-lg text-white'
                        }
                    }).then(() => {
                        logout();
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors de la suppression du compte.',
                        icon: 'error',
                        confirmButtonColor: '#8C6EA8',
                        customClass: {
                            container: 'font-manrope',
                            popup: 'rounded-xl border-2',
                            title: 'text-xl font-griffiths',
                            htmlContainer: 'font-manrope text-gray-600',
                            confirmButton: 'bg-[#8C6EA8] font-manrope px-6 py-2 rounded-lg text-white'
                        }
                    });
                }
            }
        });
    };

    const logout = () => {
        jwtTokenService.remove();
        window.location.href = '/';
    };

    const decodeImage = (base64String) => {
        return base64String ? `data:image/jpg;base64,${base64String}` : '';
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
        return <LoadingUI title="Chargement de votre espace personnel..." />;
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
                        <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                            {activeTab === 'profile' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-semibold">Information Personnelle</h3>
                                    <div className="flex gap-2">
                                        <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="btn btn-ghost btn-sm tooltip tooltip-left"
                                        data-tip="Modifier le profil"
                                        >
                                        <Pencil size={18} className="text-[#8C6EA8]" />
                                        </button>
                                        <button
                                        onClick={handleDeleteAccount}
                                        className="btn btn-ghost btn-sm tooltip tooltip-left"
                                        data-tip="Supprimer le compte"
                                        >
                                        <Trash2 size={18} className="text-red-500" />
                                        </button>
                                    </div>
                                    </div>
                                    
                                    <div className="space-y-4 bg-white rounded-lg p-6 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-full">
                                        <Mail className="text-[#8C6EA8]" size={20} />
                                        </div>
                                        <div className="flex-grow">
                                        <p className="text-sm text-gray-500 mb-1">Email</p>
                                        
                                            <p className="text-gray-700">{user?.email}</p>
                                        
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-full">
                                        <Phone className="text-[#8C6EA8]" size={20} />
                                        </div>
                                        <div className="flex-grow">
                                        <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                                        
                                            <p className="text-gray-700">{user?.telephone}</p>
                                        
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-full">
                                        <MapPin className="text-[#8C6EA8]" size={20} />
                                        </div>
                                        <div className="flex-grow">
                                        <p className="text-sm text-gray-500 mb-1">Pays</p>
                                        
                                            <p className="text-gray-700">{user?.pays}</p>
                                        
                                        </div>
                                    </div>

                                    {isEditing && (
                                    <UpdateProfileForm
                                        user={user}
                                        onClose={() => setIsEditing(false)}
                                        onUpdate={(updatedUser) => {
                                        setUser(updatedUser);
                                        setIsEditing(false);
                                        }}
                                    />
                                    )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'favorites' && (
                            <div>
                                <h3 className="text-2xl font-semibold mb-6">Mes Favoris</h3>
                                <div className='h-[calc(100vh-13rem)] overflow-hidden'>
                                    <div className='h-full overflow-y-auto custom-scrollbar pr-4 pb-4'>

                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                                    {userFavorites.length > 0 ? (
                                        userFavorites.map(offre => (
                                            <div key={offre.id} className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                                            <div className="relative overflow-hidden">
                                            <div className="relative">
                                                <img 
                                                    src={offre.image} 
                                                    alt={offre.label} 
                                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="dropdown dropdown-end absolute top-2 right-2 z-30">
                                                    <label 
                                                        tabIndex={0} 
                                                        className="btn btn-ghost btn-circle btn-sm bg-white/80 hover:bg-white"
                                                    >
                                                        <EllipsisVertical size={20} className="text-gray-700" />
                                                    </label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-52">
                                                        <li>
                                                        <button
                                                            onClick={() => handleToggleFavorite(offre)}
                                                            className="text-red-600 hover:text-red-700 font-manrope"
                                                        >
                                                            <Heart size={16} />
                                                            Retirer des favoris
                                                        </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            
                                            <div className="p-6">
                                            <div className="mb-4">
                                                <p className="text-sm text-[#8C6EA8] font-manrope mb-2">{offre.pays.label}</p>
                                                <h4 className="text-xl font-semibold font-griffiths mb-2">{offre.label}</h4>
                                                <p className="text-gray-600 text-sm font-manrope line-clamp-2">{offre.description}</p>
                                            </div>
                                            
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="text-center">
                                                <p className="text-gray-600 text-sm font-manrope">À partir de</p>
                                                <p className="text-gray-500 text-sm font-manrope">par personne</p>
                                                </div>
                                                <div className="h-12 w-0.5 bg-gray-200" />
                                                <div>
                                                <p className="text-[#8C6EA8] text-lg font-semibold font-manrope">
                                                    {offre.price} Dhs
                                                </p>
                                                <p className="text-gray-500 text-sm font-manrope">
                                                    {offre.offreDayNumber} jours / {offre.offreDayNumber - 1} nuits
                                                </p>
                                                </div>
                                            </div>
                                            
                                            <Link 
                                                to={`/offreDetails/${encodeLabel(offre.label)}`} 
                                                className="w-full inline-flex justify-center items-center px-6 py-3 bg-white border-2 border-[#8C6EA8] text-[#8C6EA8] rounded-lg hover:bg-[#8C6EA8] hover:text-white transition-colors duration-300 font-manrope group"
                                            >
                                                Voir l'offre 
                                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                                                    <ChevronRight size={20} />
                                                </span>
                                            </Link>
                                            </div>
                                        </div>
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-center py-8 text-gray-500 font-manrope">
                                        Vous n'avez pas encore de favoris
                                        </div>
                                    )}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            )}

                            {activeTab === 'messages' && (
                                <div>
                                    <div className="text-center text-gray-500">
                                        <Message />
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