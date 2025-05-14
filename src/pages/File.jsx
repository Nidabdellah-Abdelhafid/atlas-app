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
      
      <div className="w-full h-fit hidden md:block" >
      
      <div
        ref={stackAreaRef}
        className="h-fit w-full flex-col md:flex-row justify-between"
        style={{
          width: "100%",
          height: "300vh",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Left Side: Features & Buttons */}
        <div
          className="text-start items-center justify-center flex sticky top-0 h-[70vh]"
          style={{
            flexBasis: "50%"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="800"
            height="900"
            viewBox="0 0 1400 1750"
            className="ml-[-550px]"
          >
            <defs>
              <clipPath id="clipPath">
                <circle
                  id="Ellipse_27"
                  data-name="Ellipse 27"
                  cx="443.5"
                  cy="443.5"
                  r="443.5"
                  transform="translate(-295 2495)"
                  fill="#2c9fd9"
                />
              </clipPath>
              <clipPath id="clipPath-2">
                <path
                  id="Icon_Investour"
                  data-name="Icon Investour"
                  d="M.428,176.4c3.058-17.071,18.517-49.62,30.1-62.521,16.849-18.758,63.077-42.076,85.69-53.271,27.748-13.735,86.061-35.347,115.792-44,19.3-5.616,58.851-19.055,78.739-16.219C449.157,20.2,597.516,158.627,692.474,400.628,792.011,654.344,592.9,881.165,405.32,1050.21c0,0,.779-423.02-172.53-587.061C95.756,333.492,49.158,282.649,9.7,220.406,3.671,210.916-1.556,187.469.428,176.4Z"
                  transform="translate(65.118 3529.867) rotate(-140)"
                  fill="#234d64"
                />
              </clipPath>
              <image
                id="image"
                width="1287"
                height="965"
                href={`${process.env.PUBLIC_URL}/image/bg-svg.png`}
              />
            </defs>
            <g
              id="Groupe_187"
              data-name="Groupe 187"
              transform="translate(4227.861 -2573)"
            >
              <g
                id="Groupe_de_masques_20"
                data-name="Groupe de masques 20"
                transform="translate(-3768.5 815)"
                clipPath="url(#clipPath)"
              >
                <use
                  id="Image_22"
                  data-name="Image 22"
                  transform="translate(-279 2417)"
                  href="#image"
                />
              </g>
              <g
                id="Ellipse_28"
                data-name="Ellipse 28"
                transform="translate(-4169.183 3204.317)"
                fill="none"
                stroke="#2c9fd9"
                strokeWidth="2"
              >
                <circle cx="549.183" cy="549.183" r="549.183" stroke="none" />
                <circle cx="549.183" cy="549.183" r="548.183" fill="none" />
              </g>
              <circle
                id="Ellipse_29"
                data-name="Ellipse 29"
                cx="443.5"
                cy="443.5"
                r="443.5"
                transform="translate(-4063.5 3310)"
                fill="#2c9fd9"
                style={{ mixBlendMode: "screen" }}
              />
              <g
                id="Ellipse_30"
                data-name="Ellipse 30"
                transform="translate(-3990.5 3364)"
                fill="none"
                stroke="#fff"
                strokeWidth="20"
                style={{ mixBlendMode: "screen" }}
              >
                <circle cx="389.5" cy="389.5" r="389.5" stroke="none" />
                <circle cx="389.5" cy="389.5" r="379.5" fill="none" />
              </g>
              <g
                id="Groupe_de_masques_21"
                data-name="Groupe de masques 21"
                transform="translate(-3742.18 772.816)"
                clipPath="url(#clipPath-2)"
              >
                <use
                  id="Image_23"
                  data-name="Image 23"
                  transform="translate(-300.057 2461.065)"
                  href="#image"
                />
              </g>
              <g
                id="Ellipse_31"
                ref={sectionRefs.Ellipse_31}
                data-name="Ellipse 31"
                transform="translate(-3157 3525)"
                fill={activeTab === "Ellipse_31" ? "#2c9fd9" : "#f5f5f5"}
                onClick={() => handleButtonClick(0, "Ellipse_31")}
                style={{ cursor: "pointer" }}
                stroke="#2c9fd9"
                strokeWidth="2"
              >
                <circle cx="47.5" cy="47.5" r="47.5" stroke="none" />
                <circle cx="47.5" cy="47.5" r="46.5" fill="none" />
              </g>

              <g
                id="Ellipse_32"
                ref={sectionRefs.Ellipse_32}
                data-name="Ellipse 32"
                transform="translate(-3118 3707)"
                fill={activeTab === "Ellipse_32" ? "#2c9fd9" : "#f5f5f5"}
                onClick={() => handleButtonClick(1, "Ellipse_32")}
                style={{ cursor: "pointer" }}
                stroke="#2c9fd9"
                strokeWidth="2"
              >
                <circle cx="47.5" cy="47.5" r="47.5" stroke="none" />
                <circle cx="47.5" cy="47.5" r="46.5" fill="none" />
              </g>
              <g
                id="Ellipse_33"
                ref={sectionRefs.Ellipse_33}
                data-name="Ellipse 33"
                transform="translate(-3157 3889)"
                fill={activeTab === "Ellipse_33" ? "#2c9fd9" : "#f5f5f5"}
                onClick={() => handleButtonClick(2, "Ellipse_33")}
                style={{ cursor: "pointer" }}
                stroke="#2c9fd9"
                strokeWidth="2"
              >
                <circle cx="47.5" cy="47.5" r="47.5" stroke="none" />
                <circle cx="47.5" cy="47.5" r="46.5" fill="none" />
              </g>
              <g
                id="Ellipse_34"
                ref={sectionRefs.Ellipse_34}
                fill={activeTab === "Ellipse_34" ? "#2c9fd9" : "#f5f5f5"}
                onClick={() => handleButtonClick(3, "Ellipse_34")}
                style={{ cursor: "pointer" }}
                data-name="Ellipse 34"
                transform="translate(-3259 4071)"
                stroke="#2c9fd9"
                strokeWidth="2"
              >
                <circle cx="47.5" cy="47.5" r="47.5" stroke="none" />
                <circle cx="47.5" cy="47.5" r="46.5" fill="none" />
              </g>
              <path
                id="aircraft-svgrepo-com"
                d="M33.242,43.68c-1.07-2.976-4.9-12.965-6.489-17.1a58.236,58.236,0,0,1-9.536,5.235c-.994,3.475-2.97,10.071-3.926,10.95-1.64,1.512-2.259,1.317-2.512-.758s-1.317-8.786-1.317-8.786-5.87-3.31-7.711-4.257-1.811-1.6.155-2.645c1.146-.605,7.947-.231,11.518.014a58.816,58.816,0,0,1,8.127-7.274C18.252,16.14,10.282,9.083,7.882,7.049,5.775,5.263,8.1,4.885,8.1,4.885a12.521,12.521,0,0,1,4.42-.024c6.853,2.072,17.491,5.615,19.992,6.451l3.155-2.229C48.431.041,51.648,2.042,52.256,2.919s1.366,4.619-11.4,13.663l-3.15,2.235c-.079,2.661-.426,13.986-.844,21.208a12.929,12.929,0,0,1-1.534,4.192s-1.149,2.077-2.085-.538Z"
                transform="translate(-3097.4 3730.9)"
                fill={activeTab === "Ellipse_32" ? "#fff" : "#2c9fd9"}
                onClick={() => handleButtonClick(1, "Ellipse_32")}
                style={{ cursor: "pointer" }}
              />
              <path
                id="hotel-svgrepo-com"
                d="M46.181,5.278A1.319,1.319,0,0,0,47.5,3.958V1.319A1.319,1.319,0,0,0,46.181,0H1.319A1.319,1.319,0,0,0,0,1.319V3.958A1.319,1.319,0,0,0,1.319,5.278H2.637V36.944H1.319A1.319,1.319,0,0,0,0,38.264V40.9a1.319,1.319,0,0,0,1.319,1.319H21.111v-6.6a1.323,1.323,0,0,1,1.319-1.319h2.639a1.323,1.323,0,0,1,1.319,1.319v6.6H46.181A1.319,1.319,0,0,0,47.5,40.9V38.264a1.319,1.319,0,0,0-1.319-1.319H44.861V5.278ZM21.111,8.972a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056v3.167a1.135,1.135,0,0,1-1.056,1.056H22.167a1.135,1.135,0,0,1-1.056-1.056V8.972Zm0,7.917a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056v3.167a1.135,1.135,0,0,1-1.056,1.056H22.167a1.135,1.135,0,0,1-1.056-1.056V16.889ZM10.556,8.972a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056v3.167a1.135,1.135,0,0,1-1.056,1.056H11.611a1.135,1.135,0,0,1-1.056-1.056V8.972Zm4.222,12.139H11.611a1.135,1.135,0,0,1-1.056-1.056V16.889a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056v3.167a1.135,1.135,0,0,1-1.056,1.056Zm1.056,10.556a7.917,7.917,0,0,1,15.833,0ZM36.944,20.056a1.135,1.135,0,0,1-1.056,1.056H32.722a1.135,1.135,0,0,1-1.056-1.056V16.889a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056Zm0-7.917a1.135,1.135,0,0,1-1.056,1.056H32.722a1.135,1.135,0,0,1-1.056-1.056V8.972a1.135,1.135,0,0,1,1.056-1.056h3.167a1.135,1.135,0,0,1,1.056,1.056Z"
                transform="translate(-3133 3551)"
                fill={activeTab === "Ellipse_31" ? "#fff" : "#2c9fd9"}
                onClick={() => handleButtonClick(0, "Ellipse_31")}
                style={{ cursor: "pointer" }}
              />
              <g
                id="Groupe_186"
                fill={activeTab === "Ellipse_34" ? "#2c9fd9" : "#f5f5f5"}
                onClick={() => handleButtonClick(3, "Ellipse_34")}
                style={{ cursor: "pointer" }}
                data-name="Groupe 186"
                transform="translate(-3241 4092)"
              >
                <path
                  id="tech-icon"
                  d="M23.99,18.939c4.528.011,8.192,3.21,8.185,7.739a8.2,8.2,0,1,1-14-5.82c1.543-1.539,3.634-1.923,5.813-1.918ZM43.628,44.946V40.779h-11.4a21.024,21.024,0,0,0,2.695-2.948H45.095A1.476,1.476,0,0,1,46.566,39.3v5.648a4.3,4.3,0,1,1-2.938,0ZM42.6,14.706H36.079a21.4,21.4,0,0,0-2.155-2.943h7.21V8.418a4.3,4.3,0,1,1,2.938-.029v4.85A1.467,1.467,0,0,1,42.6,14.706ZM58.712,7.2a4.3,4.3,0,1,0-6.044,3.942v8.6H38.281a20.736,20.736,0,0,1,.607,2.943H54.135A1.476,1.476,0,0,0,55.6,21.213V11.342A4.3,4.3,0,0,0,58.712,7.2ZM58.64,31.056a4.3,4.3,0,0,0-8.357-1.472H38.645a20.107,20.107,0,0,1-.831,2.938H50.284a4.3,4.3,0,0,0,8.357-1.467ZM23.68,50.345h-1.7a2.929,2.929,0,0,1-2.924-2.919V44.434a18.209,18.209,0,0,1-4.778-1.806l-2,2a2.929,2.929,0,0,1-4.133,0L5.734,42.194a2.934,2.934,0,0,1,0-4.133l1.82-1.82A18.156,18.156,0,0,1,5.418,31.3H2.924A2.929,2.929,0,0,1,0,28.385v-3.44a2.929,2.929,0,0,1,2.924-2.934H5.37a18.156,18.156,0,0,1,2.121-4.988L5.734,15.265a2.934,2.934,0,0,1,0-4.128L8.166,8.7a2.929,2.929,0,0,1,4.133,0l1.911,1.911a18.157,18.157,0,0,1,4.84-1.849V5.9a2.929,2.929,0,0,1,2.929-2.915h3.435a2.929,2.929,0,0,1,2.905,2.781v9.785a11.725,11.725,0,0,0-4.028-.707H23.073a11.757,11.757,0,1,0,0,23.515c.2,0,.406,0,.607,0h.612a11.725,11.725,0,0,0,4.028-.707v9.914A2.929,2.929,0,0,1,25.4,50.345Z"
                  transform="translate(0 -0.062)"
                  fill={activeTab === "Ellipse_34" ? "#fff" : "#2c9fd9"}
                  fillRule="evenodd"
                />
              </g>
              <path
                id="transport-bus-svgrepo-com"
                d="M60.593,26.763l-1.515-11.74A5.716,5.716,0,0,0,53.4,10.1H1.894A1.789,1.789,0,0,0,0,11.994V36.609A1.789,1.789,0,0,0,1.894,38.5H7.953a5.516,5.516,0,0,0,5.3,3.787,5.661,5.661,0,0,0,4.734-2.462A6.02,6.02,0,0,0,22.722,42.1a5.516,5.516,0,0,0,5.3-3.787H42.036a5.6,5.6,0,0,0,10.6,0H58.7a1.789,1.789,0,0,0,1.894-1.894V26.763ZM53.4,13.7a2.014,2.014,0,0,1,1.894,1.7l1.136,9.657H54.533A10.725,10.725,0,0,1,46.77,21.84a1.719,1.719,0,0,0-1.325-.568H3.787V13.7ZM13.255,38.313a1.789,1.789,0,0,1-1.894-1.894h0a1.789,1.789,0,0,1,1.894-1.894,1.894,1.894,0,0,1,0,3.787Zm9.468,0a1.894,1.894,0,1,1,1.894-1.894A1.789,1.789,0,0,1,22.722,38.313Zm24.616,0a1.894,1.894,0,1,1,1.894-1.894A1.789,1.789,0,0,1,47.338,38.313Z"
                transform="translate(-3140 3909.9)"
                fill={activeTab === "Ellipse_33" ? "#fff" : "#2c9fd9"}
                onClick={() => handleButtonClick(2, "Ellipse_33")}
                style={{ cursor: "pointer" }}
              />
            </g>
          </svg>
        </div>

        {/* Right Side: Cards */}
        <div
          className="text-start flex flex-col items-center w-full md:w-1/2 sticky top-0 h-[70vh]"
          style={{
            flexBasis: "50%"
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#2C9FD9] text-center md:text-left ml-[-165px]">
            Un opérateur Touristique Intégré <br />
          </h1>

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
     
    </div>
  );
}

export default File;
