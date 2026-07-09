import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { INTERNSHIPS } from "../../lib/internshipData";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginAndSignUp");
  }

  const bootcamps = INTERNSHIPS;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-white font-roboto">
      {/* Sidebar / Topbar */}
      <aside className="w-full lg:w-64 bg-brand-white border-b lg:border-b-0 lg:border-r border-brand-navy/10 flex flex-col p-4 lg:p-6 sticky top-0 lg:h-screen overflow-y-auto z-20 shadow-[4px_0_24px_rgba(3,48,87,0.05)]">
        {/* Profile Info */}
        <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mb-6 mt-2 gap-4 lg:gap-0">
          <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
            <div className="relative group cursor-pointer lg:mb-3">
               <div className="absolute inset-0 bg-brand-green rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              {session.user?.image ? (
                 <img src={session.user.image} alt={session.user.name} className="w-12 h-12 lg:w-16 lg:h-16 rounded-full shadow-md object-cover relative z-10 border-2 border-brand-white" />
              ) : (
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full shadow-md bg-gradient-to-br from-brand-green/30 to-brand-green/10 flex items-center justify-center text-brand-navy text-2xl font-bold uppercase relative z-10 border-2 border-brand-white font-shareTech">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="text-left lg:text-center">
              <h2 className="text-base lg:text-lg font-bold text-brand-navy line-clamp-1 w-full px-1 font-shareTech">{session.user?.name}</h2>
              <p className="text-xs text-brand-navy/60 line-clamp-1 w-full px-1 font-medium">{session.user?.email}</p>
            </div>
          </div>
          
          {/* Mobile Logout (only shows on mobile) */}
          <div className="lg:hidden">
            <LogoutButton className="flex justify-center items-center gap-1 border border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-brand-white px-3 py-1.5 rounded-lg transition-all font-bold shadow-sm text-xs font-shareTech" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-row lg:flex-col gap-2 lg:gap-0 lg:space-y-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Link href="/dashboard" className="flex items-center gap-2 text-brand-navy bg-brand-green/20 border border-brand-green/30 px-3 py-2 lg:p-3 rounded-xl transition-all font-bold shadow-sm font-shareTech text-sm whitespace-nowrap">
            <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>
          <button className="flex items-center gap-2 text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/5 px-3 py-2 lg:p-3 rounded-xl transition-all font-semibold font-shareTech text-sm whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>

        {/* Desktop Logout */}
        <div className="hidden lg:block mt-auto pt-4 border-t border-brand-navy/10">
          <LogoutButton className="w-full flex justify-center items-center gap-2 border-2 border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-brand-white p-2.5 rounded-xl transition-all font-bold shadow-sm font-shareTech text-sm" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
        {/* Decorative background blobs */}
        <div className="fixed top-[-5%] right-[-5%] w-64 h-64 rounded-full bg-brand-green/20 blur-[100px] pointer-events-none" />
        <div className="fixed bottom-[-5%] left-[20%] w-[300px] h-[300px] rounded-full bg-brand-navy/10 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-6 bg-brand-white/80 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-brand-white shadow-sm">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-brand-navy mb-0.5 tracking-tight font-shareTech uppercase">My Internships</h1>
              <p className="text-brand-navy/70 font-medium text-xs lg:text-sm">Continue your learning journey</p>
            </div>
            <Link href="/" className="hover:scale-105 transition-transform">
              <img src="/logos/completeLogo.png" alt="DevAgile Logo" className="h-8 lg:h-10 cursor-pointer drop-shadow-sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {bootcamps.map((bootcamp) => (
              <Link href={`/bootcamp/${bootcamp.slug}`} key={bootcamp._id.toString()} className="block group h-full">
                <div className="bg-brand-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(3,48,87,0.06)] border border-brand-navy/10 hover:shadow-[0_8px_30px_rgba(3,48,87,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                  <div className="relative h-40 lg:h-48 w-full bg-brand-navy/5 overflow-hidden">
                    <img src={bootcamp.image || "/poster/techMastery.png"} alt={bootcamp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-brand-white/95 backdrop-blur text-brand-navy font-bold text-[10px] px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-brand-navy/10 font-shareTech">
                      NOT STARTED
                    </div>
                  </div>
                  <div className="p-4 lg:p-5 flex flex-col flex-1">
                    <h3 className="text-lg lg:text-xl font-bold text-brand-navy mb-2 font-shareTech leading-tight">{bootcamp.title}</h3>
                    <p className="text-brand-navy/70 text-xs lg:text-sm mb-5 flex-1 leading-relaxed line-clamp-2">
                      {bootcamp.description}
                    </p>

                    <div className="mb-5">
                      <div className="flex justify-between text-[10px] lg:text-xs font-bold text-brand-navy mb-2 font-shareTech">
                        <span>COURSE PROGRESS</span>
                        <span className="text-brand-green">0%</span>
                      </div>
                      <div className="w-full bg-brand-navy/10 rounded-full h-2 overflow-hidden shadow-inner">
                        <div className="bg-brand-green h-full rounded-full w-[0%] relative shadow-sm">
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-brand-navy text-brand-white font-bold py-2.5 lg:py-3 rounded-xl hover:bg-brand-navy/90 transition-all shadow-sm hover:shadow-brand-navy/30 flex justify-center items-center gap-2 group-hover:bg-brand-green group-hover:shadow-brand-green/30 font-shareTech uppercase tracking-wide text-xs lg:text-sm pointer-events-none">
                      <span>View Internship Details</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
