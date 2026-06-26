import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  FiArrowLeft, 
  FiMail, 
  FiPhone, 
  FiGlobe, 
  FiBriefcase, 
  FiMapPin, 
  FiAlertCircle, 
  FiRefreshCw 
} from "react-icons/fi";
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
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
            Back to Dashboard
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back navigation link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Color banner header block */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600 flex items-end px-6 md:px-8 pb-4">
          <div className="flex items-center gap-4 translate-y-10">
            {/* User Initials Avatar badge */}
            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-xl bg-blue-50 text-blue-700 text-2xl font-bold flex items-center justify-center">
                {getInitials(user.name)}
              </div>
            </div>
          </div>
        </div>

        {/* Profile identity info */}
        <div className="pt-14 px-6 md:px-8 pb-6 border-b border-slate-100">
          <h1 className="text-2xl font-extrabold text-slate-950">{user.name}</h1>
          <p className="text-sm text-slate-500 font-medium">@{user.username}</p>
        </div>

        {/* Body detail cards */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Section 1: Contact Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/50 border border-slate-100/50">
                <FiMail className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <div className="truncate">
                  <p className="text-xs text-slate-400 font-semibold">Email</p>
                  <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/50 border border-slate-100/50">
                <FiPhone className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Phone</p>
                  <p className="text-sm font-semibold text-slate-800">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-slate-50/50 border border-slate-100/50 md:col-span-2">
                <FiGlobe className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Website</p>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-650 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Company Details */}
          {user.company && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Company Details</h3>
              <div className="p-5 rounded-xl bg-slate-50/50 border border-slate-100/50 space-y-4">
                <div className="flex items-start gap-3.5">
                  <FiBriefcase className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{user.company.name}</h4>
                    <p className="text-xs text-slate-500 italic mt-0.5">"{user.company.catchPhrase}"</p>
                    <p className="text-xs text-slate-400 font-medium mt-2">Core: {user.company.bs}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Location Details */}
          {user.address && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Office Location</h3>
              <div className="flex items-start gap-3.5 p-5 rounded-xl bg-slate-50/50 border border-slate-100/50">
                <FiMapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.address.suite}, {user.address.street}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
