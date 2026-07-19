export default function FeaturedProjects() {
  return (
    <section id="projects" className="min-h-screen w-full flex flex-col justify-center bg-slate-50 relative overflow-hidden py-16 sm:py-24">
      <div className="max-w-[100vw] mx-auto relative z-10 overflow-hidden w-full">
        <div className="text-center px-6 lg:px-8">
          <h3 className="font-shareTech text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-navy uppercase mb-8">
            Featured Projects
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto">
            <a href="https://ppf.org.in" target="_blank" rel="noreferrer" className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col items-center gap-6 w-full shadow-sm group">
              <div className="w-full bg-brand-navy/5 rounded-lg p-4 flex items-center justify-center">
                <img src="/projects/policyperspectivefoundation.png" alt="Policy Perspective Foundation" className="w-full h-auto max-h-48 object-contain" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-roboto font-bold text-brand-navy text-xl group-hover:text-brand-green transition-colors">ppf.org.in</span>
                <svg className="w-5 h-5 text-brand-green transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </a>
            <a href="https://thevoiceofglaciers.org/" target="_blank" rel="noreferrer" className="glass-panel glass-panel-hover p-6 rounded-xl flex flex-col items-center gap-6 w-full shadow-sm group">
              <div className="w-full bg-brand-navy/5 rounded-lg p-4 flex items-center justify-center">
                <img src="/projects/thevoiceofglaciers.png" alt="The Voice of Glaciers" className="w-full h-auto max-h-48 object-contain" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <span className="font-roboto font-bold text-brand-navy text-xl group-hover:text-brand-green transition-colors">thevoiceofglaciers.org</span>
                <svg className="w-5 h-5 text-brand-green transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
