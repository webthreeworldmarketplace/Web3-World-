import React, { Fragment, useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import Web3world from "./Images/Web3 World.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faDiscord,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import Cryptotable from "./CryptoTable";
import { ethers } from "ethers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const navigate = useNavigate();
  const [isCurrencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showCryptoTable, setShowCryptoTable] = useState(false);

  const [mobile, setmobile] = useState(false);
  const [isInsideNavbarOpen, setIsInsideNavbarOpen] = useState(false);
  const [isCryptoDetailNavbarVisible, setIsCryptoDetailNavbarVisible] =
    useState(true);

  const [isWalletModalOpen, setWalletModalOpen] = useState(false); // State for the wallet modal
  const [account, setAccount] = useState(null);

  const cryptoTableRef = useRef(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMainMenuOpen(!isMainMenuOpen);
    setIsMenuVisible(!isMenuVisible);
    if (isMenuVisible) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling when menu is closed
    }
  };

  const toggleCryptoTable = () => {
    setShowCryptoTable(!showCryptoTable);
    setTimeout(() => {
      scrollToCryptoTable();
    }, 0);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleCancelSearch = () => {
    setIsSearchVisible(false);
    window.location.reload(); // Reload the page
  };

  const scrollToCryptoTable = () => {
    if (cryptoTableRef.current) {
      cryptoTableRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleMouseEnter = (dropdown) => {
    setOpenDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleMainNavbarClick = () => {
    setIsInsideNavbarOpen(false);
  };

  const toggleCryptoDetailNavbar = () => {
    setIsCryptoDetailNavbarVisible(!isCryptoDetailNavbarVisible);
  };

  const openWalletModal = () => setWalletModalOpen(true);
  const closeWalletModal = () => setWalletModalOpen(false);

  const connectWallet = async (wallet) => {
    if (wallet === "metamask") {
      try {
        // Check if ethereum object is available
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = provider.getSigner();
          console.log(signer);
          const address = await signer.getAddress();
          setAccount(address); // Save the account address to state
          closeWalletModal(); // Close the modal after connecting
          console.log("Connected with address:", address);
        } else {
          throw new Error("No crypto wallet found. Please install MetaMask.");
        }
      } catch (err) {
        console.error("Error connecting to wallet:", err.message);
      }
    } else {
      console.log("Other wallets not yet supported.");
    }
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
        .nav-item {
          white-space: nowrap;
        }
        .connect-wallet-button {
          background-color: #e8edf9;
          color: #467fcf;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .connect-wallet-button:hover {
          background-color: #d0d9f2;
        }
      `}</style>
      <header
        className={`sticky top-0 z-10 transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {isCryptoDetailNavbarVisible && (
          <nav className="bg-white border-b border-gray-200 z-100 w-full">
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
                      <span className="text-blue-600 text-xs">
                        {stat.value}
                      </span>{" "}
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
            {!isSearchVisible && (
              <div className="container mx-auto px-4 py-2 flex justify-between items-center w-full">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 mx-2 font-semibold text-lg">
                    <Link to="/">
                      <img
                        src={Web3world}
                        alt="Web3world"
                        className="h-8 w-auto md:h-20 md:w-20 cursor-pointer"
                      />
                    </Link>
                  </div>
                  <div className="hidden md:flex space-x-6">
                    <Menu as="div" className="relative inline-block text-left">
                      <div
                        className="nav-item my-1 inline-flex justify-center text-md font-bold text-black cursor-pointer"
                        onMouseEnter={() =>
                          handleMouseEnter("cryptocurrencies")
                        }
                        onClick={handleMainNavbarClick} // Add click handler
                      >
                        <Link to="/" onClick={() => handleMenuItemClick("/")}>
                          Cryptocurrencies
                        </Link>
                      </div>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                      <div
                        className="nav-item my-1 inline-flex justify-center text-md font-bold text-black cursor-pointer"
                        onMouseEnter={() => handleMouseEnter("exchanges")}
                        onClick={handleMainNavbarClick} // Add click handler
                      >
                        <Link
                          to="/exchange"
                          className="text-md font-bold text-black"
                          onClick={() => handleMenuItemClick("/exchange")}
                        >
                          Exchange
                        </Link>
                      </div>
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                      <div
                        className="nav-item my-1 inline-flex justify-center text-md font-bold text-black cursor-pointer"
                        onMouseEnter={() => handleMouseEnter("community")}
                        onClick={handleMainNavbarClick} // Add click handler
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
                                  <FontAwesomeIcon
                                    icon={faDiscord}
                                    size="2x"
                                    style={{ color: "#5555dd" }}
                                  />
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
                                    style={{ color: "#1DA1F2" }}
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
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                      )}
                    </Menu>
                    <Menu as="div" className="relative inline-block text-left">
                      <div
                        className="nav-item my-1 inline-flex justify-center text-md font-bold text-black cursor-pointer"
                        onMouseEnter={() => handleMouseEnter("products")}
                        onClick={handleMainNavbarClick} // Add click handler
                      >
                        <Link
                          to="/howtobuy"
                          className="text-md font-bold text-black"
                          onClick={() => handleMenuItemClick("/howtobuy")}
                        >
                          How To Buy
                        </Link>
                      </div>
                    </Menu>
                    <Link
                      to="/News"
                      className="nav-item my-1 inline-flex justify-center text-md font-bold text-black cursor-pointer"
                      onClick={() => handleMenuItemClick("/News")}
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
                  <button
                    onClick={openWalletModal}
                    className="connect-wallet-button hidden md:block text-sm font-bold ml-2"
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            )}
            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md w-full">
                <div className="px-2 pt-2 pb-3 space-y-1 w-full">
                  <Menu>
                    <Menu.Button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                      <Link to="/" onClick={() => handleMenuItemClick("/")}>
                        Cryptocurrencies
                      </Link>
                    </Menu.Button>
                  </Menu>
                  <Menu>
                    <Menu.Button
                      as={Link}
                      to="/exchange"
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => handleMenuItemClick("/exchange")}
                    >
                      Exchanges
                    </Menu.Button>
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
                                active
                                  ? "bg-gray-100 text-black"
                                  : "text-black",
                                "block px-3 py-2 text-base font-medium "
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faXTwitter}
                                size="2x"
                                className="ml-2"
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
                                active
                                  ? "bg-gray-100 text-black"
                                  : "text-black",
                                "block px-3 py-2 text-base font-medium"
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faDiscord}
                                size="2x"
                                className="ml-1"
                                style={{ color: "#5555dd" }}
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
                                active
                                  ? "bg-gray-100 text-black"
                                  : "text-black",
                                "block px-3 py-2 text-base font-medium"
                              )}
                            >
                              <FontAwesomeIcon
                                icon={faTelegram}
                                size="2x"
                                className="ml-1"
                                style={{ color: "#1DA1F2" }}
                              />
                              Telegram
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Menu>
                    <Menu.Button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 hidden"
                      onClick={() => toggleMobileDropdown("events")}
                    >
                      Events
                    </Menu.Button>
                  </Menu>
                  <Link
                    to="/News"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full"
                    onClick={() => handleMenuItemClick("/News")}
                  >
                    News
                  </Link>
                  <div
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full"
                    onMouseEnter={() => handleMouseEnter("products")}
                    onClick={handleMainNavbarClick} // Add click handler
                  >
                    <Link
                      to="/howtobuy"
                      onClick={() => handleMenuItemClick("/howtobuy")}
                    >
                      How To Buy
                    </Link>
                  </div>
                  {/* Mobile Connect Wallet option */}
                  <button
                    onClick={openWalletModal}
                    className="connect-wallet-button block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                  >
                    Connect Wallet
                  </button>
                </div>
              </div>
            )}
          </nav>
        )}
      </header>

      {/* Wallet Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Connect Wallet</h2>
              <button
                onClick={closeWalletModal}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-10">
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("metamask")}
              >
                <img
                  src="https://seeklogo.com/images/M/metamask-logo-09EDE53DBD-seeklogo.com.png"
                  alt="Metamask"
                  className="h-12 mb-2"
                />
                <span>Metamask</span>
              </div>
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("walletconnect")}
              >
                <img
                  src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                  alt="WalletConnect"
                  className="h-12 mb-2"
                />
                <span>WalletConnect</span>
              </div>
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("trustwallet")}
              >
                <img
                  src="https://trustwallet.com/assets/images/media/assets/TWT.png"
                  alt="Trust Wallet"
                  className="h-12 mb-2"
                />
                <span>Trust Wallet</span>
              </div>
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("mathwallet")}
              >
                <img
                  src="https://medishares.oss-cn-hongkong.aliyuncs.com/logo/math/MathWallet_App_Icon.png"
                  alt="MathWallet"
                  className="h-12 mb-2"
                />
                <span>MathWallet</span>
              </div>
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("tokenpocket")}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH8l_OVc5q_1YltqhZwVBQxX5eMMYdpv-mIQ&s"
                  alt="TokenPocket"
                  className="h-12 mb-2"
                />
                <span>TokenPocket</span>
              </div>
              <div
                className="wallet-option flex flex-col items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                onClick={() => connectWallet("safepal")}
              >
                <img
                  src="https://yt3.googleusercontent.com/cGmfHKdVyJgR5ndq3C335GaPlbmyEgKIa-0nfIbab5hQUOzh3zNgyRh11pOfkay3UVMvfGrPxg=s900-c-k-c0x00ffffff-no-rj"
                  alt="SafePal"
                  className="h-12 mb-2"
                />
                <span>SafePal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
