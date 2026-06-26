import React from "react";
import { FiPlus } from "react-icons/fi";

/**
 * HomePage Component
 * Renders the workspace dashboard containing the placeholder for user list.
 */
function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            User Workspace
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your profiles, create new records, or inspect existing details.
          </p>
        </div>
        
        {/* Create User Button Placeholder */}
        <button
          onClick={() => alert("Create user modal will open here soon!")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          <FiPlus className="w-5 h-5" />
          Create User
        </button>
      </div>

      {/* Main Table Placeholder container */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-12 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4 font-bold">
          ℹ️
        </div>
        <h3 className="text-lg font-semibold text-slate-950">No users listed yet</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
          In the next steps, we will connect the JSONPlaceholder API to fetch and display actual user records here in a responsive table.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
