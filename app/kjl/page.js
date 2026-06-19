"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [view, setView] = useState("LIST_BOOTCAMPS"); // LIST_BOOTCAMPS, CREATE_BOOTCAMP, VIEW_BOOTCAMP, CREATE_TRACK, EDIT_TRACK
  const [bootcamps, setBootcamps] = useState([]);
  const [selectedBootcamp, setSelectedBootcamp] = useState(null);
  const [editingTrackId, setEditingTrackId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});

  const [bootcampForm, setBootcampForm] = useState({ slug: "", title: "", description: "", image: "", bundlePrice: 0 });
  const [trackForm, setTrackForm] = useState({ slug: "", title: "", description: "", individualPrice: 0, features: "" });
  const [videos, setVideos] = useState([]);

  const fetchBootcamps = async () => {
    try {
      const res = await fetch("/api/admin/bootcamp", { headers: { "x-admin-password": password } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBootcamps(data.bootcamps);
      
      // If we are currently viewing a bootcamp, update its data so we see the newly added/edited tracks
      if (selectedBootcamp) {
        const updatedBootcamp = data.bootcamps.find(b => b._id === selectedBootcamp._id);
        if (updatedBootcamp) setSelectedBootcamp(updatedBootcamp);
      }
    } catch (err) {
      if (err.message === "Unauthorized") setIsAuthenticated(false);
      setError("Failed to load bootcamps: " + err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchBootcamps();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim() !== "") setIsAuthenticated(true);
  };

  const handleBootcampSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/bootcamp", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(bootcampForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      alert("Bootcamp created!");
      setBootcampForm({ slug: "", title: "", description: "", image: "", bundlePrice: 0 });
      fetchBootcamps();
      setView("LIST_BOOTCAMPS");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditTrack = (track) => {
    setEditingTrackId(track._id);
    setTrackForm({
      slug: track.slug || "",
      title: track.title || "",
      description: track.description || "",
      individualPrice: track.individualPrice || 0,
      features: track.features ? track.features.join(", ") : ""
    });
    setVideos(track.videos ? track.videos.map((v, i) => ({
      id: i,
      title: v.title || "",
      description: v.description || "",
      duration: v.duration || "",
      link: v.link || "",
      file: null // No file attached initially
    })) : []);
    setView("EDIT_TRACK");
  };

  const startCreateTrack = () => {
    setEditingTrackId(null);
    setTrackForm({ slug: "", title: "", description: "", individualPrice: 0, features: "" });
    setVideos([]);
    setView("CREATE_TRACK");
  };

  const addVideo = () => setVideos([...videos, { id: videos.length + 1, title: "", description: "", duration: "", file: null, link: "" }]);
  const removeVideo = (index) => setVideos(videos.filter((_, i) => i !== index));
  const updateVideo = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setUploadProgress({});

    try {
      const uploadedVideos = await Promise.all(
        videos.map(async (v, index) => {
          // If no new file is selected, return the existing video data (including its original link)
          if (!v.file) {
            return {
              title: v.title,
              description: v.description,
              duration: v.duration,
              link: v.link, // Keep existing Drive Link
            };
          }

          // Otherwise, upload the new file via Resumable Upload
          const data = await new Promise(async (resolve, reject) => {
            try {
              // 1. Initialize Session
              const initRes = await fetch("/api/admin/upload/init", {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-admin-password": password },
                body: JSON.stringify({ fileName: v.file.name, mimeType: v.file.type })
              });
              const initData = await initRes.json();
              if (!initRes.ok) throw new Error(initData.error || initData.details || "Init failed");

              // 2. Direct Upload to Google Drive
              const xhr = new XMLHttpRequest();
              xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                  const percentComplete = (event.loaded / event.total) * 100;
                  setUploadProgress(prev => ({...prev, [index]: percentComplete}));
                }
              };
              xhr.onload = async () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  // Google Drive returns file metadata, including ID
                  let googleRes = {};
                  try {
                     googleRes = JSON.parse(xhr.responseText);
                  } catch(e) {
                     reject(new Error("Invalid response from Google Drive"));
                     return;
                  }
                  
                  // 3. Finalize Upload (Set Permissions & Get Link)
                  try {
                    const finRes = await fetch("/api/admin/upload/finalize", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", "x-admin-password": password },
                      body: JSON.stringify({ fileId: googleRes.id })
                    });
                    const finData = await finRes.json();
                    if (!finRes.ok) throw new Error(finData.error || finData.details || "Finalize failed");
                    resolve(finData);
                  } catch (finErr) {
                    reject(finErr);
                  }
                } else {
                  reject(new Error("Failed to upload to Google Drive directly (Status " + xhr.status + ")"));
                }
              };
              xhr.onerror = () => reject(new Error("Network error during direct upload"));
              
              xhr.open("PUT", initData.uploadUrl, true);
              xhr.setRequestHeader("Content-Type", v.file.type);
              xhr.send(v.file); // Send raw file bytes directly to Google!
            } catch (err) {
              reject(err);
            }
          });

          return {
            title: v.title,
            description: v.description,
            duration: v.duration,
            link: data.link, // New Google Drive Link
          };
        })
      );

      const trackData = {
        ...trackForm,
        features: trackForm.features.split(",").map(i => i.trim()).filter(Boolean),
        videos: uploadedVideos,
        bootcampId: selectedBootcamp._id // Used for Create
      };

      const url = view === "EDIT_TRACK" ? `/api/admin/track/${editingTrackId}` : "/api/admin/track";
      const method = view === "EDIT_TRACK" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify(trackData),
      });

      const dataRes = await res.json();
      if (!res.ok) throw new Error(dataRes.error);

      alert(view === "EDIT_TRACK" ? "Track updated successfully!" : "Track created successfully!");
      setTrackForm({ slug: "", title: "", description: "", individualPrice: 0, features: "" });
      setVideos([]); setUploadProgress({});
      
      await fetchBootcamps(); // Refreshes the Bootcamps and updating the currently selected Bootcamp
      setView("VIEW_BOOTCAMP");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0a] to-[#0a0a0a]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] border border-white/10 w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
          <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Admin Access</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required />
            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] transform hover:scale-[1.02] active:scale-[0.98]">Enter Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0a0a0a] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 cursor-pointer" onClick={() => setView("LIST_BOOTCAMPS")}>
            Course Manager Dashboard
          </h1>
          <div className="flex gap-4">
            {view !== "LIST_BOOTCAMPS" && (
              <button onClick={() => setView("LIST_BOOTCAMPS")} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-white/10 transition-colors">Back to Bootcamps</button>
            )}
            <div className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Authenticated
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 font-medium flex items-center gap-3 shadow-lg shadow-red-500/5">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>{error}</span>
          </motion.div>
        )}

        {view === "LIST_BOOTCAMPS" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Bootcamps</h2>
              <button onClick={() => setView("CREATE_BOOTCAMP")} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium">Create New Bootcamp</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bootcamps.map(b => (
                <motion.div key={b._id} whileHover={{ scale: 1.02 }} className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => { setSelectedBootcamp(b); setView("VIEW_BOOTCAMP"); }}>
                  <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{b.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400 font-semibold">${b.bundlePrice}</span>
                    <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{b.tracks?.length || 0} Tracks</span>
                  </div>
                </motion.div>
              ))}
              {bootcamps.length === 0 && <p className="text-gray-500 col-span-3">No bootcamps found.</p>}
            </div>
          </div>
        )}

        {view === "CREATE_BOOTCAMP" && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleBootcampSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto space-y-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <h2 className="text-2xl font-bold text-white">Create Bootcamp</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input type="text" value={bootcampForm.title} onChange={e => setBootcampForm({...bootcampForm, title: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slug</label>
                <input type="text" value={bootcampForm.slug} onChange={e => setBootcampForm({...bootcampForm, slug: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bundle Price ($)</label>
                <input type="number" value={bootcampForm.bundlePrice} onChange={e => setBootcampForm({...bootcampForm, bundlePrice: parseFloat(e.target.value) || 0})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 outline-none" required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input type="text" value={bootcampForm.image} onChange={e => setBootcampForm({...bootcampForm, image: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 outline-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea value={bootcampForm.description} onChange={e => setBootcampForm({...bootcampForm, description: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500 outline-none h-24" required />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">{loading ? "Saving..." : "Save Bootcamp"}</button>
            </div>
          </motion.form>
        )}

        {view === "VIEW_BOOTCAMP" && selectedBootcamp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <h2 className="text-3xl font-bold text-white mb-4">{selectedBootcamp.title}</h2>
              <p className="text-gray-400 mb-6">{selectedBootcamp.description}</p>
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Tracks in this Bootcamp</h3>
                <button onClick={startCreateTrack} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium">+ Add Track</button>
              </div>
              
              <div className="space-y-4">
                {selectedBootcamp.tracks?.map(t => (
                  <div key={t._id} className="bg-black/40 border border-white/10 rounded-xl p-4 flex justify-between items-center group">
                    <div>
                      <h4 className="text-lg font-bold text-blue-400">{t.title}</h4>
                      <p className="text-sm text-gray-400">{t.videos?.length || 0} Videos | ${t.individualPrice}</p>
                    </div>
                    <button onClick={() => startEditTrack(t)} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-opacity">Edit Track</button>
                  </div>
                ))}
                {(!selectedBootcamp.tracks || selectedBootcamp.tracks.length === 0) && <p className="text-gray-500">No tracks added to this bootcamp yet.</p>}
              </div>
            </div>
          </motion.div>
        )}

        {(view === "CREATE_TRACK" || view === "EDIT_TRACK") && selectedBootcamp && (
          <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleTrackSubmit} className="space-y-8 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <h2 className="text-2xl font-bold text-white mb-2">{view === "EDIT_TRACK" ? "Edit Track" : "Create Track"}</h2>
              <p className="text-gray-400 mb-6 text-sm">Belongs to: <strong className="text-white">{selectedBootcamp.title}</strong></p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Track Title</label>
                  <input type="text" value={trackForm.title} onChange={e => setTrackForm({...trackForm, title: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Slug</label>
                  <input type="text" value={trackForm.slug} onChange={e => setTrackForm({...trackForm, slug: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Individual Price ($)</label>
                  <input type="number" value={trackForm.individualPrice} onChange={e => setTrackForm({...trackForm, individualPrice: parseFloat(e.target.value) || 0})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Features (comma separated)</label>
                  <input type="text" value={trackForm.features} onChange={e => setTrackForm({...trackForm, features: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea value={trackForm.description} onChange={e => setTrackForm({...trackForm, description: e.target.value})} className="w-full p-3 rounded-lg bg-black/50 border border-white/10 focus:border-purple-500 outline-none h-24" required />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Videos</h2>
                <button type="button" onClick={addVideo} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Add Video</button>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {videos.map((video, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="p-6 rounded-xl bg-black/30 border border-white/5 relative group">
                      <button type="button" onClick={() => removeVideo(index)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400">✕</button>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Video Title</label>
                          <input type="text" value={video.title} onChange={e => updateVideo(index, "title", e.target.value)} className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none text-sm" required />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Duration</label>
                          <input type="text" placeholder="e.g. 15:00" value={video.duration} onChange={e => updateVideo(index, "duration", e.target.value)} className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Description</label>
                          <input type="text" value={video.description} onChange={e => updateVideo(index, "description", e.target.value)} className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none text-sm" />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-xs text-gray-400 mb-1">Video File (Uploads to Drive)</label>
                          {video.link && !video.file && (
                            <p className="text-xs text-green-400 mb-2">Currently uploaded. Choose a new file below to replace it.</p>
                          )}
                          <input type="file" accept="video/*" onChange={e => updateVideo(index, "file", e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20" />
                          {uploadProgress[index] !== undefined && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-gray-400 mb-1"><span>Uploading...</span><span>{Math.round(uploadProgress[index])}%</span></div>
                              <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${uploadProgress[index]}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {videos.length === 0 && <p className="text-gray-500 text-center py-6">No videos added yet.</p>}
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={loading} className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all ${loading ? 'opacity-50' : ''}`}>
                {loading ? "Processing..." : (view === "EDIT_TRACK" ? "Save Changes" : "Save Track & Upload Videos")}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}


