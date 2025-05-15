import React, { useEffect, useState, useRef, useMemo } from "react";

function File() {  
  const stackAreaRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Ellipse_31");
  const isScrolling = useRef(false); // Prevents conflicts between scroll & clicks

  // Section references for Ellipse-based navigation
  const ellipse31Ref = useRef(null);
  const ellipse32Ref = useRef(null);
  const ellipse33Ref = useRef(null);
  const ellipse34Ref = useRef(null);

  const sectionRefs = useMemo(() => ({
    Ellipse_31: ellipse31Ref,
    Ellipse_32: ellipse32Ref,
    Ellipse_33: ellipse33Ref,
    Ellipse_34: ellipse34Ref,
  }), []);

  useEffect(() => {
    const stackArea = stackAreaRef.current;
    const cards = cardsRef.current;

    if (!stackArea || cards.length === 0) return;

    const rotateCards = (index) => {
      let angle = 0;
      cards.forEach((card, i) => {
        if (i < index) {
          card.style.transform = `translateY(-120vh) rotate(0deg)`;
          card.classList.add("away");
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle -= 0;
          card.style.zIndex = cards.length - i;
          card.classList.remove("away");
        }
      });
    };

    // Handle scroll event
    const handleScroll = () => {
      if (isScrolling.current) return; 

      let distance = window.innerHeight * 0.5;
      let topVal = stackArea.getBoundingClientRect().top;
      let index = Math.floor(-1 * (topVal / distance + 1));

      if (index !== activeIndex && index >= 0 && index < cards.length) {
        setActiveIndex(index);
        rotateCards(index);

        // Update the corresponding activeTab based on index
        const tabKeys = Object.keys(sectionRefs);
        if (tabKeys[index]) {
          setActiveTab(tabKeys[index]);
        }
      }
    };

    // Add and remove event listeners
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, sectionRefs]);

  // Handles clicking a button or Ellipse element
  const handleButtonClick = (index, tabId) => {
    setActiveIndex(index);
    setActiveTab(tabId);
    isScrolling.current = true;

    // Animate the cards
    if (cardsRef.current.length > 0) {
      let angle = 0;
      cardsRef.current.forEach((card, i) => {
        if (i < index) {
          card.style.transform = `translateY(-120vh) rotate(0deg)`;
          card.classList.add("away");
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle -= 0;
          card.style.zIndex = cardsRef.current.length - i;
          card.classList.remove("away");
        }
      });
    }

    // Smooth scroll to the selected section
    window.scrollTo({
      top: stackAreaRef.current.offsetTop + index * window.innerHeight * 0.7,
      behavior: "smooth",
    });

    // Allow scroll updates after transition
    setTimeout(() => {
      isScrolling.current = false;
    }, 700);
  };
  
  return (
    <div>
     <div className="h-screen mb-96"></div>
      
      <div className="w-full h-fit hidden md:block" >
      
      <div
        ref={stackAreaRef}
        className="h-fit w-full flex-col  justify-between"
        style={{
          width: "100%",
          height: "400vh",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Left Side: Features & Buttons */}
        <div
          className="text-start items-center justify-center flex sticky top-0 h-[70vh] z-20"
          style={{
            // flexBasis: "50%"
          }}
        >
          {/* Vertical Button Controls */}
          <div className="flex flex-row gap-8">
            <button
              onClick={() => handleButtonClick(0, "Ellipse_31")}
              className={`flex items-center gap-4 transition-all duration-300 ${
                activeTab === "Ellipse_31" ? "text-[#2c9fd9]" : "text-gray-500"
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-[#2c9fd9] flex items-center justify-center ${
                activeTab === "Ellipse_31" ? "bg-[#2c9fd9]" : "bg-white"
              }`}>
                <svg className={`w-6 h-6 ${activeTab === "Ellipse_31" ? "text-white" : "text-[#2c9fd9]"}`} viewBox="0 0 48 42">
                  <path d="M46.181,5.278A1.319,1.319,0,0,0,47.5,3.958V1.319A1.319,1.319,0,0,0,46.181,0H1.319A1.319,1.319,0,0,0,0,1.319V3.958A1.319,1.319,0,0,0,1.319,5.278H2.637V36.944H1.319A1.319,1.319,0,0,0,0,38.264V40.9a1.319,1.319,0,0,0,1.319,1.319H21.111v-6.6a1.323,1.323,0,0,1,1.319-1.319h2.639a1.323,1.323,0,0,1,1.319,1.319v6.6H46.181A1.319,1.319,0,0,0,47.5,40.9V38.264a1.319,1.319,0,0,0-1.319-1.319H44.861V5.278Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-medium">Investour Hospitality</span>
            </button>

            <button
              onClick={() => handleButtonClick(1, "Ellipse_32")}
              className={`flex items-center gap-4 transition-all duration-300 ${
                activeTab === "Ellipse_32" ? "text-[#2c9fd9]" : "text-gray-500"
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-[#2c9fd9] flex items-center justify-center ${
                activeTab === "Ellipse_32" ? "bg-[#2c9fd9]" : "bg-white"
              }`}>
                <svg className={`w-6 h-6 ${activeTab === "Ellipse_32" ? "text-white" : "text-[#2c9fd9]"}`} viewBox="0 0 54 44">
                  <path d="M33.242,43.68c-1.07-2.976-4.9-12.965-6.489-17.1a58.236,58.236,0,0,1-9.536,5.235c-.994,3.475-2.97,10.071-3.926,10.95-1.64,1.512-2.259,1.317-2.512-.758s-1.317-8.786-1.317-8.786-5.87-3.31-7.711-4.257-1.811-1.6.155-2.645c1.146-.605,7.947-.231,11.518.014a58.816,58.816,0,0,1,8.127-7.274C18.252,16.14,10.282,9.083,7.882,7.049,5.775,5.263,8.1,4.885,8.1,4.885a12.521,12.521,0,0,1,4.42-.024c6.853,2.072,17.491,5.615,19.992,6.451l3.155-2.229C48.431.041,51.648,2.042,52.256,2.919s1.366,4.619-11.4,13.663l-3.15,2.235c-.079,2.661-.426,13.986-.844,21.208a12.929,12.929,0,0,1-1.534,4.192s-1.149,2.077-2.085-.538Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-medium">Atlas Voyages</span>
            </button>

            <button
              onClick={() => handleButtonClick(2, "Ellipse_33")}
              className={`flex items-center gap-4 transition-all duration-300 ${
                activeTab === "Ellipse_33" ? "text-[#2c9fd9]" : "text-gray-500"
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-[#2c9fd9] flex items-center justify-center ${
                activeTab === "Ellipse_33" ? "bg-[#2c9fd9]" : "bg-white"
              }`}>
                <svg className={`w-6 h-6 ${activeTab === "Ellipse_33" ? "text-white" : "text-[#2c9fd9]"}`} viewBox="0 0 61 32">
                  <path d="M60.593,26.763l-1.515-11.74A5.716,5.716,0,0,0,53.4,10.1H1.894A1.789,1.789,0,0,0,0,11.994V36.609A1.789,1.789,0,0,0,1.894,38.5H7.953a5.516,5.516,0,0,0,5.3,3.787,5.661,5.661,0,0,0,4.734-2.462A6.02,6.02,0,0,0,22.722,42.1a5.516,5.516,0,0,0,5.3-3.787H42.036a5.6,5.6,0,0,0,10.6,0H58.7a1.789,1.789,0,0,0,1.894-1.894V26.763Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-medium">Atlas Rider</span>
            </button>

            <button
              onClick={() => handleButtonClick(3, "Ellipse_34")}
              className={`flex items-center gap-4 transition-all duration-300 ${
                activeTab === "Ellipse_34" ? "text-[#2c9fd9]" : "text-gray-500"
              }`}
            >
              <div className={`w-12 h-12 rounded-full border-2 border-[#2c9fd9] flex items-center justify-center ${
                activeTab === "Ellipse_34" ? "bg-[#2c9fd9]" : "bg-white"
              }`}>
                <svg className={`w-6 h-6 ${activeTab === "Ellipse_34" ? "text-white" : "text-[#2c9fd9]"}`} viewBox="0 0 59 51">
                  <path d="M23.99,18.939c4.528.011,8.192,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-medium">Fractalite</span>
            </button>
          </div>
        </div>

        {/* Right Side: Cards */}
        <div
          className="text-center flex flex-col items-center justify-center w-full sticky top-20 h-[70vh]"
          style={{
            // flexBasis: "50%"
          }}
        >

          <div
            key={"Ellipse_34"}
            ref={(el) => (cardsRef.current[3] = el)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/Pattern.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "320px 250px",
              // width: "350px",
              // height: "470px",
              borderRadius: 25,
              top: "calc(50% - 100px)",
              right: "calc(50% - 185px)",
              transition: "0.5s ease-in-out",
            }}
            className="cards bg-[#2C9FD9] p-3 md:h-[490px] h-[510px] md:p-8 shadow-lg rounded-[30px] w-full justify-start items-start absolute transition-all duration-500"
          >
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <div className="w-full lg:w-full h-full flex justify-start items-start">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/fractalite_lg.png`}
                    className="w-1/2 md:w-full md:mb-40"
                    alt=""
                  />
                </div>
                <div className="text-start text-white mb-2 lg:ml-5 mt-5 lg:mt-0">
                  <h1 className="text-3xl lg:text-4xl font-bold">Fractalite</h1>
                </div>
              </div>
            </div>
          </div>

          <div
            key={"Ellipse_33"}
            ref={(el) => (cardsRef.current[2] = el)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/Pattern.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "320px 250px",
              // width: "350px",
              // height: "470px",
              borderRadius: 25,
              top: "calc(50% - 100px)",
              right: "calc(50% - 185px)",
              transition: "0.5s ease-in-out",
            }}
            className="cards bg-[#2C9FD9] p-3 md:h-[490px] h-[510px] md:p-8 shadow-lg rounded-[30px] w-full justify-start items-start absolute transition-all duration-500"
          >
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <div className="w-full lg:w-full h-full flex justify-start items-start">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/Atlas-Rider-lg.png`}
                    className="w-1/2 md:w-full md:mb-40"
                    alt=""
                  />
                </div>
                <div className="text-start text-white mb-2 lg:ml-5 mt-5 lg:mt-0">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Atlas Rider
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div
            key={"Ellipse_32"}
            ref={(el) => (cardsRef.current[1] = el)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/Pattern.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "320px 250px",
              // width: "350px",
              // height: "470px",
              borderRadius: 25,
              top: "calc(50% - 100px)",
              right: "calc(50% - 185px)",
              transition: "0.5s ease-in-out",
            }}
            className="cards bg-[#2C9FD9] p-3 md:h-[490px] h-[510px] md:p-8 shadow-lg rounded-[30px] w-full justify-start items-start absolute transition-all duration-500"
          >
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <div className="w-full lg:w-full h-full flex justify-start items-start">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/Logo_AV.png`}
                    className="w-1/2 md:w-full md:mb-40"
                    alt=""
                  />
                </div>
                <div className="text-start text-white mb-2 lg:ml-5 mt-5 lg:mt-0">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Atlas Voyages
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div
            key={"Ellipse_31"}
            ref={(el) => (cardsRef.current[0] = el)}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/Pattern.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right bottom",
              backgroundSize: "320px 250px",
              // width: "350px",
              // height: "470px",
              borderRadius: 25,
              top: "calc(50% - 100px)",
              right: "calc(50% - 185px)",
              transition: "0.5s ease-in-out",
            }}
            className="cards bg-[#2C9FD9] p-3 md:h-[490px] h-[510px] md:p-8 shadow-lg rounded-[30px] w-full justify-start items-start absolute transition-all duration-500"
          >
            <div className="hero">
              <div className="hero-content flex-col lg:flex-row">
                <div className="w-full lg:w-full h-full flex justify-start items-start">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/Investour_Hospitality.png`}
                    className="w-1/2 md:w-full md:mb-60"
                    alt=""
                  />
                </div>
                <div className="text-start text-white mb-2 lg:ml-5 mt-5 lg:mt-0">
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Investour Hospitality
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
     <div className="h-screen mt-96"></div>
    </div>
  );
}

export default File;
