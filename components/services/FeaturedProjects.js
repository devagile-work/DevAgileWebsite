export default function FeaturedProjects() {
  const projects = [
    {
      name: "Policy Perspective Foundation",
      url: "https://ppf.org.in",
      image: "/projects/policyperspectivefoundation.png",
    },
    {
      name: "The Voice Of Glacier Foundation",
      url: "https://thevoiceofglaciers.org/",
      image: "/projects/thevoiceofglaciers.png",
    }
  ];

  return (
    <section id="projects" className="w-full flex flex-col justify-center bg-[#F4F7FA] relative overflow-hidden py-10 sm:py-16">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(89,202,147,0.05),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(3,48,87,0.05),transparent_50%)] z-0" />

      <div className="max-w-3xl mx-auto relative z-10 overflow-hidden w-full px-8 md:px-12 lg:px-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10 space-y-2">
          <h2 className="font-shareTech text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy uppercase">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-brand-navy mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 w-full">
          {projects.map((project, index) => (
            <a 
              key={index}
              href={project.url} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex flex-col bg-[#051C35] rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_15px_40px_rgba(3,48,87,0.2)] hover:-translate-y-1.5 transition-all duration-500 border border-brand-navy/20 hover:border-brand-green/40 aspect-square"
            >
              
              {/* Image Header Area */}
              <div className="relative flex-1 w-full bg-[#031326] overflow-hidden min-h-0">
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                
                {/* Project Image */}
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-[1.05] transition-transform duration-700 z-0" 
                />
                
                {/* Live Badge */}
                <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/10 z-20">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse shadow-[0_0_8px_rgba(89,202,147,0.8)]"></span>
                   <span className="text-[9px] font-shareTech font-bold text-white uppercase tracking-widest">Live Now</span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-4 md:p-6 flex flex-col gap-3 shrink-0 z-20 bg-[#051C35]">
                
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-roboto font-bold text-sm md:text-base text-white group-hover:text-brand-green transition-colors truncate pr-2">
                    {project.name}
                  </h4>
                  
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 shrink-0">
                    <span className="font-roboto font-bold text-[10px] text-yellow-500">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-2.5 h-2.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Visit Link */}
                <div className="flex items-center gap-1.5 text-white/70 font-bold text-[10px] uppercase tracking-widest group-hover:text-brand-green transition-colors">
                  Visit Website 
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
