"use client";

export default function AboutSection() {
  const pillars = [
    {
      title: "Impactful Bootcamps",
      subtitle: "For Tech Enthusiasts",
      description:
        "Comprehensive coding bootcamps bridging traditional learning and active software production.",
      features: ["Practical Projects", "Elite Mentorship", "Web & Android"],
      icon: (
        <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Custom Software",
      subtitle: "For High-Growth Companies",
      description:
        "Tailored software architectures, handling everything from conception to deployment.",
      features: ["Full Architecture", "Agile Execution", "Native & Next.js"],
      icon: (
        <svg className="w-6 h-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  const roadmapSteps = [
    {
      phase: "Phase 1: Foundation",
      title: "Developer Network",
      status: "Completed",
      desc: "Gathered elite software developers to form our core operational framework.",
      active: false,
    },
    {
      phase: "Phase 2: Active Engines",
      title: "Bootcamps & Custom Software",
      status: "Active",
      desc: "Running high-impact training bootcamps and building custom client softwares.",
      active: true,
    },
    {
      phase: "Phase 3: Productization",
      title: "In-House Softwares",
      status: "Upcoming",
      desc: "Developing and releasing proprietary software solutions in the coming days.",
      active: false,
    },
  ];

  return (
    <section id="about" className="py-16 bg-slate-50 relative overflow-hidden">
      {/* Injecting minimal custom animations for the floating tech elements */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.3; } }
        .anim-float { animation: float 6s ease-in-out infinite; }
        .anim-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        .anim-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
      `}} />

      {/* Background shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/5 blur-[120px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* ======================================= */}
        {/* LEFT SIDE: COMPACT CONTENT              */}
        {/* ======================================= */}
        <div className="w-full lg:w-7/12 space-y-12">
          
          {/* Header */}
          <div>
            <h2 className="font-shareTech text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy uppercase mb-3">
              Who We Are
            </h2>
            <div className="h-1 w-16 bg-brand-green rounded-full mb-4" />
            <p className="font-roboto font-light text-brand-navy/80 text-base leading-relaxed">
              DevAgile is a dynamic group of software developers driving change through education 
              and modern technical craftsmanship.
            </p>
          </div>

          {/* Compact Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-white p-6 rounded-xl shadow-sm border border-brand-navy/5 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-brand-navy/5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-shareTech text-lg font-bold text-brand-navy leading-tight">{pillar.title}</h3>
                    <span className="font-shareTech text-[10px] font-bold uppercase tracking-wider text-brand-navy/60">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>
                <p className="font-roboto font-light text-brand-navy/75 text-sm mb-4 flex-grow">
                  {pillar.description}
                </p>
                <ul className="space-y-1.5 mt-auto border-t border-brand-navy/5 pt-3">
                  {pillar.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-brand-navy/85 font-roboto">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>


        </div>

        {/* ======================================= */}
        {/* RIGHT SIDE: ANIMATED TECH VISUAL        */}
        {/* ======================================= */}
        <div className="w-full lg:w-5/12 h-[450px] relative hidden md:flex items-center justify-center">
          
          {/* Main Floating Terminal Window */}
          <div className="relative z-20 w-full max-w-sm bg-[#0A192F] rounded-lg shadow-2xl border border-brand-green/20 overflow-hidden anim-float">
            {/* Window Controls */}
            <div className="flex items-center px-4 py-2 bg-[#112240] border-b border-white/5">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto font-mono text-[10px] text-white/40">devagile-engine.sh</div>
            </div>
            {/* Code Content */}
            <div className="p-5 font-mono text-xs leading-relaxed text-brand-green/90">
              <p className="opacity-70 text-white/60 mb-2">Initializing DevAgile Core</p>
              <p><span className="text-purple-400">const</span> <span className="text-blue-400">system</span> = <span className="text-yellow-200">boot()</span>;</p>
              <p className="mt-2"><span className="text-purple-400">await</span> system.<span className="text-blue-400">deploy</span>({`{`}</p>
              <p className="pl-4">module: <span className="text-orange-300">&apos; Bootcamps &apos;</span>,</p>
              <p className="pl-4">status: <span className="text-orange-300">&apos; Active &apos;</span>,</p>
              <p className="pl-4">students: <span className="text-green-400">100+</span></p>
              <p>{`}`});</p>
              <p className="mt-2 text-white/50">&gt; Building custom software architectures...</p>
              <p className="text-white/50">&gt; Compiling native platforms...</p>
              <div className="mt-4 flex items-center">
                <span className="text-brand-green mr-2">System Ready</span>
                <span className="w-2 h-4 bg-brand-green animate-pulse" />
              </div>
            </div>
          </div>

          {/* Background Floating Element - Agile Card */}
          <div className="absolute top-10 right-4 z-10 w-48 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-4 anim-float-delayed">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded bg-brand-green/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-shareTech text-xs font-bold text-brand-navy">Agile Sprint</span>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green w-3/4 rounded-full" />
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-navy/40 w-1/2 rounded-full" />
              </div>
            </div>
          </div>

          {/* Decorative Code Nodes */}
          <div className="absolute bottom-16 left-0 z-30 w-12 h-12 bg-white rounded-xl shadow-xl border border-brand-green/20 flex items-center justify-center anim-float-delayed" style={{ animationDelay: '1s' }}>
            <svg className="w-6 h-6 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}