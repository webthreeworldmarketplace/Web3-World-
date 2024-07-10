import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord, faTelegram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Web3world from "./Images/Web3 World.png";
import { NavLink } from 'react-router-dom';



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
                <h3 className="text-sm font-semibold uppercase mb-2 mr-40">COMPANY</h3>
                <ul className="text-gray-500 space-y-1">
                  <li>
                    <NavLink
                        to="/aboutus"
                        className="cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        activeClassName="active"
                        exact>About us</NavLink>
                  </li>
                  <li>
                    <NavLink to="/termsofuse" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Terms of use</NavLink>
                  </li>
                  <li>
                    <NavLink to="/privacypolicy" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Privacy Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to="/cookiepolicy" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Cookie Policy</NavLink>
                  </li>
                  <li>
                    <NavLink to="/disclaimer" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Disclaimer</NavLink>
                  </li>
                  <li className="cursor-pointer">
                    <NavLink to="/Career" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Careers</NavLink>
                  </li>
                  
                </ul>
              </div>
              <div className="order-2 md:order-2">
                <h3 className="text-sm font-semibold uppercase mb-2 mr-40">JOIN OUR COMMUNITY</h3>
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
                  
                </ul>
              </div>
            </div>
            <div className="w-1/2 md:w-auto order-3 md:order-none pl-30 md:pl-0">
              <h3 className="text-sm font-semibold uppercase mb-2 mr-40">SUPPORT</h3>
              <ul className="text-gray-500 space-y-1">
                <li className="cursor-pointer "><NavLink to="/HireBlockchainDeveloper" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Hire Blockchain Developer</NavLink>
                </li>
                <li className="cursor-pointer "><NavLink to="/Consulting" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Blockchain Consulting</NavLink>
                </li>
                <li className="cursor-pointer "><NavLink to="/ContactSupport" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>Contact Support</NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className="cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    activeClassName="active"
                    exact>FAQ</NavLink>
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