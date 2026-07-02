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
        {whatsappLink && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold font-shareTech hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Join WhatsApp Group
            </a>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center max-w-xs mt-1">
              Note: All join requests are manually verified against your payment email.
            </p>
          </div>
        )}
      </div>
    );
  }

  const activeVideo = track.videos[activeVideoIndex];
  const isDriveLink = activeVideo.link && activeVideo.link.includes("drive.google.com");
  const embedUrl = isDriveLink ? activeVideo.link.replace(/\/view(\?.*)?$/, "/preview") : (activeVideo.link.startsWith('http') ? activeVideo.link : `/api/stream/${activeVideo.link}`);

  return (
    <div className="flex flex-col gap-6">
      {whatsappLink && (
        <div className="flex flex-col items-end gap-1.5">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-6 py-2.5 rounded-xl font-bold font-shareTech hover:bg-[#1DA851] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Join WhatsApp Group
          </a>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider text-right pr-1">
            Join requests are manually verified
          </p>
        </div>
      )}
      
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
