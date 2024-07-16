import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const timeframes = {
  "1D": "1",
  "7D": "7",
  "1M": "30",
  "1Y": "365",
  All: "365", // Adjust "All" to use the maximum allowed range of 365 days
};

const dataTypes = {
  price: "prices",
  marketCap: "market_caps",
};

const CustomTooltip = ({ active, payload, label, dataType }) => {
  if (active && payload && payload.length) {
    if (dataType === "marketCap") {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
          <p className="label">{label}</p>
          <p className="intro">
            Market Cap: ${((payload[0].value) / 1e9).toFixed(2)}B
          </p>
          <p className="desc">
            Vol 24h: ${((payload[0].payload.volume) / 1e9).toFixed(2)}B
          </p>
        </div>
      );
    } else {
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
          <p className="label">{label}</p>
          <p className="intro">Price: ${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
  }
  return null;
};

const Chart = ({ coingeckoId }) => {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("1");
  const [dataType, setDataType] = useState("price");
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        console.log(
          `Fetching data for ${coingeckoId} with timeframe ${timeframe} and dataType ${dataType}`
        );
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart`,
          {
            params: {
              vs_currency: "usd",
              days: timeframe,
            },
          }
        );
        console.log("Chart API response:", response.data);

        let formattedData;
        if (timeframe === "max" || timeframe === "365") {
          formattedData = response.data[dataTypes[dataType]].map(
            (item, index) => ({
              time: new Date(item[0]).toLocaleDateString(),
              value: item[1],
              volume: response.data.total_volumes[index][1],
            })
          );
        } else {
          formattedData = response.data[dataTypes[dataType]].map(
            (item, index) => ({
              time: new Date(item[0]).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              value: item[1],
              volume: response.data.total_volumes[index][1],
            })
          );
        }

        setChartData(formattedData);
        console.log("Formatted chart data:", formattedData);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching chart data:", error);
        if (error.response && error.response.status === 404) {
          setError(`Coin with ID "${coingeckoId}" not found. Please check the ID and try again.`);
        } else if (error.response) {
          setError(`Error ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else {
          setError("An error occurred while fetching data. Please try again later.");
        }
      }
    };

    fetchChartData();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [coingeckoId, timeframe, dataType]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  const minValue = Math.min(...chartData.map((data) => data.value));
  const maxValue = Math.max(...chartData.map((data) => data.value));
  const range = maxValue - minValue;
  const step = range / 4; // Adjusting step for better spacing

  const ticks = [minValue + step, (minValue + maxValue) / 2, maxValue - step];

  return (
    <div className="chart-container px-2 pt-4 md:px-0 md:pt-0 mt-4 relative"> {/* Added padding for mobile */}
      <div className="space-y-2 mt-2 md:-mt-12">
        <div className="flex flex-col items-center sm:items-end space-y-1 mb-2">
          <div className="flex flex-wrap justify-center space-x-2 setmargin">
            <button
              className={`px-3 py-2 text-sm  ${
                dataType === "price"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setDataType("price")}
            >
              Price
            </button>
            <button
              className={`px-2 py-1 text-xs ${
                dataType === "marketCap"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setDataType("marketCap")}
            >
              Market Cap
            </button>
          </div>
          <div className="flex flex-wrap justify-center space-x-1 setmargin">
            {Object.keys(timeframes).map((key) => (
              <button
                key={key}
                className={`px-3 py-1 ${
                  timeframe === timeframes[key]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setTimeframe(timeframes[key])}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <AreaChart
            data={chartData}
            margin={{
              top: 4,
              right: 20,
              left: -10, // Adjusted left margin to shift chart further left
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickFormatter={(tick, index) => {
                const interval = Math.max(Math.floor(chartData.length / 8), 1);
                if (index % interval === 0) {
                  return tick;
                }
                return "";
              }}
            />
            <YAxis domain={[minValue, maxValue]} ticks={ticks} tick={isMobile ? false : null} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip dataType={dataType} />} />
            <ReferenceLine y={61000} label="Current Price" stroke="red" />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
