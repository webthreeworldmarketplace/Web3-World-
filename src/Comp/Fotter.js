import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Web3world from "./Images/Web3 World.png";

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-start">
          <div className="mb-4 md:mb-0 w-full md:w-auto">
            <img
              src={Web3world}
              alt="Web3world"
              className="h-20 w-20 cursor-pointer"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-20 space-y-4 md:space-y-0 w-full md:w-auto">
            <div className="flex flex-row md:flex-row md:space-x-20 space-y-0 md:space-y-0 justify-between w-full md:w-auto mb-2">
              <div className="order-1 md:order-none">
                <h3 className="text-sm font-semibold uppercase mb-2 ">COMPANY</h3>
                <ul className="text-gray-500 space-y-1">
                  <li>
                    <Link to="/aboutus" className="cursor-pointer">About us</Link>
                  </li>
                  <li>
                    <Link to="/termsofuse" className="cursor-pointer">Terms of use</Link>
                  </li>
                  <li>
                    <Link to="/privacypolicy" className="cursor-pointer">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/cookiepolicy" className="cursor-pointer">Cookie Policy</Link>
                  </li>
                  <li>
                    <Link to="/disclaimer" className="cursor-pointer">Disclaimer</Link>
                  </li>
                  <li className="cursor-pointer">Careers</li>
                </ul>
              </div>
              <div className="order-2 md:order-2">
                <h3 className="text-sm font-semibold uppercase mb-2 ">JOIN OUR COMMUNITY</h3>
                <ul className="text-gray-500 space-y-1">
                  <li className="flex items-center">
                    <a
                      href="https://x.com/web3world783761"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FontAwesomeIcon icon={faXTwitter} size="lg" className="ml-1" />
                      <span className="ml-2">X.com</span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="https://discord.com/invite/tPmChwnYs9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FontAwesomeIcon icon={faDiscord} size="lg" />
                      <span className="ml-2">Discord</span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="https://t.me/web3worldmarketplace"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FontAwesomeIcon icon={faTelegram} size="lg" className="ml-1" />
                      <span className="ml-2">Telegram</span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="https://www.linkedin.com/company/web-3-world/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="lg" className="ml-1" />
                      <span className="ml-2">LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-1/2 md:w-auto order-3 md:order-none pl-30 md:pl-0">
              <h3 className="text-sm font-semibold uppercase mb-2">SUPPORT</h3>
              <ul className="text-gray-500 space-y-1">
                <li className="cursor-pointer ">Contact Support</li>
                <li>
                  <Link to="/faq" className="cursor-pointer">FAQ</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2024 webthreeworld. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;