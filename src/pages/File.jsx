import React, { useEffect, useState, useRef } from "react";

function File() {  
  const stackAreaRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(1);
  const isScrolling = useRef(false); 



  const cards = [
    {
      id: 1,
      title: "Investour Hospitality",
      icon: "M46.181,5.278A1.319,1.319,0,0,0,47.5,3.958V1.319A1.319,1.319,0,0,0,46.181,0H1.319A1.319,1.319,0,0,0,0,1.319V3.958A1.319,1.319,0,0,0,1.319,5.278H2.637V36.944H1.319A1.319,1.319,0,0,0,0,38.264V40.9a1.319,1.319,0,0,0,1.319,1.319H21.111v-6.6a1.323,1.323,0,0,1,1.319-1.319h2.639a1.323,1.323,0,0,1,1.319,1.319v6.6H46.181A1.319,1.319,0,0,0,47.5,40.9V38.264a1.319,1.319,0,0,0-1.319-1.319H44.861V5.278Z"
    },
    {
      id: 2,
      title: "Atlas Voyages",
      icon: "M33.242,43.68c-1.07-2.976-4.9-12.965-6.489-17.1a58.236,58.236,0,0,1-9.536,5.235c-.994,3.475-2.97,10.071-3.926,10.95-1.64,1.512-2.259,1.317-2.512-.758s-1.317-8.786-1.317-8.786-5.87-3.31-7.711-4.257-1.811-1.6.155-2.645c1.146-.605,7.947-.231,11.518.014a58.816,58.816,0,0,1,8.127-7.274C18.252,16.14,10.282,9.083,7.882,7.049,5.775,5.263,8.1,4.885,8.1,4.885a12.521,12.521,0,0,1,4.42-.024c6.853,2.072,17.491,5.615,19.992,6.451l3.155-2.229C48.431.041,51.648,2.042,52.256,2.919s1.366,4.619-11.4,13.663l-3.15,2.235c-.079,2.661-.426,13.986-.844,21.208a12.929,12.929,0,0,1-1.534,4.192s-1.149,2.077-2.085-.538Z"
    },
    {
      id: 3,
      title: "Atlas Rider",
      icon: "M60.593,26.763l-1.515-11.74A5.716,5.716,0,0,0,53.4,10.1H1.894A1.789,1.789,0,0,0,0,11.994V36.609A1.789,1.789,0,0,0,1.894,38.5H7.953a5.516,5.516,0,0,0,5.3,3.787,5.661,5.661,0,0,0,4.734-2.462A6.02,6.02,0,0,0,22.722,42.1a5.516,5.516,0,0,0,5.3-3.787H42.036a5.6,5.6,0,0,0,10.6,0H58.7a1.789,1.789,0,0,0,1.894-1.894V26.763Z"
    },
    {
      id: 4,
      title: "Fractalite",
      icon: "M23.99,18.939c4.528.011,8.192,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    },
    {
      id: 5,
      title: "ABdo1",
      icon: "M23.99,18.939c4.528.011,8.197,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    },
    {
      id: 6,
      title: "ABdo2",
      icon: "M23.99,18.939c4.528.011,8.197,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    },
    {
      id: 7,
      title: "ABdo3",
      icon: "M23.99,18.939c4.528.011,8.197,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    },
    {
      id: 8,
      title: "ABdo4",
      icon: "M23.99,18.939c4.528.011,8.197,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    },
    {
      id: 9,
      title: "ABdo5",
      icon: "M23.99,18.939c4.528.011,8.197,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z"
    }
  ];
  
  // Update the CARDS_COUNT
  const CARDS_COUNT = cards.length;
  const rotateCards = (index) => {
    cards.forEach((card, i) => {
      const cardElement = document.getElementById(card.id);
      if (cardElement) {
        if (i < index) {
          cardElement.style.transform = `translateY(-120vh) rotate(0deg)`;
          cardElement.classList.add("away");
        } else {
          cardElement.style.transform = `rotate(0deg)`;
          cardElement.style.zIndex = cards.length - i;
          cardElement.classList.remove("away");
        }
      }
    });
  };
  
  useEffect(() => {
    const stackArea = stackAreaRef.current;
    if (!stackArea) return;
  
    const handleScroll = () => {
      if (isScrolling.current) return;
  
      let distance = window.innerHeight * 0.5;
      let topVal = stackArea.getBoundingClientRect().top;
      let index = Math.floor(-1 * (topVal / distance + 1));
  
      if (index !== activeIndex && index >= 0 && index < cards.length) {
        setActiveIndex(index);
        rotateCards(index);
        
        const currentCard = cards[index]; // Remove reverse
        if (currentCard) {
          setActiveTab(currentCard.id);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, cards.length]);

  // Handles clicking a button or Ellipse element
  const handleButtonClick = (index, tabId) => {
    setActiveIndex(index);
    setActiveTab(tabId);
    isScrolling.current = true;
  
    // Animate the cards
    cards.forEach((card, i) => {
      const cardElement = document.getElementById(card.id);
      if (cardElement) {
        if (i < index) {
          cardElement.style.transform = `translateY(-120vh) rotate(0deg)`;
          cardElement.classList.add("away");
        } else {
          cardElement.style.transform = `rotate(0deg)`;
          cardElement.style.zIndex = cards.length - i; // Fix z-index calculation
          cardElement.classList.remove("away");
        }
      }
    });
  
    window.scrollTo({
      top: stackAreaRef.current.offsetTop + index * window.innerHeight * 0.7,
      behavior: "smooth",
    });
  
    setTimeout(() => {
      isScrolling.current = false;
    }, 700);
  };
  
  return (
    <div>
     <div className="h-screen mb-96"></div>
      
      <div className="w-full h-fit block" >
      
      <div
        ref={stackAreaRef}
        className="h-fit w-full flex-col "
        style={{
          width: "100%",
          height: `${CARDS_COUNT * 100}vh`,
          display: "flex",
          position: "relative",
        }}
      >
        {/* Left Side: Features & Buttons */}
        <div className="sticky top-28 z-30 bg-white shadow-md">
        <div
          className="items-start justify-center flex "
        >
          {/* Vertical Button Controls */}
          <div className="flex flex-row gap-8">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleButtonClick(index, card.id)}
                className={`flex items-center gap-4 transition-all duration-300 ${
                  activeTab === card.id ? "text-[#2c9fd9]" : "text-gray-500"
                }`}
              >
                <div className={`w-12 h-12 rounded-full border-2 border-[#2c9fd9] flex items-center justify-center ${
                  activeTab === card.id ? "bg-[#2c9fd9]" : "bg-white"
                }`}>
                  <svg className={`w-6 h-6 ${activeTab === card.id ? "text-white" : "text-[#2c9fd9]"}`} viewBox="0 0 61 51">
                    <path d={card.icon} fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-lg font-medium">{card.title}</span>
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Right Side: Cards */}
        <div className="text-center flex flex-col items-center justify-start w-full sticky top-48 h-[100vh]">
          {cards.map((card, index) => (
            <div
              key={card.id}
              id={card.id}
              className="cards bg-[#2C9FD9] p-3 md:h-[490px] h-[510px] md:p-8 shadow-lg rounded-[30px] w-96 justify-start items-start absolute transition-all duration-500"
              style={{
                transform: `translateY(${index * 10}px)`,
                zIndex: cards.length - index
              }}
            >
              <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                  <div className="text-start text-white mb-2 lg:ml-5 mt-5 lg:mt-0">
                    <h1 className="text-3xl lg:text-4xl font-bold">{card.title}</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      </div>
     <div className="h-screen mt-96"></div>
    </div>
  );
}

export default File;
