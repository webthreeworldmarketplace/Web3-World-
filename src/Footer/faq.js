// FAQPage.jsx

import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Import icons from react-icons library

const FAQPage = () => {
  // FAQ data as an array of objects
  const faqs = [
    {
      question: 'What is Bitcoin?',
      answer: 'Bitcoin (BTC) is a decentralized digital currency that enables fast, secure, and transparent peer-to-peer transactions without the need for intermediaries. It was invented in 2009 and has since become a popular medium for cross-border payments and a sought-after investment asset, providing significant returns to investors. Bitcoin is often considered a commodity and has been recognized as a store of value by various institutions. Recently, hedge funds in countries like the USA and Australia have approved Bitcoin ETFs (Exchange-Traded Funds), further legitimizing its status as a viable investment option.',
    },
    {
      question: 'What is blockchain?',
      answer: "Blockchain is a decentralized digital ledger that records transactions securely and transparently, using advanced cryptography to ensure integrity, trust, and immutability. It enables peer-to-peer transactions without intermediaries, making it a robust and reliable way to store and transfer value, with applications beyond cryptocurrencies."
    },
    {
      question: 'What is Ethereum (ETH)?',
      answer: "Ethereum is a decentralized blockchain platform that enables the creation of smart contracts, decentralized applications (dApps), and its own cryptocurrency, Ether (ETH). It supports various use cases, including DeFi, NFTs, and ERC-20 tokens, making it a versatile and widely-used platform in the cryptocurrency and blockchain space."
    },
    {
      question: 'What Is DiFi?',
      answer: "DeFi (Decentralized Finance) is a blockchain-based financial system that operates without intermediaries, offering decentralized exchanges, lending platforms, stablecoins, asset management, prediction markets, and more. DeFi provides open, transparent, and accessible financial services to anyone with an internet connection, revolutionizing the way we interact with financial systems.",
    },
    {
      question: 'What is NFT?',
      answer: 'NFT (Non-Fungible Token) is a unique digital asset representing ownership of a specific item, stored on a blockchain. It ensures scarcity, authenticity, and ownership, and can be bought, sold, and traded on online marketplaces, with its value fluctuating based on demand.',
    },
    {
      question: 'What is Meme coins?',
      answer: "Meme coins are digital currencies inspired by internet memes. They often feature humorous or relatable themes and can offer unique features like staking rewards, play-to-earn games, and AI integration. Examples include Pepe Unchained, WienerAI, and Doge2014. Meme coins are typically used for entertainment and community building.",
    },
    {
      question: 'What is Dapp?',
      answer: 'A Dapp (Decentralized Application) is a blockchain-based application that operates decentralized, meaning no single entity controls it. Dapps provide various services like gaming, finance, and social media, built on smart contracts for security and transparency, allowing users to interact with the blockchain directly.',
    },
    {
      question: 'Which Cryptocurrency is Popular?',
      answer: 'Bitcoin (BTC), Ethereum (ETH), Tether (USDT), Binance Coin (BNB), Solana (SOL), US Dollar Coin (USDC), XRP, Toncoin (TON), Dogecoin (DOGE), and Cardano (ADA) are the most popular cryptocurrencies, offering unique features and uses, such as decentralized finance, smart contracts, and digital payments.',
    },
    {
      question: 'Why Web3 World?',
      answer: 'Explore the Web3 world! Check real-time data for all cryptocurrencies, read latest news, stake and earn rewards, and connect to centralized exchanges. Enjoy decentralized finance, gaming, social media, and more, all in one place. Take control of your digital assets and experience the future of the internet!',
    },
    {
      question: 'Where i can trade my cryptocurrency?',
      answer: "You can trade cryptocurrency on popular centralized exchanges like Binance, Gemini, Coinbase, Kraken, and Huobi, or decentralized exchanges like Uniswap, SushiSwap, and Curve. These platforms offer various features, fees, and security measures, allowing you to buy, sell, and swap digital assets. Always research and choose a reputable exchange.",
    },
    {
      question: 'How Do I create my own crypto project?',
      answer: "The Web3 world offers resources to help you develop your project! join communities, consult experts, and utilize development platforms like Polygon, Moralis, and Alchemy. The supportive Web3 community is ready to help you build and succeed!",
    },
    
    {
      question: 'Can I get One to One Blockchain Consulting?',
      answer: "Yes Web3World offers personalized one-on-one blockchain consulting services! Get expert guidance on Web3 development, token creation, smart contracts, and more. Our experienced consultants will help you navigate the complex world of blockchain and Web3, ensuring your project's success. Schedule your consultation today and take your project to the next level!",
    },
    {
      question: 'Can I get help in the crypto project marketing from Web3 World?',
      answer: "Web3 World offers comprehensive marketing services for your crypto project! Their experts provide social media management, community building, influencer partnerships, content creation, and more. Get a customized marketing strategy to boost your project's visibility, engagement, and adoption. Let them help you shine in the Web3 space!",
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
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">FAQ</h1>

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