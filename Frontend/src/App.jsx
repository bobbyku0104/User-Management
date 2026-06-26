import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserDetailPage from "./pages/UserDetailPage";

/**
 * Main App Component
 * Defines the application routing table and wraps the page contents inside the Navbar layout.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased text-slate-800">
      {/* Top Global Navigation Bar */}
      <Navbar />

      {/* Main Page Routing Container */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
