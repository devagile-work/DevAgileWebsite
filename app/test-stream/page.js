"use client";

import { useState } from "react";

export default function TestStreamPage() {
  const [fileId, setFileId] = useState("");
  const [videoSrc, setVideoSrc] = useState("");

  const handleLoad = (e) => {
    e.preventDefault();
    if (fileId) {
      setVideoSrc(`/api/stream/${fileId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Secure Video Streaming Test</h1>
      
      <form onSubmit={handleLoad} className="w-full max-w-md bg-gray-800 p-6 rounded-xl mb-8 border border-gray-700">
        <label className="block text-sm text-gray-400 mb-2">Paste a Google Drive File ID (from your database)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-600 rounded p-3 focus:outline-none focus:border-blue-500"
            placeholder="e.g., 1A2b3C4d5E6f7G8h9I0j..."
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 rounded font-semibold transition-colors">
            Load
          </button>
        </div>
      </form>

      {videoSrc && (
        <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
          <video 
            src={videoSrc} 
            controls 
            controlsList="nodownload" // Basic frontend deterrent
            onContextMenu={(e) => e.preventDefault()} // Disable right click
            className="w-full aspect-video"
            autoPlay
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}

      <div className="mt-8 text-gray-400 max-w-2xl text-center text-sm">
        <p>This video is being streamed securely from your backend using the <code className="bg-gray-800 px-1 rounded">/api/stream</code> proxy route. The raw file remains totally private on Google Drive.</p>
      </div>
    </div>
  );
}
