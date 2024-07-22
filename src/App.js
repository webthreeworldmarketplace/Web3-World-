import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./components/News";
import UserManagementPage from "./pages/NewsList";
import Signup from "./signup/Signup";
import SignIn from "./signup/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/signin" />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="news" element={<DashboardPage />} />
            <Route path="newslist" element={<UserManagementPage />} />
          </Route>
        </Route>

        {/* Fallback route for all other paths */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

// PrivateRoute component to check authentication for all routes
const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<DashboardPage />} />
          <Route path="newslist" element={<UserManagementPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
