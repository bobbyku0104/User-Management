import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left section: green badge + titles */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              {/* Green square logo badge */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-850 text-white font-extrabold text-lg select-none">
                U
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">
                  User Management
                </span>
                <span className="hidden sm:inline text-sm text-slate-400 font-medium">
                  JSONPlaceholder demo
                </span>
              </div>
            </Link>
          </div>

          {/* Right section: Blue Review Button */}
          <div>
            <button 
              onClick={() => alert("Review action triggered")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              Review
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
