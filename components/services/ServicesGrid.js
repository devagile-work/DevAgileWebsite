export default function ServicesGrid() {
  const services = [
    {
      title: "UI/UX Design",
      desc: "Creating high-fidelity wireframes, interactive user flows, and modern design systems. We focus on vibrant, responsive, and accessible layouts that capture attention.",
      tag: "Design",
      icon: (
        <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      title: "Web Applications",
      desc: "Building highly-optimized, secure, and SEO-friendly web platforms using modern frameworks like Next.js, React, and Tailwind CSS for flawless performance.",
      tag: "Web Dev",
      icon: (
        <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Android Applications",
      desc: "Crafting native Android mobile apps with Kotlin. We guarantee clean code structures, smooth background tasks, off-line functionality, and Play Store compliance.",
      tag: "Mobile",
      icon: (
        <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Custom Development",
      desc: "Engineering custom backend engines, secure API integrations, relational and non-relational database models, and internal operational dashboards.",
      tag: "Back-End",
      icon: (
        <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Cloud Deployment",
      desc: "Setting up continuous integration and deployment (CI/CD) pipelines, serverless infrastructures, Docker containers, and robust hosting on Vercel, AWS, or GCP.",
      tag: "DevOps",
      icon: (
        <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full pb-8 px-4 lg:px-8 max-w-[95rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between shadow-sm bg-white"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-brand-navy/5 border border-brand-navy/5">
                  {service.icon}
                </div>
                <span className="font-shareTech text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-navy/70">
                  {service.tag}
                </span>
              </div>
              
              <h3 className="font-shareTech text-lg sm:text-xl font-bold text-brand-navy tracking-wide">
                {service.title}
              </h3>
              
              <p className="font-roboto font-light text-brand-navy/75 text-xs sm:text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>

            <div className="border-t border-brand-navy/5 mt-6 pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-navy font-shareTech">
              <span>Production Grade</span>
              <svg className="w-3 h-3 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
