"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-brand-navy/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 font-shareTech text-xl font-bold tracking-wide">
              <span className="text-brand-navy">Dev</span>
              <span className="text-brand-green">Agile</span>
            </a>
            <p className="font-roboto font-light text-brand-navy/70 text-xs leading-relaxed">
              DevAgile is a dynamic group of software developers providing high-impact tech training bootcamps 
              and crafting premium software solutions for businesses.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-shareTech text-sm font-bold uppercase tracking-wider text-brand-navy">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="font-roboto text-xs font-light text-brand-navy/70 hover:text-brand-green transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="font-roboto text-xs font-light text-brand-navy/70 hover:text-brand-green transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#collaboration" className="font-roboto text-xs font-light text-brand-navy/70 hover:text-brand-green transition-colors duration-200">
                  Collaboration
                </a>
              </li>
              <li>
                <a href="#services" className="font-roboto text-xs font-light text-brand-navy/70 hover:text-brand-green transition-colors duration-200">
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h4 className="font-shareTech text-sm font-bold uppercase tracking-wider text-brand-navy">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="font-roboto text-xs font-light text-brand-navy/70">
                mail:{" "}
                <a href="mailto:hello@devagile.com" className="text-brand-green hover:underline font-normal">
                  mail@devagile.work
                </a>
              </li>
              <li className="font-roboto text-xs font-light text-brand-navy/70">
                Phone:{" "}
                <span href="mailto:bootcamps@devagile.com" className="text-brand-green hover:underline font-normal">
                  +91 8168365726
                </span>
              </li>
              <li className="font-roboto text-xs font-light text-brand-navy/70">
                Panipat , Haryana
              </li>
            </ul>
          </div>

          {/* Column 4: Social links */}
          <div className="space-y-4">
            <h4 className="font-shareTech text-sm font-bold uppercase tracking-wider text-brand-navy">
              Community
            </h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dev.agile/"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-brand-navy/5 border border-brand-navy/10 hover:border-brand-green text-brand-navy/75 hover:text-brand-green transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" clipRule="evenodd" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-brand-navy/5 border border-brand-navy/10 hover:border-brand-green text-brand-navy/75 hover:text-brand-green transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:adarsh@devagile.work"
                className="p-2 rounded-lg bg-brand-navy/5 border border-brand-navy/10 hover:border-brand-green text-brand-navy/75 hover:text-brand-green transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer segment */}
        <div className="border-t border-brand-navy/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-roboto text-[10px] font-light text-brand-navy/50">
            © {new Date().getFullYear()} DevAgile. All rights reserved.
          </p>
          <p className="font-shareTech text-[10px] font-bold text-brand-navy/50 uppercase tracking-widest">
            Crafted for Impact by Elite Software Engineers
          </p>
        </div>
      </div>
    </footer>
  );
}
