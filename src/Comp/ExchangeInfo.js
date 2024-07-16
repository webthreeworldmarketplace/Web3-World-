import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const ExchangeInfo = () => {
  const [activeButton, setActiveButton] = useState("Spot");
  const [exchanges, setExchanges] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allExchanges, setAllExchanges] = useState([]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // Define fetchExchanges function
  const fetchAllExchanges = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      const exchangesData = response.data;
      setAllExchanges(exchangesData);
      setLoading(false);
      console.log("Fetched all exchanges data:", exchangesData);
    } catch (error) {
      console.error("Error fetching exchange data:", error);
      setLoading(false);
    }
  };

  const loadMoreExchanges = () => {
    const start = page * 30;
    const end = start + 30;
    setExchanges((prevExchanges) => [
      ...prevExchanges,
      ...allExchanges.slice(start, end),
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  // UseEffect for initial fetch
  useEffect(() => {
    fetchAllExchanges();
  }, []);

  // UseEffect for initial load of exchanges
  useEffect(() => {
    if (allExchanges.length > 0) {
      setExchanges(allExchanges.slice(0, 30));
    }
  }, [allExchanges]);

  return (
    <>
      <div className="container mx-auto px-4 py-6 sm:px-8 sm:py-8">
        <h1 className="text-3xl font-bold">
          Top Cryptocurrency Spot Exchanges
        </h1>
        <p className="mt-4 text-gray-600">
          Join our centralized trading platform and stay informed! Sign up now
          to receive 1000 W3W tokens free!
        </p>
        <p className="font-bold">Start trading like a pro!</p>
      </div>
      <br />
      <div className="flex space-x-2 button-group">
        <div>
          <button
            className={`px-3 py-2 rounded-full text-xs font-bold ${
              activeButton === "Spot"
                ? "bg-gray-100 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => handleButtonClick("Spot")}
          >
            <span className="inline-block mr-1"></span>
            Spot
          </button>
        </div>
      </div>
      
      {exchanges.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 exchange-table ">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="pl-4  pr-2  lg:pl-80 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="pr-4 lg:pr-70 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Exchanges
                </th>
                <th className="pr-4 lg:pr-70 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider ">
                  Trading Volume (24h)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exchanges.map((exchange, index) => (
                <tr
                  key={exchange.id}
                  onClick={() => window.open(exchange.url, "_blank")}
                  className="cursor-pointer "
                >
                  <td className="md:pl-80 sm:pl-80 py-2">{index + 1}</td>
                  <td className="pr-5 py-2 flex items-center">
                    <img
                      src={exchange.image}
                      alt={`${exchange.name} logo`}
                      className="w-8 h-8 mr-2"
                    />
                    {exchange.name}
                  </td>
                  <td className="pr-60  py-2 trading-wider">
                    
                    {exchange.trade_volume_24h_btc.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} BTC
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Load More button */}
          <div className="mt-4 flex justify-center">
            {exchanges.length < allExchanges.length && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={loadMoreExchanges}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading exchange data...</p>
      )}
    </>
  );
};

export default ExchangeInfo;
