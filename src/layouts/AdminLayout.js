// src/layouts/AdminLayout.js
import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <nav className="w-64 bg-gray-800 text-white h-screen p-5">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <ul className="mt-5">
          <li>
            <Link to="dashboard" className="block py-2">
              News
            </Link>
          </li>
          <li>
            <Link to="users" className="block py-2">
              News List
            </Link>
          </li>
          {/* <li>
            <Link to="/SignInPage" className="block py-2">
              Sign In
            </Link>
          </li> */}
        </ul>
      </nav>
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
};

export default AdminLayout;
