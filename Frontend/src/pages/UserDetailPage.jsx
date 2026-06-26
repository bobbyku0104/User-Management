import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import { getUserById } from "../api/users";
import { getInitials } from "../components/utils";

function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const fetchUserDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try loading from local storage cache first
      const cached = localStorage.getItem("users");
      if (cached) {
        const list = JSON.parse(cached);
        const found = list.find((u) => String(u.id) === String(id));
        if (found) {
          setUser(found);
          return;
        }
      }

      // Fallback to API if not found in cache
      const data = await getUserById(id);
      setUser(data);
    } catch (err) {
      setError("Failed to load user details. Please check connection.");
      toast.error("Could not fetch user profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-500 font-medium">Loading user details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-650 mb-4">
          <FiAlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Failed to load details</h3>
        <p className="mt-2 text-sm text-red-655">{error || "User record not found."}</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link to="/" className="text-sm font-semibold text-blue-650 hover:underline">
            Back to users
          </Link>
          <button
            onClick={fetchUserDetail}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white text-sm font-semibold px-4 py-2 hover:bg-slate-800 transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to users navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          ← Back to users
        </Link>
      </div>

      {/* Simple but beautiful Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Left Column: Profile Card summary */}
          <div className="p-6 md:p-8 md:w-1/3 flex flex-col items-center text-center bg-teal-50/30">
            <div className="w-20 h-20 rounded-full bg-teal-50 border border-teal-100 text-teal-700 font-bold flex items-center justify-center text-2xl select-none mb-4 shadow-xs shrink-0">
              {getInitials(user.name)}
            </div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight mb-1">
              {user.name}
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              @{user.username || "user"}
            </p>
            {user.company?.name && (
              <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100/50">
                {user.company.name}
              </span>
            )}
          </div>

          {/* Right Column: Full Details */}
          <div className="p-6 md:p-8 flex-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Profile Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address</span>
                <span className="text-sm font-semibold text-slate-800 break-all">{user.email || "—"}</span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Phone Number</span>
                <span className="text-sm font-semibold text-slate-800">{user.phone || "—"}</span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Website</span>
                {user.website ? (
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-teal-700 hover:underline"
                  >
                    {user.website}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-slate-800">—</span>
                )}
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Company</span>
                <span className="text-sm font-semibold text-slate-800">{user.company?.name || "—"}</span>
              </div>

              <div className="sm:col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Address</span>
                <span className="text-sm font-semibold text-slate-800">
                  {user.address
                    ? `${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
