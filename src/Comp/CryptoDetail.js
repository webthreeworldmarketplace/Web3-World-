import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Chart from "./Chart";
import MarketTable from "./MarketTable";
import CryptoAbout from "./CryptoAbout";
import "../App.css";

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [cryptoDetail, setCryptoDetail] = useState(null);
  const [error, setError] = useState(null);
  const [cryptoAmount, setCryptoAmount] = useState(1);
  const [usdAmount, setUsdAmount] = useState(0);
  const [copyMessage, setCopyMessage] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [activeSection, setActiveSection] = useState("chart");
  const [pricePerformance, setPricePerformance] = useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(null); // New state for active nav item
  const chartRef = useRef(null);
  const marketsRef = useRef(null);
  const newsRef = useRef(null);
  const aboutRef = useRef(null);
  const analyticsRef = useRef(null);
  const similarCoinsRef = useRef(null);

  useEffect(() => {
    const fetchCryptoDetail = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `https://api.webthreeworld.com/api/cryptocurrencies/${id}`
        );
        setCryptoDetail(response.data);

        if (response.data && response.data.data && response.data.data.slug) {
          const slug = response.data.data.slug;
          const performanceResponse = await axios.get(
            `https://api.webthreeworld.com/api/price-performance/${slug}`
          );
          setPricePerformance(performanceResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response ? error.response.data : "An error occurred");
      }
    };

    fetchCryptoDetail();
  }, [id]);

  useEffect(() => {
    const fetchPricePerformance = async () => {
      try {
        const cryptoName = cryptoDetail.data.name.toLowerCase();
        const response = await axios.get(
          `https://api.webthreeworld.com/api/price-performance/${cryptoName}`
        );
        const pricePerformanceData = response.data;
        if (pricePerformanceData) {
          setPricePerformance(pricePerformanceData);
        } else {
          console.log("No price performance data available");
        }
      } catch (error) {
        console.error("Error fetching price performance data:", error);
      }
      console.log("Current pricePerformance state:", pricePerformance);
    };

    if (cryptoDetail && cryptoDetail.data && cryptoDetail.data.name) {
      fetchPricePerformance();
    }
  }, [id]);

  useEffect(() => {
    setIsMainMenuOpen(false);
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const mobileNav = document.querySelector(".mobile-nav");

      if (mobileNav) {
        if (scrollPosition > 90) {
          mobileNav.classList.add("sticky");
          mobileNav.classList.add("scroll-down");
        } else {
          mobileNav.classList.remove("sticky");
          mobileNav.classList.add("scroll-down");
        }

        lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("Crypto Detail Data:", cryptoDetail);

  if (!cryptoDetail) {
    return <div>Loading...</div>;
  }
  const { data } = cryptoDetail;
  if (!data) {
    console.log("Data object is not present in cryptoDetail");
    return <div>Data for this cryptocurrency is not available.</div>;
  }
  const {
    name,
    symbol,
    quote,
    tags,
    circulating_supply,
    total_supply,
    max_supply,
    slug,
    logo,
  } = data;
  if (!quote || !quote.USD) {
    console.log("USD data is not present in quote object");
    return <div>Data for this cryptocurrency is not available.</div>;
  }
  if (!cryptoDetail || !cryptoDetail.data) {
    return <div>Loading...</div>;
  }

  const USD = quote.USD;
  console.log("Quote", cryptoDetail.quote);
  console.log("Crypto Detail Data:", cryptoDetail);

  if (!USD) {
    console.log("USD is not present in quote object");
    return <div>Price data not available for this cryptocurrency.</div>;
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

  const handleCryptoChange = (event) => {
    const cryptoValue = event.target.value;
    setCryptoAmount(cryptoValue);
    setUsdAmount(cryptoValue * USD.price);
  };

  const handleUsdChange = (event) => {
    const usdValue = event.target.value;
    setUsdAmount(usdValue);
    setCryptoAmount(usdValue / USD.price);
  };

  const toggleShowAllTags = () => {
    setShowAllTags((prevShowAllTags) => !prevShowAllTags);
  };

  const toggleNavItem = (item) => {
    setActiveNavItem(activeNavItem === item ? null : item);
  };

  console.log("Rendering CryptoDetail", { cryptoDetail, error });

  const displayedTags = cryptoDetail.data.tags
    ? showAllTags
      ? cryptoDetail.data.tags
      : cryptoDetail.data.tags.slice(0, 3)
    : [];

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row move-down">
      {/* Sidebar for Crypto Details */}
      <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6 md:mr-6 mb-6 md:mb-0">
        <div className="flex items-center mb-2">
          <img
            src={cryptoDetail.data.logo}
            alt={cryptoDetail.data.name}
            className="w-12 h-12 mr-4"
          />
          <div>
            <h3 className="text-2xl font-bold">
              {cryptoDetail.data.name} ({cryptoDetail.data.symbol})
            </h3>
            <p className="text-gray-600">{cryptoDetail.data.slug}</p>
          </div>
        </div>
        <div className="mt-4 ">
          <div className="text-4xl font-bold">
            ${cryptoDetail.data.quote?.USD?.price?.toFixed(2) ?? "N/A"}
            <span className="text-lg text-green-500">
              {" "}
              (
              {USD.percent_change_24h
                ? USD.percent_change_24h.toFixed(2)
                : "N/A"}
              %)
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Last updated:{" "}
            {USD.last_updated
              ? new Date(USD.last_updated).toLocaleString()
              : "N/A"}
          </div>
        </div>
        <div className="mt-6 space-y-4 hide">
          <div className="flex justify-between text-gray-800">
            <span>Market Cap:</span>
            <span>
              ${USD.market_cap ? USD.market_cap.toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Volume (24h):</span>
            <span>
              ${USD.volume_24h ? USD.volume_24h.toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Volume/Market Cap (24h):</span>
            <span>
              {USD.volume_24h && USD.market_cap
                ? (USD.volume_24h / USD.market_cap).toFixed(2)
                : "N/A"}
              %
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Circulating Supply:</span>
            <span>
              $
              {cryptoDetail.data.circulating_supply
                ? cryptoDetail.data.circulating_supply.toLocaleString()
                : "N/A"}{" "}
              {cryptoDetail.data.symbol}
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Total Supply:</span>
            <span>
              $
              {cryptoDetail.data.total_supply
                ? cryptoDetail.data.total_supply.toLocaleString()
                : "N/A"}{" "}
              {cryptoDetail.data.symbol}
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Max Supply:</span>
            <span>
              $
              {cryptoDetail.data.max_supply
                ? cryptoDetail.data.max_supply.toLocaleString()
                : "N/A"}{" "}
              {cryptoDetail.data.symbol}
            </span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span>Fully Diluted Market Cap:</span>
            <span>
              $
              {USD.price && cryptoDetail.data.max_supply
                ? (USD.price * cryptoDetail.data.max_supply).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="mt-6 hide">
          <h4 className="text-xl font-semibold">UCID</h4>
          <div className="flex items-center mt-2">
            <span
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md mr-2 cursor-pointer"
              onClick={() => copyToClipboard("1")}
            >
              1
            </span>
            <span
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md cursor-pointer"
              onClick={() => copyToClipboard("1")}
            >
              📋
            </span>
          </div>
          {copyMessage && (
            <div className="text-green-500 mt-2">{copyMessage}</div>
          )}
        </div>
        <div className="mt-8 hide">
          <h4 className="text-xl font-semibold">Tags</h4>
          <div className="flex flex-wrap gap-2 mt-2 cursor-pointer">
            {cryptoDetail.data.tags ? (
              <>
                {displayedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {cryptoDetail.data.tags.length > 3 && (
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

          <div>
            <div className="mt-4 ">
              <br />
              <h2 className="font-medium text-xl mb-2">Price Performance</h2>
              <br />
              <ul className="space-y-2 mb-4">
                <li className="flex justify-between ">
                  <span>Price:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.price
                      ? pricePerformance.data.price
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Change 24h:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.change_24h
                      ? pricePerformance.data.change_24h
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Market Cap:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.market_cap
                      ? pricePerformance.data.market_cap
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Volume 24h:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.volume_24h
                      ? pricePerformance.data.volume_24h
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Supply:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.supply
                      ? pricePerformance.data.supply
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Max Supply:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.maxSupply
                      ? pricePerformance.data.maxSupply
                      : "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 ">
        <nav className="bg-white shadow-md mb-6 z-10 mobile-nav sticky ">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              <a
                href="#overview"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  toggleNavItem("overview");
                  setActiveSection("overview");
                }}
                className={`mobile-only overview py-4 px-2 ${
                  activeNavItem === "overview"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
              >
                Overview
              </a>
              <a
                href="#chart"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  toggleNavItem("chart");
                  setActiveSection("chart");
                }}
                className={`py-4 px-2 ${
                  activeNavItem === "chart"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
              >
                Chart
              </a>
              <a
                href="#news"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/News"); // Navigate to News component/page
                  toggleNavItem("news");
                  setActiveSection("news");
                }}
                className={`py-4 px-2 ${
                  activeNavItem === "news"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
              >
                News
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                  toggleNavItem("about");
                  setActiveSection("about");
                }}
                className={`py-4 px-2 ${
                  activeNavItem === "about"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : ""
                }`}
              >
                About
              </a>
            </div>
          </div>
        </nav>
        <div
          id="chart"
          ref={chartRef}
          className="pt-12 margintwo chart-container"
        >
          <Chart
            coingeckoId={
              cryptoDetail.data.coingecko_id || cryptoDetail.data.slug
            }
          />
        </div>
        <div className="mt-8 hide nothide hide-on-desktop">
          <h4 className="text-xl font-semibold">Tags</h4>
          <div className="flex flex-wrap gap-2 mt-2 cursor-pointer">
            {cryptoDetail.data.tags ? (
              <>
                {displayedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
                {cryptoDetail.data.tags.length > 3 && (
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

          <div>
            <div className="mt-5 ">
              <br />
              <h2 className="font-medium text-xl mb-2">Price Performance</h2>
              <br />
              <ul className="space-y-2 mb-4">
                <li className="flex justify-between ">
                  <span>Price:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.price
                      ? pricePerformance.data.price
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Change 24h:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.change_24h
                      ? pricePerformance.data.change_24h
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Market Cap:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.market_cap
                      ? pricePerformance.data.market_cap
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Volume 24h:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.volume_24h
                      ? pricePerformance.data.volume_24h
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Supply:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.supply
                      ? pricePerformance.data.supply
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Max Supply:</span>
                  <span className="text-right">
                    $
                    {pricePerformance &&
                    pricePerformance.data &&
                    pricePerformance.data.maxSupply
                      ? pricePerformance.data.maxSupply
                      : "N/A"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="about" ref={aboutRef} className="pt-12 move-about">
          <CryptoAbout
            selectedCrypto={
              cryptoDetail.data.coingecko_id || cryptoDetail.data.slug
            }
          />
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
