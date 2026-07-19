import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";
import SettingsButton from "./SettingsButton";
import Link from "next/link";
import connectMongoDB from "../../lib/mongodb";
import Bootcamp from "../../models/Bootcamp";
import User from "../../models/User";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginAndSignUp");
  }

  await connectMongoDB();
  const dbUser = await User.findOne({ email: session.user.email }).lean();
  const hasPassword = !!dbUser?.password;

  const bootcamps = await Bootcamp.find({}).lean();

  return (
    <div className="flex flex-row min-h-screen bg-brand-white font-roboto">
      {/* Sidebar */}
      <aside className="w-56 lg:w-64 bg-brand-white border-r border-brand-navy/10 flex flex-col p-4 lg:p-6 sticky top-0 h-screen overflow-y-auto z-20 shadow-[4px_0_24px_rgba(3,48,87,0.05)]">
        {/* Profile Info */}
        <div className="flex flex-col items-center justify-start mb-6 mt-2 gap-0">
          <div className="flex flex-col items-center gap-0 w-full">
            <div className="relative group cursor-pointer mb-3">
               <div className="absolute inset-0 bg-brand-green rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              {session.user?.image ? (
                 <img src={session.user.image} alt={session.user.name} className="w-16 h-16 rounded-full shadow-md object-cover relative z-10 border-2 border-brand-white" />
              ) : (
                <div className="w-16 h-16 rounded-full shadow-md bg-gradient-to-br from-brand-green/30 to-brand-green/10 flex items-center justify-center text-brand-navy text-2xl font-bold uppercase relative z-10 border-2 border-brand-white font-shareTech">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <div className="text-center w-full">
              <h2 className="text-base lg:text-lg font-bold text-brand-navy line-clamp-1 w-full px-1 font-shareTech">{session.user?.name}</h2>
              <p className="text-xs text-brand-navy/60 line-clamp-1 w-full px-1 font-medium">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 overflow-visible pb-0">
          <Link href="/dashboard" className="flex items-center gap-2 text-brand-navy bg-brand-green/20 border border-brand-green/30 px-3 py-2 lg:p-3 rounded-xl transition-all font-bold shadow-sm font-shareTech text-sm whitespace-nowrap">
            <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>
          <SettingsButton hasPassword={hasPassword} />
        </nav>

        {/* Logout */}
        <div className="block mt-auto pt-4 border-t border-brand-navy/10">
          <LogoutButton className="w-full flex justify-center items-center gap-2 border-2 border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-brand-white p-2.5 rounded-xl transition-all font-bold shadow-sm font-shareTech text-sm" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative">
        {/* Decorative background blobs */}
        <div className="fixed top-[-5%] right-[-5%] w-64 h-64 rounded-full bg-brand-green/20 blur-[100px] pointer-events-none" />
        <div className="fixed bottom-[-5%] left-[20%] w-[300px] h-[300px] rounded-full bg-brand-navy/10 blur-[100px] pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            
            {/* Free Workshops Section */}
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-6 bg-brand-white/80 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-brand-white shadow-sm">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-brand-navy mb-0.5 tracking-tight font-shareTech uppercase">Free Workshops</h1>
                  <p className="text-brand-navy/70 font-medium text-xs lg:text-sm">Join our live interactive sessions</p>
                </div>
              </div>
              
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 lg:gap-4">
                <Link href="/workshop-registration" className="block group h-full">
                  <div className="bg-brand-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(3,48,87,0.06)] border border-brand-green/30 hover:shadow-[0_8px_30px_rgba(3,48,87,0.12)] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative aspect-square">
                    <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    <div className="relative flex-[0_0_45%] w-full bg-brand-navy/5 overflow-hidden">
                      <img src="/poster/webdevworkshop.png" alt="Web Dev Workshop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-brand-green text-brand-navy font-bold text-[8px] px-1.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-brand-green/20 font-shareTech animate-pulse">
                        LIVE NOW
                      </div>
                    </div>
                    <div className="p-2.5 lg:p-3 flex flex-col flex-1 overflow-hidden">
                      <h3 className="text-sm lg:text-base font-bold text-brand-navy mb-1 font-shareTech leading-tight group-hover:text-brand-green transition-colors line-clamp-1">Complete Web Development Workshop</h3>
                      <p className="text-brand-navy/70 text-[10px] lg:text-xs mb-3 flex-1 leading-relaxed line-clamp-2">
                        Learn the fundamentals of web development in this interactive workshop. Perfect for beginners and aspiring developers.
                      </p>
                      <button className="w-full mt-auto bg-brand-green text-brand-navy font-bold py-1.5 lg:py-2 rounded-md hover:bg-brand-green/90 transition-all shadow-md hover:shadow-brand-green/30 flex justify-center items-center gap-1.5 font-shareTech uppercase tracking-wide text-[9px] lg:text-[10px] pointer-events-none">
                        <span>Register Now</span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Bootcamps Section */}
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-6 bg-brand-white/80 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-brand-white shadow-sm">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-black text-brand-navy mb-0.5 tracking-tight font-shareTech uppercase">Bootcamps</h1>
                  <p className="text-brand-navy/70 font-medium text-xs lg:text-sm">Continue your learning journey</p>
                </div>
                <Link href="/" className="hover:scale-105 transition-transform">
                  <img src="/logos/completeLogo.png" alt="DevAgile Logo" className="h-8 lg:h-10 cursor-pointer drop-shadow-sm" />
                </Link>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 lg:gap-4">
                {bootcamps.map((bootcamp) => (
                  <div key={bootcamp._id.toString()} className="block group h-full cursor-not-allowed opacity-80">
                    <div className="bg-brand-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(3,48,87,0.06)] border border-brand-navy/10 transition-all duration-300 flex flex-col h-full aspect-square">
                      <div className="relative flex-[0_0_45%] w-full bg-brand-navy/5 overflow-hidden">
                        <img src={bootcamp.image || "/poster/techMastery.png"} alt={bootcamp.title} className="w-full h-full object-cover grayscale" />
                        <div className="absolute top-2 right-2 bg-brand-white/95 backdrop-blur text-brand-navy font-bold text-[8px] px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-brand-navy/10 font-shareTech">
                          COMING SOON
                        </div>
                      </div>
                      <div className="p-2.5 lg:p-3 flex flex-col flex-1 overflow-hidden">
                        <h3 className="text-sm lg:text-base font-bold text-brand-navy mb-1 font-shareTech leading-tight line-clamp-1">{bootcamp.title} <span className="text-brand-green text-[10px]">(Soon)</span></h3>
                        <p className="text-brand-navy/70 text-[10px] lg:text-xs mb-3 flex-1 leading-relaxed line-clamp-2">
                          {bootcamp.description}
                        </p>

                        <div className="mb-2.5 mt-auto">
                          <div className="flex justify-between text-[8px] lg:text-[9px] font-bold text-brand-navy mb-1 font-shareTech">
                            <span>COURSE PROGRESS</span>
                            <span className="text-brand-green">0%</span>
                          </div>
                          <div className="w-full bg-brand-navy/10 rounded-full h-1.5 overflow-hidden shadow-inner">
                            <div className="bg-brand-green h-full rounded-full w-[0%] relative shadow-sm">
                            </div>
                          </div>
                        </div>

                        <button disabled className="w-full mt-1 bg-brand-navy/50 text-brand-white font-bold py-1.5 lg:py-2 rounded-md transition-all shadow-sm flex justify-center items-center gap-1.5 font-shareTech uppercase tracking-wide text-[9px] lg:text-[10px] cursor-not-allowed">
                          <span>Coming Soon</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
