// src/Exchanges.js
import React from "react";
import Binance from "../Comp/Images/Binance.svg";
import Coinbase from "../Comp/Images/Coinbase.svg";
import OKX from "../Comp/Images/okx.svg";
import BYBIT from "../Comp/Images/BYBIT.svg";
import UPbit from "../Comp/Images/UPbit.jpg";
import Kraken from "../Comp/Images/Kraken.svg";
import Gateio from "../Comp/Images/Gateio.jpg";
import HTX from "../Comp/Images/HTX.svg";
import Bitfinex from "../Comp/Images/Bitfinex.svg";
import KuCoin from "../Comp/Images/Kucoin.svg";

const exchanges = [
  {
    name: "Binance",
    img: Binance,
    signupLink: "https://www.binance.com/en",
  },
  {
    name: "Coinbase",
    img: Coinbase,
    signupLink: "https://www.coinbase.com/signup",
  },
  {
    name: "OKX",
    img: OKX,
    signupLink: "https://www.okx.com/account/register",
  },
  {
    name: "Bybit",
    img: BYBIT,
    signupLink: "http://surl.li/qfkivx",
  },
  {
    name: "Upbit",
    img: UPbit,
    signupLink: "https://sg.upbit.com/signup",
  },
  {
    name: "Kraken",
    img: Kraken,
    signupLink: "https://www.kraken.com/signup",
  },
  {
    name: "Gate.io",
    img: Gateio,
    signupLink: "https://www.gate.io/signup",
  },
  {
    name: "HTX",
    img: HTX,
    signupLink: "http://surl.li/brfzcy",
  },
  {
    name: "Bitfinex",
    img: Bitfinex,
    signupLink: "https://www.bitfinex.com/sign-up",
  },
  {
    name: "KuCoin",
    img: KuCoin,
    signupLink: "https://www.kucoin.com/ucenter/signup",
  },
];

const Exchanges = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-10">
        Top 10 Cryptocurrency Exchanges
      </h1>
      <div className="grid md:grid-cols-2 md:gap-10 ml-8 mr-8">
        {exchanges.map((exchange) => (
          <a
            key={exchange.name}
            href={exchange.signupLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex justify-center">
              <img
                src={exchange.img}
                alt={exchange.name}
                className="rounded-lg shadow-lg object-cover mb-3 transition-transform duration-300 hover:scale-105"
                style={{ minheight: "150px", width: "auto", minWidth: "100%" }}
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;
