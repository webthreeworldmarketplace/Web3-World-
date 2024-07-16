import React, { useEffect, useState } from "react";
import axios from "axios";

const MarketTable = ({ id }) => {
  const [marketData, setMarketData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/tickers`
        );
        console.log('API response:', response); // Log the entire response
        if (response.data && response.data.tickers) {
          setMarketData(response.data.tickers);
          setError(null);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching market data:", error); // Detailed log
        if (error.response) {
          console.error('Error response:', error.response); // Log the error response
          if (error.response.data && error.response.data.error === "coin not found") {
            setError(`Coin with ID "${id}" not found. Please check the ID and try again.`);
          } else {
            setError(error.response.data.error || "An error occurred while fetching market data. Please try again later.");
          }
        } else {
          setError("An error occurred while fetching market data. Please try again later.");
        }
        setMarketData([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMarketData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading market data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (marketData.length === 0) {
    return <div>No market data available for this coin.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Markets</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Exchange</th>
            <th className="py-2 px-4 border-b">Pair</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {marketData.map((ticker, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{ticker.market.name}</td>
              <td className="py-2 px-4 border-b">{ticker.base}/{ticker.target}</td>
              <td className="py-2 px-4 border-b">${parseFloat(ticker.last).toFixed(2)}</td>
              <td className="py-2 px-4 border-b">${parseFloat(ticker.volume).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
