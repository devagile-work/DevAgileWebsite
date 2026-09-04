import connectMongo from "@/lib/mongodb";
import Workshop from "@/models/Workshop";
import WorkshopRegistration from "@/models/WorkshopRegistration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import WorkshopViewer from "./WorkshopViewer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkshopPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/loginAndSignUp");
  }

  const { slug } = params;
  await connectMongo();

  const workshop = await Workshop.findOne({ slug }).lean();
  if (!workshop) {
    return <div className="p-8 text-center text-red-500">Workshop not found</div>;
  }

  // Ensure _id is stringified for client component
  const safeWorkshop = {
    ...workshop,
    _id: workshop._id.toString(),
    lectures: workshop.lectures.map(l => ({
      ...l,
      _id: l._id.toString(),
      quiz: l.quiz?.map(q => ({
        ...q,
        _id: q._id.toString(),
      })) || []
    }))
  };

  const registration = await WorkshopRegistration.findOne({
    userEmail: session.user.email,
    workshopId: workshop._id
  }).lean();

  if (!registration) {
    redirect(`/workshop-registration/${slug}`);
  }

  const safeRegistration = {
    ...registration,
    _id: registration._id.toString(),
    workshopId: registration.workshopId.toString(),
    progress: registration.progress.map(p => ({
      ...p,
      _id: p._id.toString(),
      lectureId: p.lectureId.toString()
    }))
  };

  return <WorkshopViewer workshop={safeWorkshop} registration={safeRegistration} />;
}
