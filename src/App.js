import React from "react";
import Nav from "./Comp/Nav";
import CryptoTable from "./Comp/CryptoTable";
import Left from "./Comp/Leftover";
import Foot from "./Comp/Fotter";
import News from "./news/news"; // Ensure the correct import path for the News component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import New from "./Comp/New";
import CookiePolicy from './Footer/cookiepolicy';
import Termsofuse from "./Footer/termsofuse";
import AboutUs from "./Footer/aboutus";
import PrivacyPolicy from "./Footer/privacypolicy";
import Disclaimer from "./Footer/disclaimer";
import FAQ from "./Footer/faq";
import CareerForm from "./Forms/Career";
import ContactSupport from "./Forms/ContactSupport";
import HireBlockchainDeveloper from "./Forms/HireBlockchainDeveloper";
import Consulting from "./Forms/Consulting";
import CryptoDetail from "./Comp/CryptoDetail"; // Ensure the correct import path for the CryptoDetail component

function Home() {
  return (
    <>
      <New />
      <CryptoTable />
      <Left />
    </>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
          <Route path="/termsofuse" element={<Termsofuse />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Career" element={<CareerForm />} />
          <Route path="/ContactSupport" element={<ContactSupport />} />
          <Route path="/HireBlockchainDeveloper" element={<HireBlockchainDeveloper />} />
          <Route path="/Consulting" element={<Consulting />} />
          <Route path="/detail/:id" element={<CryptoDetail />} />
        </Routes>
        <Foot />
      </div>
    </Router>
  );
}


export default App;
