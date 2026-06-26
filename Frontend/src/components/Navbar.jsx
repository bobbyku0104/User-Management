import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo badge and title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-800 text-white font-extrabold text-lg select-none">
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

          {/* Right section: Profile Account & Status indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-800">Admin Account</span>
              <span className="text-[10px] text-teal-600 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-teal-800 to-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs select-none">
              AD
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
