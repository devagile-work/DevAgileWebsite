"use client";

import { useState } from "react";

const ServicesForm = ({ setSuccess }) => {
  const handleSubmit = (e) => {
    const form = e.target;
    setTimeout(() => {
      setSuccess(true);
      form.reset();
    }, 1000);
  };

  return (
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSdkLhlMeP9vDHV14W441ygPUm2NhIXyJXuFXIywDPPMnl8UrA/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={handleSubmit}
      className="space-y-2.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Name</label>
          <input required type="text" name="entry.213925320" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Contact Email</label>
          <input required type="email" name="entry.993404023" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="john@example.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Contact Number</label>
          <input required type="text" name="entry.1580135531" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="+1 234 567 8900" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Service</label>
          <select required name="entry.1665116935" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors">
            <option value="Website Development">Website Development</option>
            <option value="App Development">App Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Custom Software">Custom Software</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Project Details</label>
        <textarea required name="entry.64802844" rows={2} className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors resize-none h-16" placeholder="Tell us about your project..." />
      </div>
      <button type="submit" className="w-full font-roboto font-bold bg-brand-navy text-white py-2 rounded-md hover:bg-brand-green hover:text-brand-navy transition-all duration-300 hover:shadow-md text-xs mt-2">
        Apply for Services
      </button>
    </form>
  );
};

const InstructorForm = ({ setSuccess }) => {
  const handleSubmit = (e) => {
    const form = e.target;
    setTimeout(() => {
      setSuccess(true);
      form.reset();
    }, 1000);
  };

  return (
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSfhaCb7ewT_SLlOb_bzCyQLNX9S_CngQsJUb57dP2QY_20ppg/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={handleSubmit}
      className="space-y-2.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Name</label>
          <input required type="text" name="entry.2068013820" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Company / College Name</label>
          <input required type="text" name="entry.831415371" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Tech Univ" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Contact Email</label>
          <input required type="email" name="entry.813993315" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Social Links (LinkedIn/GitHub)</label>
          <input required type="text" name="entry.1867667808" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="github.com/johndoe" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Motivation / Why join us?</label>
        <textarea required name="entry.136575172" rows={1} className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors resize-none h-12" placeholder="I am passionate about teaching and mentoring..." />
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Description / Expertise</label>
        <textarea required name="entry.254838391" rows={1} className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors resize-none h-12" placeholder="I specialize in React, Node.js, and Cloud Architecture..." />
      </div>
      <button type="submit" className="w-full font-roboto font-bold bg-brand-navy text-white py-2 rounded-md hover:bg-brand-green hover:text-brand-navy transition-all duration-300 hover:shadow-md text-xs mt-2">
        Submit Application
      </button>
    </form>
  );
};

const SponsorshipForm = ({ setSuccess }) => {
  const handleSubmit = (e) => {
    const form = e.target;
    setTimeout(() => {
      setSuccess(true);
      form.reset();
    }, 1000);
  };

  return (
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSe9wPQMxA2h4krTKupHjKLXWxkHauYuJumZB_CXp0EZSUAh-A/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Name</label>
          <input required type="text" name="entry.607383054" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Contact Number</label>
          <input required type="text" name="entry.1820425821" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="+1 234 567 8900" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">College Name</label>
        <input required type="text" name="entry.1513788118" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="State University" />
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Tech Club / Community</label>
        <input required type="text" name="entry.715980093" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Google Developer Student Club" />
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Social Links (Optional)</label>
        <input type="text" name="entry.1494519" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="linkedin.com/company/club" />
      </div>
      <button type="submit" className="w-full font-roboto font-bold bg-brand-navy text-white py-2 rounded-md hover:bg-brand-green hover:text-brand-navy transition-all duration-300 hover:shadow-md text-xs mt-2">
        Request Sponsorship
      </button>
    </form>
  );
};

const InternshipForm = ({ setSuccess }) => {
  const handleSubmit = (e) => {
    const form = e.target;
    setTimeout(() => {
      setSuccess(true);
      form.reset();
    }, 1000);
  };

  return (
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSf7Uv2a61ZGNpLxE-4J40mdK7xN0E0TtMe3s_i9UvoTXaycuQ/formResponse"
      method="POST"
      target="hidden_iframe"
      onSubmit={handleSubmit}
      className="space-y-2.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Name</label>
          <input required type="text" name="entry.1292295594" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Alex Smith" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Contact Number</label>
          <input required type="text" name="entry.342267939" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="+1 234 567 8900" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Domain</label>
          <select required name="entry.2113682125" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors">
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Game Development">Game Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Resume Link</label>
          <input required type="url" name="entry.748003001" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Drive / Portfolio URL" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">College Name</label>
          <input required type="text" name="entry.1762558419" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="State University" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Roll / Reg Number</label>
          <input required type="text" name="entry.603132079" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="CS2023-001" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">CGPA</label>
          <input required type="text" name="entry.1619279295" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="8.5" />
        </div>
        <div>
          <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Accolades / Achievements</label>
          <input type="text" name="entry.784677904" className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors" placeholder="Hackathon Winner..." />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold font-shareTech tracking-wider uppercase text-brand-navy/75 mb-0.5">Why are you the best fit?</label>
        <textarea required name="entry.2005667376" rows={1} className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-brand-navy text-xs focus:outline-none focus:border-brand-navy transition-colors resize-none h-12" placeholder="I have a strong foundation in..." />
      </div>
      <button type="submit" className="w-full font-roboto font-bold bg-brand-navy text-white py-2 rounded-md hover:bg-brand-green hover:text-brand-navy transition-all duration-300 hover:shadow-md text-xs mt-2">
        Apply for Internship
      </button>
    </form>
  );
};

export default function CollaborationSection() {
  const [activeForm, setActiveForm] = useState("services");
  const [successState, setSuccessState] = useState({ services: false, instructor: false, sponsorship: false, internship: false });

  const getInvolvedTypes = [
    {
      id: "services",
      title: "Apply for Services",
      desc: "Looking to build a website, app, or custom software? Let our expert team bring your vision to life.",
      Form: ServicesForm
    },
    {
      id: "instructor",
      title: "Apply for Instructor",
      desc: "We need high skilled instructors in different domains like App Dev, Game Dev, DSA, System Design, and AI/ML.",
      Form: InstructorForm
    },
    {
      id: "sponsorship",
      title: "Apply for Sponsorship",
      desc: "Tech clubs or colleges who are looking for sponsorships of events can contact us.",
      Form: SponsorshipForm
    },
    {
      id: "internship",
      title: "Internships",
      desc: "If you want to intern under us, and want to get hands-on experience on product code you can fill the form.",
      Form: InternshipForm
    }
  ];

  const activeFormObj = getInvolvedTypes.find((t) => t.id === activeForm);
  const ActiveFormComponent = activeFormObj.Form;

  const handleSetSuccess = (status) => {
    setSuccessState((prev) => ({ ...prev, [activeForm]: status }));
  };

  return (
    <section id="collaboration" className="h-screen w-full flex flex-col justify-center bg-slate-50 relative overflow-hidden py-4">
      {/* Background shape */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-green/10 blur-[120px] z-0 animate-pulse-glow" />

      {/* Hidden iframe for form submission without redirect */}
      <iframe name="hidden_iframe" id="hidden_iframe" className="hidden" title="hidden_iframe" style={{ display: "none" }}></iframe>

      <div className="max-w-7xl mx-auto px-10 md:px-16 lg:px-24 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-4 lg:mb-6 space-y-2">
          <h2 className="font-shareTech text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy uppercase">
            Get Involved
          </h2>
          <div className="h-1 w-16 bg-brand-green mx-auto rounded-full" />
          <p className="font-roboto font-light text-brand-navy/80 text-sm sm:text-base leading-relaxed pt-1">
            Whether you want to teach, partner up, or build with us, we have a place for you. Choose a track below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
          {/* Left Side: Collaboration details */}
          <div className="md:col-span-5 space-y-2 flex flex-col">
            {getInvolvedTypes.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveForm(option.id)}
                className={`text-left p-3 lg:p-4 rounded-xl border transition-all duration-300 w-full group flex-1 flex flex-col justify-center ${
                  activeForm === option.id
                    ? "border-brand-navy bg-brand-navy shadow-lg"
                    : "border-slate-200 hover:border-brand-navy/30 bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div
                    className={`p-1.5 rounded-lg border flex-shrink-0 mt-0.5 transition-colors ${
                      activeForm === option.id
                        ? "bg-white/10 border-white/20 text-brand-green"
                        : "bg-brand-navy/5 border-brand-navy/15 text-brand-navy group-hover:bg-brand-navy/10"
                    }`}
                  >
                    {option.id === "services" && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    )}
                    {option.id === "instructor" && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )}
                    {option.id === "sponsorship" && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )}
                    {option.id === "internship" && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="space-y-1 text-left">
                    <h3
                      className={`font-shareTech text-base font-bold tracking-wide uppercase transition-colors ${
                        activeForm === option.id ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {option.title}
                    </h3>
                    <p
                      className={`font-roboto font-light text-xs leading-relaxed transition-colors line-clamp-2 ${
                        activeForm === option.id ? "text-slate-300" : "text-brand-navy/70"
                      }`}
                    >
                      {option.desc}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side: Quick Contact form */}
          <div className="md:col-span-7 flex items-stretch h-full">
            <div className="w-full glass-panel p-4 lg:p-5 rounded-xl border border-brand-navy/10 flex flex-col shadow-sm bg-white min-h-[300px] h-full overflow-y-auto hide-scrollbar">
              <div className="mb-4 border-b border-slate-100 pb-3">
                <h3 className="font-shareTech text-lg font-bold text-brand-navy uppercase tracking-wide">
                  {activeFormObj.title}
                </h3>
                <p className="font-roboto font-light text-brand-navy/70 text-[11px] mt-0.5">
                  Fill out the fields below and we&apos;ll get back to you shortly.
                </p>
              </div>

              <div className="flex-grow flex flex-col justify-center">
                {successState[activeForm] ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/20 text-brand-green mb-1">
                      <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-shareTech text-base font-bold text-brand-navy">Form Submitted Successfully!</h4>
                    <p className="font-roboto font-light text-brand-navy/60 text-[11px] px-6 max-w-sm">
                      Thanks for reaching out! We have received your response and will review it soon.
                    </p>
                    <button
                      onClick={() => handleSetSuccess(false)}
                      className="mt-3 font-roboto text-[11px] font-bold text-brand-navy hover:text-brand-green transition-colors underline"
                    >
                      Submit another response
                    </button>
                  </div>
                ) : (
                  <ActiveFormComponent setSuccess={handleSetSuccess} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
