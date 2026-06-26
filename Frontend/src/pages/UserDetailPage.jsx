import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

/**
 * UserDetailPage Component
 * Displays a clean profile layout placeholder for a single user.
 */
function UserDetailPage() {
  // Capture dynamic user ID from URL parameters
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back button link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Profile Card Container */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900">
          User Detailed Profile
        </h1>
        <p className="mt-1 text-slate-500">
          Currently inspecting profile card for user ID: <span className="font-mono font-semibold text-slate-800">{id}</span>
        </p>

        {/* Info Box Placeholder */}
        <div className="mt-8 p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3 font-semibold">
            👤
          </div>
          <p className="text-slate-400 font-medium">
            Full user contact information and addresses will be loaded here in Step 5.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetailPage;
