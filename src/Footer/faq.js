// FAQPage.jsx

import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons from react-icons library

const FAQPage = () => {
  // FAQ data as an array of objects
  const faqs = [
    {
      question: 'What is CoinMarketCap Events?',
      answer: 'CoinMarketCap Events is a platform for hosting and promoting crypto-related events globally. It allows event organizers to reach a wide audience interested in cryptocurrency and blockchain technology.',
    },
    {
      question: 'How can I advertise my event on CoinMarketCap Events?',
      answer: 'You can advertise your event on CoinMarketCap Events by creating a listing and choosing from various promotional options such as featured listings, banner ads, and sponsored content. Visit our Advertise page for more details.',
    },
    {
      question: 'What are the benefits of advertising on CoinMarketCap Events?',
      answer: 'Advertising on CoinMarketCap Events gives your event visibility to a targeted audience interested in cryptocurrencies and blockchain technology. It helps you reach potential attendees, sponsors, and partners worldwide.',
    },
    {
      question: 'How do I get started with advertising on CoinMarketCap Events?',
      answer: 'To get started, visit our Advertise page and explore the available advertising options. Choose the package that best suits your needs and follow the instructions to create your event listing.',
    },
    {
      question: 'Can I promote my event on CoinMarketCap Events if it\'s not related to cryptocurrency?',
      answer: 'CoinMarketCap Events focuses on cryptocurrency and blockchain-related events. While we primarily cater to this audience, you can contact us to discuss your event details, and we may consider it for promotion if it aligns with our audience\'s interests.',
    },
    {
      question: 'Is there a fee for listing my event on CoinMarketCap Events?',
      answer: 'There may be fees associated with listing and advertising your event on CoinMarketCap Events, depending on the promotional options you choose. Visit our Advertise page for detailed pricing information.',
    },
    {
      question: 'How can I contact CoinMarketCap Events for more information?',
      answer: 'For more information or inquiries regarding advertising and event listings on CoinMarketCap Events, please contact our support team at events@coinmarketcap.com.',
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
