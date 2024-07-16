import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsItems, setNewsItems] = useState([]);
  const mainNewsRef = useRef(null);
  const shortNewsRef = useRef(null);

  useEffect(() => {
    fetchNewsData();
  }, []);

  useEffect(() => {
    // Scroll to mainNewsRef when selectedNews changes
    if (selectedNews !== null && mainNewsRef.current) {
      mainNewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedNews]);

  useEffect(() => {
    // Calculate and set dynamic height for short news section initially
    calculateShortNewsHeight();

    // Recalculate short news section height on window resize
    window.addEventListener("resize", calculateShortNewsHeight);

    return () => {
      window.removeEventListener("resize", calculateShortNewsHeight);
    };
  }, [selectedNews]);

  const calculateShortNewsHeight = () => {
    if (mainNewsRef.current && shortNewsRef.current) {
      const mainNewsHeight = mainNewsRef.current.clientHeight;
      shortNewsRef.current.style.height = `${mainNewsHeight}px`;

      // Check if short news content exceeds main news height to add scrollability
      const shortNewsContentHeight = shortNewsRef.current.scrollHeight;
      if (shortNewsContentHeight > mainNewsHeight) {
        shortNewsRef.current.style.overflowY = "auto";
      } else {
        shortNewsRef.current.style.overflowY = "hidden";
      }
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("https://w3w.onrender.com/get"); // Replace with your backend API URL
      let fetchedNewsItems = response.data;

      // Sort news items by date in descending order
      fetchedNewsItems.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Select the last 10 news items and reverse their order
      const lastTenNews = fetchedNewsItems.slice(0, 10).reverse();

      setNewsItems(lastTenNews);

      // Always select the first item (latest news) in newsItems
      setSelectedNews(0); // Select the most recent news
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const handleNewsClick = (index) => {
    setSelectedNews(index);
  };

  const handleShortNewsClick = (index) => {
    setSelectedNews(index);
    mainNewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const shortNewsItems = newsItems.map((item, index) => {
    if (index === selectedNews) {
      return null; // Skip rendering selected news item in short news panel
    }

    return (
      <li key={index} className="mb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            <a
              href="#"
              className="hover:text-blue-500"
              onClick={() => handleShortNewsClick(index)}
            >
              {item.title}
            </a>
          </h3>
          <div className="mb-2">
            <a href="#" onClick={() => handleShortNewsClick(index)}>
              <img
                src={item.url}
                alt={`Short News Image ${index + 1}`}
                className="w-full h-auto rounded-lg object-cover"
                style={{ maxHeight: "200px" }} // Adjust max height as needed
              />
            </a>
          </div>
          <p className="text-sm text-gray-600 mb-2">{item.date}</p>
          <a
            href="#"
            className="text-sm text-blue-500 hover:underline"
            onClick={() => handleShortNewsClick(index)}
          >
            Read More
          </a>
        </div>
      </li>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main News Section */}
      <div className="lg:w-4/5 flex-shrink-0 mt-4 mb-4 overflow-hidden">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md h-full">
          <div ref={mainNewsRef} className="max-h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-2 text-gray-800 p-6">
              {newsItems[selectedNews]?.title || "Loading..."}
            </h1>
            <div className="flex justify-center items-center mt-2">
              {selectedNews !== null ? (
                <img
                  src={newsItems[selectedNews]?.url}
                  alt={`Short News Image ${selectedNews + 1}`}
                  className="w-full h-full ml-4 mr-4 rounded-lg object-cover"
                  style={{ maxHeight: "500px", maxWidth: "666px" }} // Adjust max height as needed
                />
              ) : null}
            </div>
            <div className="p-6">
              {selectedNews !== null ? (
                <div>
                  <p className="text-lg text-gray-700 mb-4">
                    {newsItems[selectedNews]?.content || "Loading..."}
                  </p>
                  <p className="text-sm text-gray-600">
                    Posted on {newsItems[selectedNews]?.date || "Loading..."}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Short News Section on the Right (or below on small screens) */}
      <div className="lg:w-1/5 bg-white rounded-lg shadow-md lg:-ml-10 mt-6 lg:mt-4 lg:mb-4 overflow-hidden">
        <div
          className="p-3 flex-grow overflow-y-auto short-news"
          ref={shortNewsRef}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent News</h2>
          <ul className="space-y-4">{shortNewsItems}</ul>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
