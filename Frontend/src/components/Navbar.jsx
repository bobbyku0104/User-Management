import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiUsers, FiHome, FiTrendingUp } from "react-icons/fi";

/**
 * Navbar Component
 * Navigation header displayed at the top of every page.
 */
function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-transform hover:scale-102">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                <FiUsers className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                UserHub
              </span>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50/80 text-blue-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                <FiHome className="w-4 h-4" />
                Dashboard
              </NavLink>
            </nav>
          </div>

          {/* Action / Profile Info */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-800">Admin Account</span>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
