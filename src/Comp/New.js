import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Switch } from '@headlessui/react';
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import "../index.css";
import gauge from "./gauge.png";

const constantData = {
  title: "Fear & Greed Index",
  infoText: "When the value is closer to 0, the market is in Extreme Fear, and investors have over-sold irrationally.\n\nWhen the value is closer to 100, the market is in Extreme Greed, indicating a likely market correction.\n\nCoinMarketCap uses the price and trading data of the most popular crypto coins, together with our unique user behaviour data to present a more accurate crypto market sentiment."
};

function New() {
  const [enabled, setEnabled] = useState(true);
  const [enabled2, setEnabled2] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/trending");
        setTrendingData(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };

    fetchTrendingData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: enabled,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: enabled2,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const renderSlide1 = (slide) => {
    if (slide.title === "Trending") {
      return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 h-14">
              <h3 className="font-bold text-lg">🔥 {slide.title}</h3>
              <button className="text-blue-600 hover:underline">More</button>
            </div>
            <ul>
              {slide.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-4">
                  <span className="flex items-center">
                    <img src={item.logo} alt={item.name} className="w-6 h-6 mr-2"/>
                    {index + 1}. {item.name} ({item.symbol})
                  </span>
                  <span className={`${item.quote.USD.percent_change_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.quote.USD.percent_change_24h.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (slide.title === "Advertisement") {
      return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full flex flex-col justify-center">
          <h3 className="font-bold text-lg">{slide.title}</h3>
          <p>{slide.content}</p>
        </div>
      );
    }
    return null;
  };

  const renderSlide2 = (slide) => {
    return (
      <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{slide.title}</h3>
          </div>
          <ul>
            {slide.accounts?.map((account, index) => (
              <li key={index} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={account.icon} alt={account.username} className="w-6 h-6 mr-2"/>
                  <div>
                    <span className="font-bold">{account.username}</span>
                    <span className="text-gray-500"> {account.handle}</span>
                  </div>
                </div>
                {account.follow && <button className="bg-gray-200 text-gray-800 px-2 py-1 rounded">+ Follow</button>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Today's Cryptocurrency Prices by Market Cap</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500 font-bold">Highlights</span>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable carousel</span>
                <span
                  className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
          <p className="mt-4 text-gray-500">
            The global crypto market cap is <span className="text-blue-600">$2.55T</span>, a <span className="text-red-600">2.37%</span> decrease over the last day.
            {!showFullText && (
              <>
                <button
                  onClick={() => setShowFullText(true)}
                  className="text-gray-500 font-bold hover:underline ml-1 underline"
                >
                  Read More
                </button>
              </>
            )}
            {showFullText && (
              <>
                <span> The total crypto market volume over the last 24 hours is <span className="text-blue-600">$97.07B</span>, which makes a <span className="text-green-600">22.24%</span> increase. The total volume in DeFi is currently <span className="text-blue-600">$6.88B</span>, 7.09% of the total crypto market 24-hour volume. The volume of all stable coins is now <span className="text-blue-600">$91.2B</span>, which is 93.96% of the total crypto market 24-hour volume. Bitcoin’s dominance is currently <span className="text-blue-600">52.56%</span>, a decrease of <span className="text-red-600">0.17%</span> over the day.</span>
                <button
                  onClick={() => setShowFullText(false)}
                  className="text-gray-500 font-bold hover:underline ml-1 underline"
                >
                  Read Less
                </button>
              </>
            )}
          </p>
        </div>
      </header>
      {enabled && (
        <div className="container mx-auto px-4 py-8 flex flex-wrap -mx-2">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <Slider {...settings}>
              {[
                {
                  title: "Trending",
                  items: trendingData
                },
                {
                  title: "Advertisement",
                  content: "KUCOIN INDIA: Historic Prosperity Carnival! Participate to Win Prizes Worth Up to INR 50 CRORE!"
                }
              ].map((slide, index) => (
                <div key={index} className="h-full">
                  {renderSlide1(slide)}
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4 ">
            <Slider {...settings2}>
              {[
                {
                  title: "Top Community Accounts",
                  accounts: [
                    { username: "Rekt Capital ✅", handle: "@rektcapital", follow: true, icon: "https://example.com/icon1.png" },
                    { username: "Bankless ✅", handle: "@Banklesshq", follow: true, icon: "https://example.com/icon2.png" },
                    { username: "MMCrypto ✅", handle: "@MMCrypto", follow: true, icon: "https://example.com/icon3.png" }
                  ]
                },
                {
                  title: "Top Community Accounts",
                  accounts: [
                    { username: "Rekt Capital ✅", handle: "@rektcapital", follow: true, icon: "https://example.com/icon1.png" },
                    { username: "Bankless ✅", handle: "@Banklesshq", follow: true, icon: "https://example.com/icon2.png" },
                    { username: "MMCrypto ✅", handle: "@MMCrypto", follow: true, icon: "https://example.com/icon3.png" }
                  ]
                }
              ].map((slide, index) => (
                <div key={index} className="h-full">
                  {renderSlide2(slide)}
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg mr-2">{constantData.title}</h3>
                    <FaInfoCircle 
                      className="text-gray-500 cursor-pointer"
                      onClick={() => setShowInfo(!showInfo)}
                    />
                  </div>
                  <button className="text-blue-600 hover:underline">More</button>
                </div>
                <div className="flex items-center justify-center">
                  <img src={gauge} alt="Fear & Greed Index" className="w-80 h-32" />
                </div>
                {showInfo && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-10">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{constantData.infoText}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default New;
