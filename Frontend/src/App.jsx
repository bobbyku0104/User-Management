import React from "react";
import Navbar from "./components/Navbar";

/**
 * Main App Component
 * Currently renders the header Navbar and a clean starter container.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased text-slate-800">
      {/* Top Global Navigation Bar */}
      <Navbar />

      {/* Main Starter Dashboard Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center max-w-3xl mx-auto mt-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-6">
            ✨
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to UserHub Dashboard
          </h1>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            This is a clean starter setup. In the next step, we will configure routing and prepare the HomePage template to load users.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
