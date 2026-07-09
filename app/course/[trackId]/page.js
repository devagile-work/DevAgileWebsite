import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTrackById, getInternshipByTrackId } from "../../../lib/internshipData";
import connectMongoDB from "../../../lib/mongodb";
import User from "../../../models/User";
import CoursePlayer from "../../../components/CoursePlayer";

export default async function CourseStreamingPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/loginAndSignUp");
  }

  await connectMongoDB();

  const [track, user, parentBootcamp] = await Promise.all([
    Promise.resolve(getTrackById(params.trackId)),
    User.findOne({ email: session.user.email }).lean(),
    Promise.resolve(getInternshipByTrackId(params.trackId))
  ]);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-navy mb-4 font-shareTech">404 - Course Not Found</h1>
          <Link href="/dashboard" className="text-brand-green hover:underline font-bold">Return to Dashboard</Link>
        </div>
      </div>
    );
  }

  // Check authorization
  const hasPurchasedTrack = user?.purchasedTracks?.some(id => id.toString() === track._id.toString());
  const hasPurchasedBootcamp = parentBootcamp && user?.purchasedBootcamps?.some(id => id.toString() === parentBootcamp._id.toString());

  if (!hasPurchasedTrack && !hasPurchasedBootcamp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-brand-navy mb-4 font-shareTech">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to purchase this track or its bootcamp bundle to access the content.</p>
          <Link href="/dashboard" className="bg-brand-navy text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-navy/90 transition-colors font-shareTech">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Determine WhatsApp Link based on track/bootcamp title
  let whatsappLink = "";
  const titleToCheck = `${track.title} ${parentBootcamp ? parentBootcamp.title : ""}`.toLowerCase();
  
  if (titleToCheck.includes("web") || titleToCheck.includes("full stack")) {
    whatsappLink = "https://chat.whatsapp.com/DiSj04OhGaF6mcT9Ma05fQ";
  } else if (titleToCheck.includes("ai") || titleToCheck.includes("machine") || (titleToCheck.includes("data") && !titleToCheck.includes("structure"))) {
    whatsappLink = "https://chat.whatsapp.com/DncMpZ9vHrt2aNzQmtPZfn";
  } else if (titleToCheck.includes("dsa") || titleToCheck.includes("algorithm") || titleToCheck.includes("structure")) {
    whatsappLink = "https://chat.whatsapp.com/JDNfPpBwbgL1yn1x9rTe5Z";
  }

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

      {/* Main Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <CoursePlayer track={JSON.parse(JSON.stringify(track))} whatsappLink={whatsappLink} />
      </div>
    </div>
  );
}
