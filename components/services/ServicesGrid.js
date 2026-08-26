export default function ServicesGrid() {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Creating high-fidelity wireframes, interactive user flows, and modern design systems. We focus on vibrant, responsive, and accessible layouts that capture attention.",
      tag: "Design",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: "Web Applications",
      desc: "Building highly-optimized, secure, and SEO-friendly web platforms using modern frameworks like Next.js, React, and Tailwind CSS for flawless performance.",
      tag: "Web Dev",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Android Applications",
      desc: "Crafting native Android mobile apps with Kotlin. We guarantee clean code structures, smooth background tasks, off-line functionality, and Play Store compliance.",
      tag: "Mobile",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Custom Development",
      desc: "Engineering custom backend engines, secure API integrations, relational and non-relational database models, and internal operational dashboards.",
      tag: "Back-End",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Cloud Deployment",
      desc: "Setting up continuous integration and deployment (CI/CD) pipelines, serverless infrastructures, Docker containers, and robust hosting on Vercel, AWS, or GCP.",
      tag: "DevOps",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full pb-8 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="relative overflow-hidden group bg-white p-4 md:p-6 rounded-2xl shadow-[0_8px_30px_rgba(3,48,87,0.06)] hover:shadow-[0_15px_40px_rgba(3,48,87,0.15)] transition-all duration-500 min-h-[220px] flex flex-col justify-start cursor-pointer"
          >
            {/* The Expanding Hover Circle */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-navy rounded-bl-[100%] border-b-[2px] md:border-b-[3px] border-l-[2px] md:border-l-[3px] border-brand-green group-hover:scale-[30] group-hover:rounded-none group-hover:border-transparent origin-top-right transition-all duration-[1200ms] ease-in-out z-0"></div>

            {/* Content (z-10 to stay above the expanding circle) */}
            <div className="relative z-10 flex flex-col flex-1 h-full">
              
              {/* Icon Container */}
              <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:bg-brand-white transition-colors duration-[1200ms] ease-in-out shrink-0">
                <div className="scale-90 text-white group-hover:text-brand-navy transition-colors duration-[1200ms] ease-in-out">
                  {service.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="space-y-1 mb-3 flex-1">
                <h3 className="font-shareTech text-base md:text-lg font-bold text-brand-navy group-hover:text-white transition-colors duration-[1200ms] ease-in-out tracking-tight leading-tight">
                  {service.title}
                </h3>
                
                <p className="font-roboto font-light text-brand-navy/70 group-hover:text-white/80 transition-colors duration-[1200ms] ease-in-out text-[11px] md:text-xs leading-snug">
                  {service.desc}
                </p>
              </div>

              {/* Learn More Link */}
              <div className="mt-auto">
                <a href="#" className="font-roboto font-bold text-[10px] md:text-xs text-brand-navy group-hover:text-brand-white border-b border-brand-navy group-hover:border-brand-white pb-0.5 transition-all duration-[1200ms] ease-in-out inline-block uppercase tracking-wider">
                  Learn More
                </a>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
