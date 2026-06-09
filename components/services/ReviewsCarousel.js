export default function ReviewsCarousel() {
  const reviews = [
    {
      name: "Anurag Maloo, FRSA, YGLAnurag Maloo, FRSA, YGL",
      desc: "Founder, The Voice of Glaciers Ecosystem",
      image: "/companyLogo/tvgf.png",
      thoughts: "Adarsh demonstrates strong initiative and consistently figures things out independently. He is highly proactive, quick to respond, and delivers with excellent turnaround time. What I particularly appreciate is his openness to feedback, he receives it constructively without defensiveness and is always willing to learn, improve, and take action. His positive attitude and commitment to getting things done made him a valuable contributor to the Voice of Glaciers Foundation website project.",
    },
    {
      name: "Anna KorlathAnna Korlath",
      desc: "The Good Illustrator",
      image: "/companyLogo/anna.png",
      thoughts: "Fast, professional, and clearly motivated! It’s rare to find a designer who works this quickly while staying so engaged with the project.",
    },
    {
      name: "Michael Chen",
      desc: "Startup Founder",
      image: "https://i.pravatar.cc/150?img=60",
      thoughts: "The team's dedication to UI/UX and solid backend architecture is unmatched. Highly recommended for any complex project.",
    },
  ];

  return (
    <div className="mt-32">
      <div className="text-center mb-12 px-6 lg:px-8">
        <h3 className="font-shareTech text-3xl font-extrabold tracking-tight text-brand-navy uppercase">
          What People Say
        </h3>
        <div className="h-1 w-12 bg-brand-green mx-auto rounded-full mt-4" />
      </div>

      {/* Infinite Carousel */}
      <div className="relative w-full overflow-hidden py-10 flex border-y border-brand-navy/5 bg-brand-navy/[0.02]">
        {/* First Marquee Track */}
        <div className="animate-marquee flex gap-8 whitespace-nowrap shrink-0 px-4 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={`track1-${i}`} className="glass-panel w-[320px] sm:w-[450px] p-8 rounded-2xl shrink-0 flex flex-col gap-6 whitespace-normal border border-brand-navy/10 bg-white shadow-sm">
              <p className="font-roboto font-light italic text-brand-navy/80 text-base leading-relaxed relative z-10">
                <span className="absolute -top-4 -left-3 text-5xl text-brand-green/20 font-serif z-[-1]">&quot;</span>
                {review.thoughts}
                <span className="absolute -bottom-6 -right-1 text-5xl text-brand-green/20 font-serif z-[-1]">&quot;</span>
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-green/50" />
                <div className="flex flex-col">
                  <span className="font-shareTech font-bold text-brand-navy text-lg leading-tight">{review.name}</span>
                  <span className="font-roboto text-[11px] text-brand-navy/60 font-bold uppercase tracking-wider mt-1">{review.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Second Marquee Track (for seamless loop) */}
        <div className="animate-marquee flex gap-8 whitespace-nowrap shrink-0 px-4 hover:[animation-play-state:paused]" aria-hidden="true">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={`track2-${i}`} className="glass-panel w-[320px] sm:w-[450px] p-8 rounded-2xl shrink-0 flex flex-col gap-6 whitespace-normal border border-brand-navy/10 bg-white shadow-sm">
              <p className="font-roboto font-light italic text-brand-navy/80 text-base leading-relaxed relative z-10">
                <span className="absolute -top-4 -left-3 text-5xl text-brand-green/20 font-serif z-[-1]">&quot;</span>
                {review.thoughts}
                <span className="absolute -bottom-6 -right-1 text-5xl text-brand-green/20 font-serif z-[-1]">&quot;</span>
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-green/50" />
                <div className="flex flex-col">
                  <span className="font-shareTech font-bold text-brand-navy text-lg leading-tight">{review.name}</span>
                  <span className="font-roboto text-[11px] text-brand-navy/60 font-bold uppercase tracking-wider mt-1">{review.desc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
