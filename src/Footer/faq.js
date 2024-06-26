// FAQPage.jsx

import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons from react-icons library

const FAQPage = () => {
  // FAQ data as an array of objects
  const faqs = [
    {
      question: 'How are the prices calculated for the various cryptocurrencies?',
      answer: 'Please refer to the Market Data section of the methodology for detailed information on this topic.',
    },
    {
      question: 'What is "Market Capitalization" and how is it calculated?',
      answer: "Market Capitalization is one way to rank the relative size of a cryptocurrency. It's calculated by multiplying the Price by the Circulating Supply."
    },
    {
      question: 'What is the difference between "Circulating Supply", "Total Supply", and "Max Supply"?',
      answer: "Circulating Supply is the best approximation of the number of coins that are circulating in the market and the general public's hands. Total Supply is the total amount of coins in existence right now (minus any coins that have been verifiably burned).  Max Supply is the best approximation of the maximum amount of coins that will ever exist in the lifetime of the cryptocurrency."
    },
    {
      question: 'Why is the Circulating Supply used in determining the market capitalization instead of Total Supply?',
      answer: "We've found that Circulating Supply is a much better metric for determining market capitalization. Coins that are locked, reserved, or not able to be sold on the public market are coins that can't affect the price and thus should not be allowed to affect the market capitalization as well.The method of using the Circulating Supply is analogous to the method of using public float for determining the market capitalization of companies in traditional investing.",
    },
    {
      question: 'What is the difference between a "Coin" and a "Token" on the site?',
      answer: 'CoinMarketCap Events focuses on cryptocurrency and blockchain-related events. While we primarily cater to this audience, you can contact us to discuss your event details, and we may consider it for promotion if it aligns with our audience\'s interests.',
    },
    {
      question: 'Why are markets with no fees excluded from the price average and total trading volume?',
      answer: "When no fees are being charged at the exchange, it is possible for a trader (or bot) to trade back and forth with themselves and generate a lot of 'fake' volume without penalty. It's impossible to determine how much of the volume is fake so we exclude it entirely from the calculations.",
    },
    {
      question: 'Can I see the affiliate links for Exchanges on Webthreeworld?',
      answer: 'Yes we run an affiliate program and provide affiliated links of all exchanges.',
    },
    {
      question: 'How do I purchase cryptocurrency?',
      answer: 'Webthreeworld reports on the trading activities of thousands of markets but does not directly sell any cryptocurrency. The best way to find where to buy is by looking on the markets section for the cryptocurrency. For example, to find where to buy Bitcoin, you can look at the section of the market for Bitcoin.',
    },
    {
      question: 'In what time zone is the site based?',
      answer: 'Data is collected, recorded, and reported in UTC time unless otherwise specified.',
    },
    {
      question: 'At what time is the 24 hour % change based?',
      answer: "It's based on the current time. It's a rolling 24 hour period.",
    },
    {
      question: 'How frequently is the data on Webthreeworld updated?',
      answer: "Webthreeworld updates data in real-time, providing users with the latest information on prices, market capitalization, trading volume, and other metrics.",
    },
    {
      question: 'What is the "Dominance" percentage displayed for certain cryptocurrencies?',
      answer: "The Dominance percentage shows the relative market share of a specific cryptocurrency compared to the total market capitalization of all cryptocurrencies. It's calculated by dividing the market capitalization of the specific cryptocurrency by the total market capitalization of all cryptocurrencies.",
    },
    {
      question: 'Can I track my cryptocurrency portfolio on Webthreeworld?',
      answer: "Yes, Webthreeworld offers a Portfolio Tracker feature that allows users to monitor their cryptocurrency investments. Users can input their holdings and track their portfolio's performance over time.",
    },
    {
      question: 'How does Webthreeworld calculate the "Volume" of a cryptocurrency?',
      answer: "Volume represents the total amount of a cryptocurrency that has been traded within a specific timeframe, typically within the last 24 hours. Webthreeworld aggregates trading volume data from various exchanges to provide an overall picture of market activity.",
    },
    {
      question: 'What is the "Rank" of a cryptocurrency on Webthreeworld based on?',
      answer: "The Rank of a cryptocurrency on Webthreeworld is determined primarily by its market capitalization.Cryptocurrencies with higher market capitalizations are ranked higher than those with lower market capitalizations. Additionally, factors such as trading volume, liquidity, and community support may also influence a cryptocurrency's rank.",
    },
    {
      question: 'How does Webthreeworld calculate the "Fully Diluted Market Cap"?',
      answer: "The Fully Diluted Market Cap represents the market capitalization of a cryptocurrency if all coins or tokens that could potentially be in circulation are in circulation. It's calculated by multiplying the current price by the total supply or max supply of the cryptocurrency, depending on which is more relevant.",
    },
  ];

  // State to track which FAQ item is currently expanded
  const [expandedItem, setExpandedItem] = useState(null);

  // Function to toggle accordion item
  const toggleAccordion = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null); // Collapse if already expanded
    } else {
      setExpandedItem(index); // Expand if collapsed
    }
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">FAQ</h1>

        {/* FAQ Accordions */}
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                type="button"
                className="flex justify-between w-full px-4 py-2 text-left text-lg font-medium text-gray-900 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => toggleAccordion(index)}
                aria-controls={`faq-${index}`}
                aria-expanded={expandedItem === index}
              >
                <span>{faq.question}</span>
                {expandedItem === index ? (
                  <FaAngleUp className="text-gray-500" />
                ) : (
                  <FaAngleDown className="text-gray-500" />
                )}
              </button>
              <div
                id={`faq-${index}`}
                className={`mt-2 px-4 pt-2 pb-4 text-gray-700 ${
                  expandedItem === index ? 'block' : 'hidden'
                }`}
              >
                <p className="mb-2">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQPage;
