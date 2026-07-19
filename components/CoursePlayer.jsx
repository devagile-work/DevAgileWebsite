"use client";

import { useState } from "react";

export default function CoursePlayer({ track, whatsappLink }) {
  // Start with the first video in the track
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (!track || !track.videos || track.videos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center min-h-[400px] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-brand-navy font-shareTech mb-2">No Videos Available</h2>
        <p className="text-gray-500 mb-6">The instructor has not uploaded any videos for this track yet.</p>
        <div className="flex flex-col items-center gap-2 mt-2">
          <div className="bg-brand-navy/5 text-brand-navy px-6 py-4 rounded-xl font-medium border border-brand-navy/10 flex items-center justify-center gap-3 shadow-sm">
            <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Please check your email for the WhatsApp group invitation link.
          </div>
        </div>
      </div>
    );
  }

  const activeVideo = track.videos[activeVideoIndex];
  const isDriveLink = activeVideo?.link && activeVideo.link.includes("drive.google.com");
  const embedUrl = isDriveLink ? activeVideo.link.replace(/\/view(\?.*)?$/, "/preview") : (activeVideo?.link?.startsWith('http') ? activeVideo.link : (activeVideo?.link ? `/api/stream/${activeVideo.link}` : ""));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-end gap-1.5">
        <div className="bg-brand-navy/5 text-brand-navy px-5 py-2.5 rounded-xl font-medium text-sm border border-brand-navy/10 flex items-center gap-2 shadow-sm">
          <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Please check your email for the WhatsApp group invitation link.
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Video Player & Details */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          {/* The Video Player Box */}
          <div className="bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-800 relative w-full aspect-video">
            {isDriveLink ? (
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                key={activeVideo.link}
                src={embedUrl}
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

        {/* Video Metadata */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-brand-green/10 text-brand-green px-3 py-1 rounded-full text-xs font-bold font-shareTech uppercase tracking-widest border border-brand-green/20">
              Module {activeVideoIndex + 1}
            </span>
            <span className="text-gray-400 text-sm font-medium">{activeVideo.duration}</span>
          </div>
          <h2 className="text-3xl font-black text-brand-navy font-shareTech mb-4">{activeVideo.title}</h2>
          <p className="text-gray-600 leading-relaxed font-light whitespace-pre-line">
            {activeVideo.description || "No description provided."}
          </p>
        </div>
      </div>

      {/* RIGHT: Course Playlist Sidebar */}
      <div className="lg:w-1/3 flex flex-col">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full max-h-[800px]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h3 className="text-xl font-bold text-brand-navy font-shareTech">Course Content</h3>
            <p className="text-sm text-gray-500 mt-1">{track.videos.length} Modules</p>
          </div>

          {/* Scrollable Playlist */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {track.videos.map((vid, i) => {
              const isActive = i === activeVideoIndex;

              return (
                <button
                  key={vid._id || i}
                  onClick={() => setActiveVideoIndex(i)}
                  className={`w-full text-left flex items-start gap-3 p-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-brand-navy text-white shadow-md border border-brand-navy"
                      : "bg-white text-gray-700 border border-gray-100 hover:border-brand-green/50 hover:bg-brand-green/5"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                      isActive ? "bg-brand-green text-brand-navy" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isActive ? (
                      // Playing Icon (Simple CSS animation)
                      <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-gray-800"}`}>
                      {vid.title}
                    </p>
                    <p className={`text-xs mt-1 ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                      {vid.duration}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
