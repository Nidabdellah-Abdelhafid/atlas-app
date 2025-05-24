import React from 'react';
import { HeartIcon } from 'lucide-react';

const FavoriteButton = ({ offer, authUser, onToggleFavorite, isLoading }) => {
  const isFavorited = offer?.usersFvrOffre?.some(u => u.id === authUser?.id);

  return (
    <button
      onClick={() => onToggleFavorite(offer)}
      className="btn btn-ghost btn-circle tooltip tooltip-bottom"
      data-tip={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <HeartIcon
          size={30}
          className={`transform transition-transform duration-200 ease-in-out hover:scale-125 ${
            isFavorited ? 'text-[#f55656] fill-[#f55656]' : 'hover:text-[#f55656]'
          }`}
        />
      )}
    </button>
  );
};
  
  export default FavoriteButton;