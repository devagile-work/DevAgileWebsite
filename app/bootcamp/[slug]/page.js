import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getInternshipBySlug } from "../../../lib/internshipData";
import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/User"; // needed to check entitlements
import RazorpayButton from "./RazorpayButton";
import CoursePlanTabs from "./CoursePlanTabs";

export default async function BootcampPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginAndSignUp");
  }

  await connectMongoDB();
  
  const mongoose = require('mongoose');
  
  const [bootcamp, user] = await Promise.all([
    Promise.resolve(getInternshipBySlug(params.slug)),
    mongoose.connection.db.collection('users').findOne({ email: session.user.email })
  ]);

  if (!bootcamp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-navy mb-4 font-shareTech">404 - Internship Not Found</h1>
          <Link href="/dashboard" className="text-brand-green hover:underline font-bold">Return to Dashboard</Link>
        </div>
      </div>
    );
  }

  const totalIndividualPrice = bootcamp.tracks.reduce((sum, track) => sum + track.individualPrice, 0);
  const savings = totalIndividualPrice - bootcamp.bundlePrice;

  const hasPurchasedBootcamp = user?.purchasedBootcamps?.some(id => id.toString() === bootcamp._id.toString());
  
  // We need to convert Mongoose ObjectIds to strings so they can be passed to Client Components safely
  const serializedTracks = bootcamp.tracks.map(t => ({
    ...t,
    _id: t._id.toString(),
    isPurchased: hasPurchasedBootcamp || user?.purchasedTracks?.some(id => id.toString() === t._id.toString())
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc] font-roboto pb-20 selection:bg-brand-green/30 selection:text-brand-navy">
      {/* Top Navbar */}
      <nav className="bg-brand-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-brand-navy hover:text-brand-green transition-colors font-bold text-sm font-shareTech">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </Link>
          <img src="/logos/completeLogo.png" alt="DevAgile Logo" className="h-8" />
        </div>
      </nav>

      {/* Course Plan Tabs Section on Top */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <CoursePlanTabs tracks={serializedTracks} />
      </div>

      <div id="pricing-section"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-10 pb-16">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-brand-green/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-navy/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/50 text-brand-green font-bold text-[10px] px-3 py-1.5 rounded-full mb-6 font-shareTech tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
              Full Internship Bundle
            </div>
            <h1 className="text-4xl lg:text-6xl font-black text-brand-navy mb-6 font-shareTech leading-tight drop-shadow-sm">
              {bootcamp.title}
            </h1>
            <p className="text-gray-600 text-sm lg:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {bootcamp.description}
            </p>
            
            {/* Pricing Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start bg-white p-6 rounded-2xl border border-gray-200 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-green/0 via-brand-green/5 to-brand-green/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="text-center sm:text-left relative z-10">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-2">Bundle Price</p>
                <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-2">
                  <div className="text-4xl lg:text-5xl font-black text-brand-navy font-shareTech leading-none">₹{bootcamp.bundlePrice}</div>
                  {savings > 0 && (
                    <div className="text-gray-400 line-through text-lg font-shareTech leading-none mb-1 hidden sm:block">₹{totalIndividualPrice}</div>
                  )}
                </div>
                {savings > 0 && (
                  <div className="text-brand-green bg-brand-green/10 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider inline-block">
                    Save ₹{savings} vs buying individually
                  </div>
                )}
              </div>
              <div className="w-px h-20 bg-gray-200 hidden sm:block mx-4"></div>
              <div className="flex-1 w-full flex flex-col justify-center relative z-10">
                <RazorpayButton amount={bootcamp.bundlePrice} itemName={`${bootcamp.title} (Full Bundle)`} itemId={bootcamp._id.toString()} itemType="Bootcamp" isBundle={true} compact={false} hasPurchased={hasPurchasedBootcamp} />
                <p className="text-gray-500 text-[10px] text-center mt-3 uppercase tracking-widest">Includes all {bootcamp.tracks.length} tracks</p>
                {!hasPurchasedBootcamp && (
                  <a href="#individual-tracks" className="text-brand-navy hover:text-brand-green text-center text-xs font-bold uppercase tracking-wider mt-2 transition-colors">
                    Or Enroll in Individual Tracks at ₹{bootcamp.tracks[0]?.individualPrice || 499}
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[320px] lg:max-w-[450px] shrink-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transform lg:-rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-700">
              <img src={bootcamp.image || "/poster/techMastery.png"} alt={bootcamp.title} className="w-full h-auto object-cover relative z-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Tracks Section */}
      <div id="individual-tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-end border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-2xl lg:text-4xl font-black text-brand-navy mb-2 font-shareTech uppercase tracking-wide">Available Tracks</h2>
            <p className="text-gray-600 text-sm">
              Purchase the bundle above to save <span className="text-brand-green font-bold">₹{savings}</span>, or enroll individually.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Total Individual Value</p>
            <p className="text-2xl font-black text-gray-400 font-shareTech line-through">₹{totalIndividualPrice}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {serializedTracks.map((track) => (
            <div key={track._id} id={`track-${track._id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row hover:shadow-md hover:border-gray-300 transition-all group">
              
              {/* Track Info */}
              <div className="p-6 lg:p-8 lg:w-[32%] border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-navy mb-3 font-shareTech group-hover:text-brand-green transition-colors">{track.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm line-clamp-3 leading-relaxed mb-6 font-light">{track.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Track Price</span>
                    <span className="text-2xl font-black text-brand-navy font-shareTech">₹{track.individualPrice}</span>
                  </div>
                  <div className="lg:hidden w-36">
                    <RazorpayButton amount={track.individualPrice} itemName={`${track.title} Track`} itemId={track._id} itemType="Track" isBundle={false} compact={true} hasPurchased={track.isPurchased} />
                  </div>
                </div>
              </div>

              {/* Curriculum & Features */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col sm:flex-row gap-8">
                {/* Features */}
                <div className="flex-1">
                  <h4 className="font-bold text-[10px] text-gray-500 mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Key Learnings</h4>
                  <ul className="space-y-3">
                    {track.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <div className="bg-brand-green/20 rounded-full p-1 mt-0.5">
                          <svg className="w-3 h-3 text-brand-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Videos Preview */}
                <div className="flex-1">
                  <h4 className="font-bold text-[10px] text-gray-500 mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">Curriculum ({track.videos.length} Modules)</h4>
                  <div className="space-y-3">
                    {track.videos.map((vid, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors cursor-default">
                        <div className="bg-brand-green/10 text-brand-green border border-brand-green/20 rounded w-6 h-6 flex items-center justify-center shrink-0 text-[10px] font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 truncate">{vid.title}</p>
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium shrink-0 bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">
                          {vid.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Desktop Buy Button */}
              <div className="hidden lg:flex p-8 lg:w-56 bg-gray-50 border-l border-gray-100 items-center justify-center flex-col gap-3">
                 <RazorpayButton amount={track.individualPrice} itemName={`${track.title} Track`} itemId={track._id} itemType="Track" isBundle={false} compact={false} hasPurchased={track.isPurchased} />
                 {!track.isPurchased && <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center">Lifetime Access</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
