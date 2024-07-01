import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "./Chart";
import CryptoAbout from "./CryptoAbout";

const CryptoDetail = () => {
  const { id } = useParams();
  const [cryptoDetail, setCryptoDetail] = useState(null);
  const [error, setError] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [activeSection, setActiveSection] = useState("chart");
  const [showDropdown, setShowDropdown] = useState(false);
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(0);
  const [pricePerformance, setPricePerformance] = useState(null); // New state for price performance

  const chartRef = useRef(null);
  const newsRef = useRef(null);
  const aboutRef = useRef(null);
  const analyticsRef = useRef(null);
  const similarCoinsRef = useRef(null);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      try {
        const response = await axios.get(
          `https://newcrpto-2.onrender.com/api/cryptocurrencies/${id}`
        );
        setCryptoDetail(response.data);
        setUsdAmount(response.data.quote.USD.price); // Initialize the USD amount
        console.log("CryptoDetail data:", response.data);

        // Fetch price performance data using the slug or name
        const slugOrName = response.data.slug || response.data.name.toLowerCase();
        fetchPricePerformance(slugOrName);
      } catch (error) {
        setError(error.response ? error.response.data : "An error occurred");
      }
    };

    fetchCryptoDetail();
  }, [id]);

  const fetchPricePerformance = async (slugOrName) => {
    try {
      const response = await axios.get(
        `https://newcrpto-2.onrender.com/api/price-performance/${slugOrName}`
      );
      setPricePerformance(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: chartRef, name: "chart" },
        { ref: newsRef, name: "news" },
        { ref: aboutRef, name: "about" },
        { ref: analyticsRef, name: "analytics" },
        { ref: similarCoinsRef, name: "similar-coins" },
      ];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (offsetTop <= scrollPosition && offsetTop + offsetHeight > scrollPosition) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!cryptoDetail) {
    return <div>Loading...</div>;
  }

  const USD = cryptoDetail.quote ? cryptoDetail.quote.USD : null;
  if (!USD) {
    return <div>Data for this cryptocurrency is not available.</div>;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyMessage("Copied to clipboard!");
        setTimeout(() => {
          setCopyMessage("");
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const toggleShowAllTags = () => {
    setShowAllTags((prevShowAllTags) => !prevShowAllTags);
  };

  const displayedTags = cryptoDetail.tags ? (showAllTags ? cryptoDetail.tags : cryptoDetail.tags.slice(0, 3)) : [];

  const chainExplorers = cryptoDetail.chain_explorers || [
    "https://blockchain.info",
    "https://live.blockcypher.com",
    "https://blockchair.com",
    "https://explorer.viabtc.com",
    "https://www.okx.com"
  ];

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleCryptoAmountChange = (event) => {
    const amount = event.target.value;
    setCryptoAmount(amount);
    setUsdAmount(amount * USD.price);
  };

  return (
    <div className="container mx-auto px-4 py-6 flex">
      {/* Sidebar for Crypto Details */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 mr-6">
        <div className="flex items-center">
          <img
            src={cryptoDetail.logo}
            alt={cryptoDetail.name}
            className="w-12 h-12 mr-4"
          />
          <div>
            <h3 className="text-2xl font-bold">
              {cryptoDetail.name} ({cryptoDetail.symbol})
            </h3>
            <p className="text-gray-600">{cryptoDetail.slug}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold">
            ${USD.price ? USD.price.toFixed(2) : "N/A"}
            <span className="text-lg text-green-500">
              {" "}
              ({USD.percent_change_24h ? USD.percent_change_24h.toFixed(2) : "N/A"}%)
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Last updated:{" "}
            {USD.last_updated
              ? new Date(USD.last_updated).toLocaleString()
              : "N/A"}
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-gray-800">
            <span>Market Cap:</span>
            <span>${USD.market_cap ? USD.market_cap.toLocaleString() : "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Volume (24h):</span>
            <span>${USD.volume_24h ? USD.volume_24h.toLocaleString() : "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Volume/Market Cap (24h):</span>
            <span>{USD.volume_24h && USD.market_cap ? (USD.volume_24h / USD.market_cap).toFixed(2) : "N/A"}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Circulating Supply:</span>
            <span>{cryptoDetail.circulating_supply ? cryptoDetail.circulating_supply.toLocaleString() : "N/A"} {cryptoDetail.symbol}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Total Supply:</span>
            <span>{cryptoDetail.total_supply ? cryptoDetail.total_supply.toLocaleString() : "N/A"} {cryptoDetail.symbol}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Max Supply:</span>
            <span>{cryptoDetail.max_supply ? cryptoDetail.max_supply.toLocaleString() : "N/A"} {cryptoDetail.symbol}</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Fully Diluted Market Cap:</span>
            <span>${USD.price && cryptoDetail.max_supply ? (USD.price * cryptoDetail.max_supply).toLocaleString() : "N/A"}</span>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-semibold">UCID</h4>
          <div className="flex items-center mt-2">
            <span
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 cursor-pointer"
              onClick={() => copyToClipboard("1")}
            >
              1
            </span>
            <span className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer" onClick={() => copyToClipboard("1")}>
              📋
            </span>
          </div>
          {copyMessage && <div className="text-green-500 mt-2">{copyMessage}</div>}
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">Tags</h4>
          <div className="flex flex-wrap gap-2 mt-2 cursor-pointer">
            {cryptoDetail.tags ? (
              <>
                {displayedTags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md">{tag}</span>
                ))}
                {cryptoDetail.tags.length > 3 && (
                  <button
                    onClick={toggleShowAllTags}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md"
                  >
                    {showAllTags ? "Show Less" : "Show All"}
                  </button>
                )}
              </>
            ) : (
              <span className="text-gray-800">No tags available</span>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">Chain Explorers</h4>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={toggleDropdown}
              >
                Explore
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {showDropdown && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  {chainExplorers.length > 0 ? (
                    chainExplorers.map((explorer, index) => (
                      <a
                        key={index}
                        href={explorer}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {explorer}
                      </a>
                    ))
                  ) : (
                    <div className="block px-4 py-2 text-sm text-gray-700">
                      No chain explorers available
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">{cryptoDetail.name} to USD Converter</h4>
          <div className="flex items-center mt-2">
            <input
              type="number"
              value={cryptoAmount}
              onChange={handleCryptoAmountChange}
              className="px-3 py-2 border border-gray-300 rounded-md mr-2"
              min="0"
            />
            <span className="text-gray-800">{cryptoDetail.symbol}</span>
          </div>
          <div className="mt-2 text-gray-800">
            ${usdAmount ? usdAmount.toFixed(2) : "N/A"} USD
          </div>
        </div>
        <br/>
        <h1 className="font-bold">Price Performance</h1>
        {pricePerformance && (
          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-gray-800">
              <span>Price:</span>
              <span>${pricePerformance.price}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span>Change (24h):</span>
              <span>{pricePerformance.change_24h}%</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span>Market Cap:</span>
              <span>${pricePerformance.market_cap}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span>Volume (24h):</span>
              <span>${pricePerformance.volume_24h}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span>Supply:</span>
              <span>{pricePerformance.supply} {cryptoDetail.symbol}</span>
            </div>
            <div className="flex justify-between text-gray-800">
              <span>Max Supply:</span>
              <span>{pricePerformance.maxSupply} {cryptoDetail.symbol}</span>
            </div>
          </div>
        )}
      </div>
      <div className="w-2/3">
        <nav className="bg-white shadow-md mb-6 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <a href="#chart" className={`py-4 px-2 ${activeSection === "chart" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>Chart</a>
              <a href="#news" className={`py-4 px-2 ${activeSection === "news" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>News</a>
              <a href="#about" className={`py-4 px-2 ${activeSection === "about" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}>About</a>
            </div>
          </div>
        </nav>
        <div id="chart" ref={chartRef} className="pt-12">
          <Chart coingeckoId={cryptoDetail.coingecko_id || cryptoDetail.slug} />
        </div>
        <div id="news" ref={newsRef} className="pt-12">
          {/* News Component */}
        </div>
        <div id="about" ref={aboutRef} className="pt-12">
          <CryptoAbout selectedCrypto={cryptoDetail.coingecko_id || cryptoDetail.slug} />
        </div>
        <div id="analytics" ref={analyticsRef} className="pt-12">
          {/* Analytics Component */}
        </div>
        <div id="similar-coins" ref={similarCoinsRef} className="pt-12">
          {/* Similar Coins Component */}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetail;
