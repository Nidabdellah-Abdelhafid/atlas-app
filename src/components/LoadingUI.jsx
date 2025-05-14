import React from 'react';

const LoadingUI = ({ title }) => {
  return (
    <div className="fixed inset-0 bg-[#FFFCF7] z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-[#8C6EA8] border-t-transparent rounded-full animate-spin"></div>
        <h2 className="font-griffiths text-2xl mt-4 text-[#8C6EA8]">Atlas Voyages</h2>
        <p className="font-manrope text-gray-600 mt-2">{title || "Chargement en cours..."}</p>
      </div>
    </div>
  );
};

export default LoadingUI;