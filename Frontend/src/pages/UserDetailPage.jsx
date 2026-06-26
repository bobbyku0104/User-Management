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

  // Small helper component to render visual detail cards
  const DetailCard = ({ title, value }) => (
    <div className="bg-white border border-slate-200/60 rounded-xl p-5 shadow-xs">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{title}</span>
      <span className="block text-sm font-semibold text-slate-850 break-words">{value || "—"}</span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to users navigation */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-850 transition-colors"
        >
          ← Back to users
        </Link>
      </div>

      {/* Profile Header info */}
      <div className="flex items-center gap-4 mb-10 mt-6">
        {/* Teal circular initials avatar */}
        <div className="w-16 h-16 rounded-full bg-teal-55/70 border border-teal-100/50 text-teal-700 font-bold flex items-center justify-center text-lg select-none">
          {getInitials(user.name)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 leading-tight">
            {user.name}
          </h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">
            @{user.username || "user"}
          </p>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <DetailCard title="EMAIL" value={user.email} />
        <DetailCard title="PHONE" value={user.phone} />
        <DetailCard title="WEBSITE" value={user.website} />
        <DetailCard title="COMPANY" value="" />
        <DetailCard title="CITY" value="" />
        <DetailCard title="STREET" value="" />
      </div>
    </div>
  );
}

export default UserDetailPage;
