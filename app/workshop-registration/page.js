"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WorkshopRegistration() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [expectations, setExpectations] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("entry.1474281216", name);
      formData.append("entry.2123621516", contact);
      formData.append("entry.305079290", email);
      formData.append("entry.1657858962", expectations);

      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSc7l1uG5gTXejoQs1rVeWtZqpwnB97CTXPcXJTZYqN1WHqaMA/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      // Redirect to WhatsApp community upon success
      window.location.href = "https://chat.whatsapp.com/ESE3zZpJDKGEEgP4vMPabl";
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-brand-white relative overflow-hidden font-roboto p-2 sm:p-4">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-navy/5 blur-[120px]" />

      {/* Entering Pillars (Left Top - Navy) */}
      <div className="absolute left-[-40%] sm:left-[-30%] top-[-75vh] animate-pillar-left pointer-events-none" style={{ animationDelay: '0.1s' }}>
        <div className="w-16 sm:w-24 h-[250vh] bg-brand-navy shadow-[0_0_30px_rgba(3,48,87,0.5)] transform rotate-[35deg] border-l border-r border-brand-navy/60"></div>
      </div>
      <div className="absolute left-[-25%] sm:left-[-15%] top-[-75vh] animate-pillar-left pointer-events-none" style={{ animationDelay: '0.2s' }}>
        <div className="w-6 sm:w-8 h-[250vh] bg-brand-navy shadow-[0_0_30px_rgba(3,48,87,0.5)] transform rotate-[35deg] border-l border-r border-brand-navy/60"></div>
      </div>
      <div className="absolute left-[-10%] sm:left-[0%] top-[-75vh] animate-pillar-left pointer-events-none" style={{ animationDelay: '0.3s' }}>
        <div className="w-10 sm:w-16 h-[250vh] bg-brand-navy shadow-[0_0_30px_rgba(3,48,87,0.5)] transform rotate-[35deg] border-l border-r border-brand-navy/60"></div>
      </div>
      
      {/* Entering Pillars (Right Bottom - Green) */}
      <div className="absolute right-[-40%] sm:right-[-30%] top-[-75vh] animate-pillar-right pointer-events-none" style={{ animationDelay: '0.4s' }}>
        <div className="w-16 sm:w-24 h-[250vh] bg-brand-green shadow-[0_0_40px_rgba(89,202,147,0.5)] transform rotate-[35deg] border-l border-r border-brand-green/60"></div>
      </div>
      <div className="absolute right-[-25%] sm:right-[-15%] top-[-75vh] animate-pillar-right pointer-events-none" style={{ animationDelay: '0.5s' }}>
        <div className="w-8 sm:w-12 h-[250vh] bg-brand-green shadow-[0_0_40px_rgba(89,202,147,0.5)] transform rotate-[35deg] border-l border-r border-brand-green/60"></div>
      </div>
      <div className="absolute right-[-10%] sm:right-[0%] top-[-75vh] animate-pillar-right pointer-events-none" style={{ animationDelay: '0.6s' }}>
        <div className="w-12 sm:w-16 h-[250vh] bg-brand-green shadow-[0_0_40px_rgba(89,202,147,0.5)] transform rotate-[35deg] border-l border-r border-brand-green/60"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-4 sm:p-6 relative z-10 border border-brand-navy/10 max-h-[98dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="text-center mb-3 sm:mb-4">
          <Link href="/">
             <img src="/logos/completeLogo.png" alt="DevAgile Logo" className="h-6 sm:h-8 mx-auto mb-2 cursor-pointer" />
          </Link>
          <h2 className="text-base sm:text-lg font-bold text-brand-navy">
            Workshop Registration
          </h2>
          <p className="text-brand-navy/60 mt-0.5 text-[10px] sm:text-xs">
            Complete Web Development Workshop
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-xl text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2">
          <div>
            <label className="block text-[10px] sm:text-xs font-semibold text-brand-navy mb-0.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50 text-xs sm:text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold text-brand-navy mb-0.5 ml-1">
              Contact Number
            </label>
            <input
              type="tel"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50 text-xs sm:text-sm"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold text-brand-navy mb-0.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50 text-xs sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold text-brand-navy mb-0.5 ml-1">
              What are your expectations?
            </label>
            <textarea
              required
              value={expectations}
              onChange={(e) => setExpectations(e.target.value)}
              className="w-full px-3 py-1.5 sm:py-2 rounded-lg border border-brand-navy/20 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all bg-white/50 resize-none h-12 sm:h-16 text-xs sm:text-sm"
              placeholder="What do you want to learn from this workshop?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-navy text-white font-bold py-2 rounded-lg hover:bg-brand-navy/90 transition-all shadow-lg hover:shadow-brand-navy/20 disabled:opacity-70 flex justify-center items-center text-xs sm:text-sm mt-1 sm:mt-2"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Register & Join WhatsApp"
            )}
          </button>
        </form>

        <p className="mt-3 text-center text-[10px] sm:text-xs text-brand-navy/60">
          By registering, you will be automatically redirected to our WhatsApp community group.
        </p>
      </div>
    </div>
  );
}
