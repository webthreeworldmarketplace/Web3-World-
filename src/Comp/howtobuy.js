import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi"; // Import Feather Icons
import Web3world from "./Images/Web3 World.png";

const HowToBuy = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`p-8 font-sans ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6 flex justify-center">
        How to Buy
      </h1>

      <div className="space-y-4">
        <StepCard
          title="Create a wallet"
          description="Download MetaMask or your wallet of choice from the app store or Google Play Store for free. Desktop users, download the Google Chrome extension by going to metamask.io"
          icon="🦊"
          darkMode={darkMode}
        />

        <StepCard
          title="Get some USDT"
          description="Have USDT in your wallet to switch to $W3W. If you don't have any USDT, you can buy directly on MetaMask, transfer from another wallet, or buy on another exchange and send it to your wallet."
          icon="💎"
          darkMode={darkMode}
        />

        <StepCard
          title="Go to PancakeSwap"
          description={
            <>
              Connect to PancakeSwap. Go to{" "}
              <a
                href="https://pancakeswap.finance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                https://pancakeswap.finance/
              </a>{" "}
              in Google Chrome or on the browser inside your MetaMask app.
              Connect your wallet. Paste the $W3W token address into
              PancakeSwap, select W3W, and confirm. When MetaMask prompts you
              for a wallet signature, sign.
            </>
          }
          icon="🥞"
          darkMode={darkMode}
        />

        <SwitchBNBCard
          title="Switch USDT for W3W"
          description="Switch USDT for $W3W. We have minimum taxes as per the market so you don't need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility."
          darkMode={darkMode}
          image={Web3world}
        />
      </div>
    </div>
  );
};

const StepCard = ({ title, description, icon, darkMode }) => (
  <div
    className={`rounded-lg border p-4 ${
      darkMode
        ? "border-white text-white bg-gray-800"
        : "border-black text-black bg-white"
    }`}
  >
    <div className="flex items-center mb-2">
      <span className="text-2xl mr-2">{icon}</span>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <p className="text-sm">{description}</p>
  </div>
);

const SwitchBNBCard = ({ title, description, darkMode, image }) => (
  <div
    className={`rounded-lg border p-4 flex items-center ${
      darkMode
        ? "border-white text-white bg-gray-800"
        : "border-black text-black bg-white"
    }`}
  >
    <img src={image} alt="Web3 World" className="w-9 h-10 mr-4" />
    <div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);

export default HowToBuy;
