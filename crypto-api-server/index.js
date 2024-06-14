const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

// Fetch latest cryptocurrency data
app.get("/api/cryptocurrencies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "739a7599-f525-40da-86d0-ad714d7fc5c5", // Directly using your API key
        },
        params: {
          start: 1,
          limit: 100,
          convert: "USD",
        },
      }
    );

    // Add logo URL to each cryptocurrency object
    response.data.data.forEach((crypto) => {
      crypto.logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`;
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from CoinMarketCap API:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Fetch trending cryptocurrency data based on 24-hour percentage change
app.get("/api/trending", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "2778db1d-7cc9-4e1c-a6c6-ec94b0af1573", // Directly using your API key
        },
        params: {
          start: 1,
          limit: 100,
          convert: "USD",
        },
      }
    );

    // Sort cryptocurrencies by 24-hour percentage change in descending order
    const trendingData = response.data.data.sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h);

    // Add logo URL to each cryptocurrency object
    trendingData.forEach((crypto) => {
      crypto.logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`;
    });

    // Limit the result to top 10 trending cryptocurrencies
    const topTrending = trendingData.slice(0, 10);

    res.json(topTrending);
  } catch (error) {
    console.error("Error fetching trending data from CoinMarketCap API:", error.message);
    res.status(500).json({ error: "Failed to fetch trending data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
