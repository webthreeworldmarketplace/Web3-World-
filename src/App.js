// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./components/DashboardPage";
import UserManagementPage from "./pages/UserManagementPage";
import Signup from "./signup/Signup";
// import ArticleManagementPage from "./pages/ArticleManagementPage";
// Import other pages...

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          {/* <Route path="/articles" element={<ArticleManagementPage />} /> */}
          {/* Add other routes... */}
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;
