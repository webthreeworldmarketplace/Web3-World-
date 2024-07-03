import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import Web3world from "./Images/Web3 World.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faDiscord,
  faTelegram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const stats = [
    { label: "Crypto", value: "2.4M+", change: null },
    { label: "Exchanges", value: "770", change: null },
    { label: "Market Cap", value: "$2.56T", change: "🔻1.47%" },
    { label: "24h Vol", value: "$91.03B", change: "🔻12.50%" },
    { label: "Dominance", value: "BTC: 52.4% ETH: 18.2%", change: null },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setIsHeaderVisible(currentScrollY <= lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCurrencyModal = () => setCurrencyModalOpen(true);
  const closeCurrencyModal = () => setCurrencyModalOpen(false);

  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="App">
      <style>{`
        html, body {
          overflow-x: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          height: 100%;
          
        }
        .nav {
          width: 100%;
          height: 100%;
        }
      `}</style>
      <header
        className={`sticky top-0 z-10 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="bg-white border-b border-gray-200 z-100 w-full ">
          {/* Top section with market stats */}
          <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs text-gray-500 w-full">
            <div className="flex space-x-4">
              {isMobileView ? (
                <div className="font-bold text-xs">
                  {stats[currentStatIndex].label}:{" "}
                  <span className="text-blue-600 text-xs">
                    {stats[currentStatIndex].value}
                  </span>{" "}
                  {stats[currentStatIndex].change && (
                    <span className="text-red-600 text-xs">
                      {stats[currentStatIndex].change}
                    </span>
                  )}
                </div>
              ) : (
                stats.map((stat, index) => (
                  <span key={index} className="font-bold text-xs">
                    {stat.label}:{" "}
                    <span className="text-blue-600 text-xs">{stat.value}</span>{" "}
                    {stat.change && (
                      <span className="text-red-600 text-xs">
                        {stat.change}
                      </span>
                    )}
                  </span>
                ))
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 text-sm font-bold text-black">
                    English
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  show={openDropdown === "language"}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-black font-bold"
                                : "text-black font-bold",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            English
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-black font-bold"
                                : "text-black font-bold",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Spanish
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-black font-bold"
                                : "text-black font-bold",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            French
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                className="text-black font-bold hover:text-gray-900 text-sm"
                onClick={openCurrencyModal}
              >
                USD🔽
              </button>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-gray-200"></div>
          {/* Bottom section with navigation links */}
          <div className="container mx-auto px-4 py-2 flex justify-between items-center w-full">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 mx-4 font-semibold text-lg">
                <Link to="/">
                  <img
                    src={Web3world}
                    alt="Web3world"
                    className="h-8 w-auto md:h-20 md:w-20 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Menu as="div" className="relative inline-block text-left">
                  <div
                    className="my-2 inline-flex w-full justify-center gap-x-1 text-md font-bold text-black cursor-pointer"
                    onMouseEnter={() => handleMouseEnter("cryptocurrencies")}
                  >
                    Cryptocurrencies
                  </div>
                  {/* TempDeleted file will be pasted here */}
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                  <div
                    className="my-2 inline-flex w-full justify-center gap-x-1 text-md font-bold text-black cursor-pointer"
                    onMouseEnter={() => handleMouseEnter("exchanges")}
                  >
                    Exchanges
                  </div>
                  {/* {openDropdown === "exchanges" && (
                    <Transition
                      as={Fragment}
                      show={true}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute left-0 z-10 mt-2 w-80 origin-top-left bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        onMouseEnter={() => handleMouseEnter("exchanges")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <h1 className="text-center font-bold">Coming Soon..</h1>
                        <div className="py-2 px-4">
                          <div className="space-y-2">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-black",
                                    "block px-2 py-1"
                                  )}
                                >
                                  <span className="flex items-center">
                                    <span>🏦</span>
                                    <span className="ml-1">Spot</span>
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-black",
                                    "block px-2 py-1"
                                  )}
                                >
                                  <span className="flex items-center">
                                    <span>📊</span>
                                    <span className="ml-1">Open Interest</span>
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-black",
                                    "block px-2 py-1"
                                  )}
                                >
                                  <span className="flex items-center">
                                    <span>📅</span>
                                    <span className="ml-1">Future Volume</span>
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  )} */}
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                  <div
                    className="my-2 inline-flex w-full justify-center gap-x-1 text-md font-bold text-black cursor-pointer"
                    onMouseEnter={() => handleMouseEnter("community")}
                  >
                    Community
                  </div>
                  {openDropdown === "community" && (
                    <Transition
                      as={Fragment}
                      show={true}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute left-0 z-10 mt-2 w-80 origin-top-left bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        onMouseEnter={() => handleMouseEnter("community")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="py-2 px-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-gray-600 hidden md:block">
                              Social
                            </h3>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="https://x.com/web3world783761"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center hidden md:flex"
                                >
                                  <FontAwesomeIcon
                                    icon={faXTwitter}
                                    size="2x"
                                    className="ml-1"
                                  />
                                  <span
                                    style={{
                                      marginLeft: "17px",
                                      lineHeight: "2.25",
                                    }}
                                  >
                                    X.com
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="space-y-1 mt-2">
                            <a
                              href="https://discord.com/invite/tPmChwnYs9"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <FontAwesomeIcon icon={faDiscord} size="2x" />
                              <span
                                style={{
                                  marginLeft: "10px",
                                  lineHeight: "2.25",
                                }}
                              >
                                Discord
                              </span>
                            </a>

                            <a
                              href="https://t.me/web3worldmarketplace"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center"
                            >
                              <FontAwesomeIcon
                                icon={faTelegram}
                                size="2x"
                                className="ml-1"
                              />
                              <span
                                style={{
                                  marginLeft: "17px",
                                  lineHeight: "1.x",
                                }}
                              >
                                Telegram
                              </span>
                            </a>
                            <li className="flex items-center cursor-pointer">
                              <a
                                href="https://www.linkedin.com/company/web-3-world/?viewAsMember=true"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                              >
                                <FontAwesomeIcon
                                  icon={faLinkedin}
                                  size="2x"
                                  className="ml-1"
                                />
                                <span
                                  style={{
                                    marginLeft: "20px",
                                    lineHeight: "2.25",
                                  }}
                                >
                                  LinkedIn
                                </span>
                              </a>
                            </li>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  )}
                </Menu>
                <Menu as="div" className="relative inline-block text-left">
                  <div
                    className="my-2 inline-flex w-full justify-center gap-x-1 text-md font-bold text-black cursor-pointer"
                    onMouseEnter={() => handleMouseEnter("products")}
                  >
                    Events
                  </div>
                  {openDropdown === "products" && (
                    <Transition
                      as={Fragment}
                      show={true}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute left-0 z-10 mt-2 w-80 origin-top-left bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        onMouseEnter={() => handleMouseEnter("products")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="py-2 px-4">
                          <div className="space-y-2">
                            <h1 className="text-center font-bold">
                              Coming Soon..
                            </h1>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-black"
                                      : "text-black",
                                    "block px-2 py-1 text-sm"
                                  )}
                                >
                                  📢 Future Events
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </div>
                      </Menu.Items>
                    </Transition>
                  )}
                </Menu>
                <Link
                  to="/news"
                  className="my-2 inline-flex w-full justify-center gap-x-1 text-md font-bold text-black cursor-pointer"
                >
                  News
                </Link>
              </div>
            </div>
            {/* Search input on the right */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <div className="relative">
                <button
                  className="md:hidden p-2"
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
                <div
                  className={`${
                    isSearchVisible ? "block search-input-mobile" : "hidden"
                  } md:block`}
                >
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto p-2 border border-gray-300 rounded bg-gray-100 text-gray-700 pl-10"
                  />
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md w-full">
              <div className="px-2 pt-2 pb-3 space-y-1 w-full">
                <Menu>
                  <Menu.Button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => toggleMobileDropdown("cryptocurrencies")}
                  >
                    Cryptocurrencies
                    <ChevronDownIcon
                      className={`${
                        openMobileDropdown === "cryptocurrencies"
                          ? "transform rotate-180"
                          : ""
                      } w-5 h-5 inline-block ml-1`}
                    />
                  </Menu.Button>
                  <Transition
                    show={openMobileDropdown === "cryptocurrencies"}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="pl-4 w-full">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📊 Ranking
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🔍 Categories
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🌐 Global Charts
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📅 Historical Snapshots
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📈 Bitcoin ETFs
                          </a>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-300 my-2 w-full"></div>
                      <h3 className="font-bold text-gray-600">NFT</h3>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🎨 All NFT Market cap
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🗓️ Top collections
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🗓️ Top Marketplace
                          </a>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-300 my-2 w-full"></div>
                      <h3 className="font-bold text-gray-600">Leaderboards</h3>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🔥 Trending
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🆕 Trading Volume
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🔥 Recently Added
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📉 Gainers & Losers
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            👀 Most visited
                          </a>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-300 my-2 w-full"></div>
                      <h3 className="font-bold text-gray-600">
                        All chain Network
                      </h3>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🔗 All chains Market Cap
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📊 Top chainers
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🆕 Recently Added
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu>
                  <Menu.Button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => toggleMobileDropdown("exchanges")}
                  >
                    Exchanges
                    <ChevronDownIcon
                      className={`${
                        openMobileDropdown === "exchanges"
                          ? "transform rotate-180"
                          : ""
                      } w-5 h-5 inline-block ml-1`}
                    />
                  </Menu.Button>
                  <Transition
                    show={openMobileDropdown === "exchanges"}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="pl-4 w-full">
                      <h1 className="text-center font-bold">Coming Soon..</h1>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            🏦 Spot
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📊 Open Interest
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📅 Future Volume
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu>
                  <Menu.Button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => toggleMobileDropdown("community")}
                  >
                    Community
                    <ChevronDownIcon
                      className={`${
                        openMobileDropdown === "community"
                          ? "transform rotate-180"
                          : ""
                      } w-5 h-5 inline-block ml-1`}
                    />
                  </Menu.Button>
                  <Transition
                    show={openMobileDropdown === "community"}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="pl-4 w-full">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://x.com/web3world783761"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium hidden"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faXTwitter}
                              size="2x"
                              className="ml-1"
                            />
                            X.com
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://discord.com/invite/tPmChwnYs9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faDiscord}
                              size="2x"
                              className="ml-1"
                            />
                            Discord
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://t.me/web3worldmarketplace"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faTelegram}
                              size="2x"
                              className="ml-1"
                            />
                            Telegram
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="https://www.linkedin.com/company/web-3-world/?viewAsMember=true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              size="2x"
                              className="ml-1"
                            />
                            LinkedIn
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Menu>
                  <Menu.Button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => toggleMobileDropdown("events")}
                  >
                    Events
                    <ChevronDownIcon
                      className={`${
                        openMobileDropdown === "events"
                          ? "transform rotate-180"
                          : ""
                      } w-5 h-5 inline-block ml-1`}
                    />
                  </Menu.Button>
                  <Transition
                    show={openMobileDropdown === "events"}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="pl-4 w-full">
                      <h1 className="text-center font-bold">Coming Soon..</h1>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100 text-black" : "text-black",
                              "block px-3 py-2 text-base font-medium"
                            )}
                          >
                            📢 Future Events
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <Link
                  to="/news"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full"
                >
                  News
                </Link>
              </div>
            </div>
          )}
        </nav>
        {isSearchVisible && (
          <div className="w-full py-1">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-1 text-sm border rounded"
            />
          </div>
        )}
      </header>
    </div>
  );
}
