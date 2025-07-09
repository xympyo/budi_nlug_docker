import React from "react";
import budiLogo from "./assets/budi_logo.png";
import Orb from "./Components/Orb/Orb.jsx";

function Hero() {
  return (
    <div className="h-dvh w-fit">
      <div className="ms-6 me-6 pt-6 relative h-full w-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-2 md:col-span-1">
            <img src={budiLogo} alt="Budi Logo" className="max-w-full h-auto" />
          </div>
          <div className="col-span-6 md:col-span-9"></div>
          <div className="col-span-4 md:col-span-2">
            <div className="flex justify-center align-middle">
              <p className="poppins-bold text-sm md:text-lg text-[#fbfbfb]">
                Budi Chat NLUG
              </p>
            </div>
          </div>
        </div>
        <div
          className="h-full w-auto absolute left-1/2 top-1/2 z-100"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <Orb hue={360} hoverIntensity={0.5} forceHoverState={true} />
        </div>
        <div
          className="absolute left-1/2 top-1/2 z-100"
          style={{ transform: "translate(-50%,-50%)" }}
        >
          <h1 className="text-center text-lg text-[#fbfbfb] poppins-bold">
            Budi ChatBot
            <br />
            <span className="text-[#54FED5] poppins-regular text-base">
              Brainly, without the #maaf kalau salah
            </span>
          </h1>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => window.scrollToChatBot && window.scrollToChatBot()}
              className="poppins-semibold text-base text-[#1d1d1d] bg-[#fbfbfb] p-1 rounded-lg mt-4"
            >
              Test the ChatBot now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
