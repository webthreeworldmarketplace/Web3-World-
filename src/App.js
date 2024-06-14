import React from "react";
import Nav from "./Comp/Nav";
import CryptoTable from "./Comp/CryptoTable";
import Left from "./Comp/Leftover";
import Foot from "./Comp/Fotter";
import News from "./news/news"; // Ensure the correct import path for the News component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import New from "./Comp/New";

function Home() {
  return (
    <>
      <New/>
      <CryptoTable />
      <Left />
      <Foot />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
