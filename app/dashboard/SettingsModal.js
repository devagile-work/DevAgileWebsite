"use client";

import { useState } from "react";

export default function SettingsModal({ isOpen, onClose, hasPassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: hasPassword ? oldPassword : null,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // Close modal after a short delay
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm px-4">
      <div className="bg-brand-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-brand-navy/10 flex justify-between items-center bg-brand-green/10">
          <h2 className="text-xl font-bold text-brand-navy font-shareTech uppercase tracking-wide">
            Account Settings
          </h2>
          <button 
            onClick={onClose}
            className="text-brand-navy/50 hover:text-brand-navy transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-sm font-bold text-brand-navy mb-4 font-shareTech uppercase border-b border-brand-navy/10 pb-2">
            {hasPassword ? "Change Password" : "Set Password"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-brand-green text-xs font-bold p-3 rounded-lg border border-brand-green/30">
                {success}
              </div>
            )}

            {hasPassword && (
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1 font-shareTech">Current Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-white border border-brand-navy/20 rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1 font-shareTech">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-white border border-brand-navy/20 rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1 font-shareTech">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-brand-white border border-brand-navy/20 rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green text-brand-navy font-bold py-2.5 rounded-lg hover:bg-brand-green/90 transition-all shadow-md mt-6 flex justify-center items-center gap-2 font-shareTech uppercase tracking-wide disabled:opacity-70"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-brand-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span>Save Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
