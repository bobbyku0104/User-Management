import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { 
  FiRefreshCw, 
  FiAlertCircle 
} from "react-icons/fi";
import { getUsers, deleteUser, createUser, updateUser } from "../api/users";
import TableSkeleton from "../components/TableSkeleton";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { getInitials } from "../components/utils";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users. Please check your connection.");
      toast.error("Could not load users list.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }

    const previousUsers = [...users];

    // Optimistically update UI instantly
    setUsers((prev) => prev.filter((user) => user.id !== id));

    const deletePromise = deleteUser(id).catch((err) => {
      // Revert back if API fails
      setUsers(previousUsers);
      throw err;
    });

    toast.promise(deletePromise, {
      loading: `Deleting ${name}...`,
      success: `Successfully deleted ${name}`,
      error: `Failed to delete ${name}.`,
    });
  };

  const handleOpenCreateModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    const isEdit = !!selectedUser;
    const previousUsers = [...users];

    // Create temporary UI data object
    const tempId = isEdit ? selectedUser.id : Date.now();
    const optimisticUser = { id: tempId, ...formData };

    // Update UI instantly
    if (isEdit) {
      setUsers((prev) => 
        prev.map((u) => (u.id === selectedUser.id ? optimisticUser : u))
      );
    } else {
      setUsers((prev) => [optimisticUser, ...prev]);
    }

    // Close modal instantly
    setIsModalOpen(false);

    const apiCall = isEdit 
      ? updateUser(selectedUser.id, formData)
      : createUser(formData);

    toast.promise(
      apiCall.catch((err) => {
        // Revert back if API fails
        setUsers(previousUsers);
        throw err;
      }),
      {
        loading: isEdit ? "Updating user details..." : "Saving new user profile...",
        success: isEdit ? "Profile updated successfully!" : "New user created successfully!",
        error: "Failed to save user profile.",
      }
    );
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
          onClick={handleOpenCreateModal}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-teal-800 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-teal-900 transition-colors"
        >
          <span className="text-lg font-bold leading-none">+</span> New user
        </button>
      </div>

      {/* Main dashboard content */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
          <TableSkeleton />
        </div>
      ) : error ? (
        <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-650 mb-4">
            <FiAlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Unable to load data</h3>
          <p className="mt-2 text-sm text-red-600/80">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            <FiRefreshCw className="w-4 h-4" /> Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {users.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              No users found.
            </div>
          ) : (
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
                          {/* Circle initial avatar */}
                          <div className="w-10 h-10 rounded-full font-bold text-sm bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100/50 select-none">
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <Link 
                              to={`/users/${user.id}`} 
                              className="font-bold text-slate-900 hover:text-blue-650 transition-colors"
                            >
                              {user.name}
                            </Link>
                            <div className="text-xs text-slate-400 mt-0.5 font-medium">
                              {user.email}
                            </div>
                            {/* Mobile responsive phone block */}
                            <div className="text-xs text-slate-400 mt-0.5 md:hidden">
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-slate-700 font-medium text-sm">{user.email}</span>
                      </td>

                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-slate-700 text-sm font-mono">{user.phone}</span>
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
                            onClick={() => handleOpenEditModal(user)}
                            className="rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold px-3 py-1.5 transition-colors"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(user.id, user.name)}
                            className="rounded-lg border border-red-200 bg-white text-red-650 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 transition-colors"
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
          )}
        </div>
      )}

      {/* Dynamic Create/Edit Modal popup */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? "Edit User Profile" : "Create New User"}
      >
        <UserForm
          initialData={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          submitLabel={selectedUser ? "Update Profile" : "Create Profile"}
        />
      </Modal>
    </div>
  );
}

export default HomePage;
