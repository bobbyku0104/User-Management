import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import TableSkeleton from "../components/TableSkeleton";
import { getInitials } from "../components/utils";

// User management dashboard (CRUD operations)
export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Modal state: null = closed, {} = creating, user object = editing
  const [editing, setEditing] = useState(null);

  // Load users from cache or API
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const cached = localStorage.getItem("users");
      if (cached) {
        setUsers(JSON.parse(cached));
      } else {
        const data = await getUsers();
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      }
    } catch (err) {
      setError("Could not load users. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Create or Update user
  const handleSave = async (formData) => {
    setSubmitting(true);
    try {
      if (editing && editing.id) {
        if (editing.id <= 10) {
          await updateUser(editing.id, { ...editing, ...formData });
        }
        setUsers((prev) => {
          const next = prev.map((u) => (u.id === editing.id ? { ...u, ...formData } : u));
          localStorage.setItem("users", JSON.stringify(next));
          return next;
        });
        toast.success(`${formData.name} updated`);
      } else {
        await createUser(formData);
        const newUser = {
          ...formData,
          id: Date.now(),
        };
        setUsers((prev) => {
          const next = [newUser, ...prev];
          localStorage.setItem("users", JSON.stringify(next));
          return next;
        });
        toast.success(`${formData.name} created`);
      }
      setEditing(null);
    } catch (err) {
      toast.error("Save failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete user
  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}? This cannot be undone.`)) return;
    try {
      if (user.id <= 10) {
        await deleteUser(user.id);
      }
      setUsers((prev) => {
        const next = prev.filter((u) => u.id !== user.id);
        localStorage.setItem("users", JSON.stringify(next));
        return next;
      });
      toast.success(`${user.name} deleted`);
    } catch (err) {
      toast.error("Delete failed. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Description Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Users
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Manage your team — create, edit, and remove users.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal-800 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-teal-900 transition-colors"
          onClick={() => setEditing({})}
        >
          <span className="text-lg font-bold leading-none">+</span> New user
        </button>
      </div>

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
            <FiAlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Unable to load data</h3>
          <p className="mt-2 text-sm text-red-650">{error}</p>
          <button
            onClick={loadUsers}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            <FiRefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
          <TableSkeleton />
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && users.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-12 text-center text-slate-400">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No users yet</h3>
          <p className="text-sm">Click “New user” to add your first one.</p>
        </div>
      )}

      {/* User table */}
      {!loading && !error && users.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 hidden md:table-cell">Phone</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full font-bold text-sm bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100/50 select-none">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 hover:text-blue-650 transition-colors">
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 font-medium">{user.email}</div>
                          {/* Mobile responsive phone block */}
                          <div className="text-xs text-slate-400 mt-0.5 md:hidden">
                            {user.phone || "—"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-slate-700 font-medium text-sm">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-slate-700 text-sm font-mono">{user.phone || "—"}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/users/${user.id}`}
                          className="rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-1.5 transition-colors inline-block"
                        >
                          View
                        </Link>
                        <button
                          className="rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-1.5 transition-colors"
                          onClick={() => setEditing(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 transition-colors"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create or Edit modal */}
      {editing !== null && (
        <Modal
          isOpen={editing !== null}
          title={editing.id ? "Edit User Profile" : "Create New User"}
          onClose={() => setEditing(null)}
        >
          <UserForm
            initialData={editing.id ? editing : null}
            onSubmit={handleSave}
            onCancel={() => setEditing(null)}
            submitLabel={editing.id ? "Update Profile" : "Create Profile"}
          />
        </Modal>
      )}
    </div>
  );
}
