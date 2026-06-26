import React, { useState } from "react";

function UserForm({ initialData = null, onSubmit, onCancel, submitLabel = "Save" }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Basic format: must not be empty
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Leanne Graham"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
            errors.name ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-slate-200 focus:border-blue-550"
          }`}
        />
        {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-650">{errors.name}</p>}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. leanne@example.com"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
            errors.email ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-slate-200 focus:border-blue-550"
          }`}
        />
        {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-650">{errors.email}</p>}
      </div>

      {/* Phone Input */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 1-770-736-8031 x56442"
          className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
            errors.phone ? "border-red-300 bg-red-50/10 focus:border-red-500" : "border-slate-200 focus:border-blue-550"
          }`}
        />
        {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-650">{errors.phone}</p>}
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-650 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4.5 py-2.5 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
