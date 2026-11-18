"use client";

import { useState, useEffect } from "react";

export default function RegisterModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("bootcamp"); // "bootcamp" or "services"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Bootcamp specific
    track: "web",
    experience: "beginner",
    // Services specific
    companyName: "",
    projectType: "web-app",
    details: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    if (activeTab === "services" && !formData.companyName.trim()) {
      newErrors.companyName = "Company/Organization name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const whatsappPhone = "918168365726";
      let message = "";
      if (activeTab === "bootcamp") {
        message = `*New Bootcamp Application - DevAgile*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Track:* ${formData.track}
*Experience:* ${formData.experience}`;
      } else {
        message = `*New Service Inquiry - DevAgile*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Company Name:* ${formData.companyName}
*Project Type:* ${formData.projectType}
*Details:* ${formData.details}`;
      }

      const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      setWhatsAppUrl(url);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      track: "web",
      experience: "beginner",
      companyName: "",
      projectType: "web-app",
      details: "",
    });
    setErrors({});
    setIsSubmitted(false);
    setWhatsAppUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={resetForm}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 z-10 animate-float-delayed max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="font-shareTech text-2xl font-bold tracking-wide text-brand-navy">
            {isSubmitted ? "Registration Successful" : "Connect with DevAgile"}
          </h2>
          <button
            onClick={resetForm}
            className="text-brand-navy/40 hover:text-brand-navy transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green/20 text-brand-green mb-4">
                <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-shareTech text-xl font-bold text-brand-navy">Thank you, {formData.name}!</h3>
              <p className="font-roboto font-light text-brand-navy/70 text-sm max-w-sm mx-auto">
                {activeTab === "bootcamp"
                  ? "We've received your bootcamp application. Our training leads will email you details and interview schedule within 24 hours."
                  : "We've received your service request. A DevAgile software architect will reach out via email to schedule a technical discovery call."}
              </p>
              {whatsAppUrl && (
                <div className="pt-2">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-roboto text-xs font-bold bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#1ebd59] transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              )}
              <button
                onClick={resetForm}
                className="mt-6 font-roboto font-bold bg-brand-navy text-white px-6 py-2.5 rounded-lg hover:bg-brand-green hover:text-brand-navy transition-colors duration-300"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tab Selector */}
              <div className="flex bg-slate-100 border border-slate-200/50 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("bootcamp")}
                  className={`flex-1 font-roboto text-sm py-2 rounded-md transition-all duration-200 ${
                    activeTab === "bootcamp"
                      ? "bg-brand-navy text-white font-bold"
                      : "text-brand-navy/60 hover:text-brand-navy"
                  }`}
                >
                  Join Bootcamp
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("services")}
                  className={`flex-1 font-roboto text-sm py-2 rounded-md transition-all duration-200 ${
                    activeTab === "services"
                      ? "bg-brand-navy text-white font-bold"
                      : "text-brand-navy/60 hover:text-brand-navy"
                  }`}
                >
                  Software Services
                </button>
              </div>

              {/* Shared Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 font-roboto">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-roboto">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-roboto">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Bootcamp Specific Fields */}
              {activeTab === "bootcamp" && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                        Bootcamp Track
                      </label>
                      <select
                        name="track"
                        value={formData.track}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      >
                        <option value="web">Fullstack Web (Next.js)</option>
                        <option value="android">Android Apps (Kotlin)</option>
                        <option value="design">UI/UX Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                        Coding Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      >
                        <option value="beginner">Beginner (No coding)</option>
                        <option value="intermediate">Intermediate (Know basics)</option>
                        <option value="advanced">Advanced developer</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Specific Fields */}
              {activeTab === "services" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      placeholder="Your company name"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1 font-roboto">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                        Project Type
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm"
                      >
                        <option value="web-app">Custom Web Application</option>
                        <option value="android-app">Android Mobile App</option>
                        <option value="ui-design">UI/UX Design overhaul</option>
                        <option value="mvp">MVP Product Build</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-shareTech tracking-wider uppercase text-brand-navy/70 mb-1">
                        Details / Brief
                      </label>
                      <textarea
                        name="details"
                        rows={1}
                        value={formData.details}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-brand-navy focus:outline-none focus:border-brand-navy font-roboto text-sm resize-none"
                        placeholder="Project goals, timeline..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full font-roboto font-bold bg-brand-navy text-white py-3 rounded-lg hover:bg-brand-green hover:text-brand-navy transition-all duration-300 hover:shadow-[0_4px_15px_rgba(3,48,87,0.2)] mt-4"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
