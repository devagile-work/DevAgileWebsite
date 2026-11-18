"use client";

import { useState } from "react";

const WHATSAPP_CONTACT = "918168365726";

const sendToWhatsApp = (message) => {
  const url = `https://wa.me/${WHATSAPP_CONTACT}?text=${encodeURIComponent(message)}`;
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return url;
};

const ServicesForm = ({ setSuccess }) => {
  const handleSubmit = (e) => {
    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("entry.213925320") || form.elements["entry.213925320"]?.value || "";
    const email = formData.get("entry.993404023") || form.elements["entry.993404023"]?.value || "";
    const phone = formData.get("entry.1580135531") || form.elements["entry.1580135531"]?.value || "";
    const service = formData.get("entry.1665116935") || form.elements["entry.1665116935"]?.value || "";
    const details = formData.get("entry.64802844") || form.elements["entry.64802844"]?.value || "";

    const message = `*New Service Inquiry - DevAgile*
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Service:* ${service}
*Project Details:*
${details}`;

    const whatsappUrl = sendToWhatsApp(message);

    setTimeout(() => {
      setSuccess(true, whatsappUrl);
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
    const formData = new FormData(form);

    const name = formData.get("entry.2068013820") || form.elements["entry.2068013820"]?.value || "";
    const company = formData.get("entry.831415371") || form.elements["entry.831415371"]?.value || "";
    const email = formData.get("entry.813993315") || form.elements["entry.813993315"]?.value || "";
    const social = formData.get("entry.1867667808") || form.elements["entry.1867667808"]?.value || "";
    const motivation = formData.get("entry.136575172") || form.elements["entry.136575172"]?.value || "";
    const expertise = formData.get("entry.254838391") || form.elements["entry.254838391"]?.value || "";

    const message = `*New Instructor Application - DevAgile*
*Name:* ${name}
*Company / College:* ${company}
*Email:* ${email}
*Social Links:* ${social}
*Motivation:*
${motivation}
*Expertise:*
${expertise}`;

    const whatsappUrl = sendToWhatsApp(message);

    setTimeout(() => {
      setSuccess(true, whatsappUrl);
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
    const formData = new FormData(form);

    const name = formData.get("entry.607383054") || form.elements["entry.607383054"]?.value || "";
    const phone = formData.get("entry.1820425821") || form.elements["entry.1820425821"]?.value || "";
    const college = formData.get("entry.1513788118") || form.elements["entry.1513788118"]?.value || "";
    const club = formData.get("entry.715980093") || form.elements["entry.715980093"]?.value || "";
    const social = formData.get("entry.1494519") || form.elements["entry.1494519"]?.value || "N/A";

    const message = `*New Sponsorship Request - DevAgile*
*Name:* ${name}
*Phone:* ${phone}
*College:* ${college}
*Tech Club / Community:* ${club}
*Social Links:* ${social}`;

    const whatsappUrl = sendToWhatsApp(message);

    setTimeout(() => {
      setSuccess(true, whatsappUrl);
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
    const formData = new FormData(form);

    const name = formData.get("entry.1292295594") || form.elements["entry.1292295594"]?.value || "";
    const phone = formData.get("entry.342267939") || form.elements["entry.342267939"]?.value || "";
    const domain = formData.get("entry.2113682125") || form.elements["entry.2113682125"]?.value || "";
    const resume = formData.get("entry.748003001") || form.elements["entry.748003001"]?.value || "";
    const college = formData.get("entry.1762558419") || form.elements["entry.1762558419"]?.value || "";
    const rollNo = formData.get("entry.603132079") || form.elements["entry.603132079"]?.value || "";
    const cgpa = formData.get("entry.1619279295") || form.elements["entry.1619279295"]?.value || "";
    const accolades = formData.get("entry.784677904") || form.elements["entry.784677904"]?.value || "N/A";
    const whyFit = formData.get("entry.2005667376") || form.elements["entry.2005667376"]?.value || "";

    const message = `*New Internship Application - DevAgile*
*Name:* ${name}
*Contact Number:* ${phone}
*Domain:* ${domain}
*Resume Link:* ${resume}
*College Name:* ${college}
*Roll / Reg Number:* ${rollNo}
*CGPA:* ${cgpa}
*Accolades / Achievements:* ${accolades}
*Why Best Fit:*
${whyFit}`;

    const whatsappUrl = sendToWhatsApp(message);

    setTimeout(() => {
      setSuccess(true, whatsappUrl);
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
  const [whatsAppUrls, setWhatsAppUrls] = useState({ services: "", instructor: "", sponsorship: "", internship: "" });

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

  const handleSetSuccess = (status, whatsappUrl = "") => {
    setSuccessState((prev) => ({ ...prev, [activeForm]: status }));
    if (whatsappUrl) {
      setWhatsAppUrls((prev) => ({ ...prev, [activeForm]: whatsappUrl }));
    }
  };

  return (
    <section id="collaboration" className="min-h-screen w-full flex flex-col justify-center bg-slate-50 relative overflow-hidden py-16 sm:py-24">
      {/* Anchor for contact us section */}
      <div id="contact" className="absolute -top-12 left-0 pointer-events-none" />

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
                    {whatsAppUrls[activeForm] && (
                      <a
                        href={whatsAppUrls[activeForm]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-roboto text-xs font-bold bg-[#25D366] text-white px-3.5 py-1.5 rounded-md hover:bg-[#1ebd59] transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
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
