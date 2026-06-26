import React from "react";

/**
 * HomePage Component
 * Serves as the landing page and the container for listing, editing, and deleting users.
 */
function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-slate-800">
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-100">
        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          User Management Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
          Welcome to the User Management workspace. Here you can search, view details, update, or remove user profiles.
        </p>
        
        {/* Placeholder table container */}
        <div className="mt-8 p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-slate-400 font-medium">User list table will be loaded here in Step 2.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
