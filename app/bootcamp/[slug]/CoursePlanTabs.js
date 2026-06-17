"use client";

import { useState } from "react";
import RazorpayButton from "./RazorpayButton";

const plans = {
  "Full Stack Web Dev": {
    duration: "30 Days",
    crux: "Build, deploy, explain, and reverse engineer a full-stack application.",
    phases: [
      { title: "Internet & HTML/CSS", days: "Days 1-3", desc: "DNS, Request Lifecycle, Semantic HTML, Modern CSS (Flexbox/Grid)." },
      { title: "JavaScript Fundamentals", days: "Days 4-9", desc: "Logic building, Arrays/Objects, DOM Manipulation, Async/Await." },
      { title: "React Ecosystem", days: "Days 11-15", desc: "Virtual DOM, State, Hooks, Routing, Component Architecture." },
      { title: "Backend & Database", days: "Days 16-20", desc: "Node.js, Express, REST APIs, MongoDB, JWT Authentication." },
      { title: "System Design Autopsies", days: "Days 23-27", desc: "Deconstructing Netflix, LinkedIn, Spotify. Deployment & Resumes." },
      { title: "Project Showcase", days: "Day 28", desc: "Final Presentation of Capstone Project." }
    ]
  },
  "DSA Track": {
    duration: "60 Days",
    crux: "Master 26 critical topics and solve 225 carefully selected problems.",
    phases: [
      { title: "Arrays & Pointers", days: "13 Days", desc: "Arrays, Strings, Two Pointers, Sliding Window." },
      { title: "Hashing & Data Structures", days: "10 Days", desc: "Hashmaps, Matrices, Intervals, Stacks, Monotonic Stacks, Queues." },
      { title: "Linked Lists & Trees", days: "12 Days", desc: "Linked Lists, Binary Trees (DFS/BFS), Binary Search Trees." },
      { title: "Graphs & Backtracking", days: "7 Days", desc: "Graphs (DFS/BFS), Tries, Backtracking, Divide & Conquer." },
      { title: "Math & Advanced Search", days: "9 Days", desc: "Binary Search, Heaps/Priority Queues, Bit Manipulation, Math." },
      { title: "Dynamic Programming", days: "5 Days", desc: "1D DP, Multidimensional DP, Kadane's Algorithm." }
    ]
  },
  "AI Track": {
    duration: "60 Days",
    crux: "From Python basics to Neural Networks with real-world Capstone Projects.",
    phases: [
      { title: "Foundations & Python", days: "Week 1", desc: "AI/ML Landscape, Python Basics, Control Flow, Functions." },
      { title: "Data Science & Math", days: "Weeks 2-3", desc: "OOP, Linear Algebra, Statistics, Probability Distributions." },
      { title: "Data Analysis & EDA", days: "Weeks 4-5", desc: "NumPy, Pandas, Data Cleaning, Matplotlib, Seaborn." },
      { title: "Supervised ML", days: "Weeks 6-7", desc: "Linear/Logistic Regression, Decision Trees, Random Forests, SVM." },
      { title: "Unsupervised ML", days: "Week 8", desc: "K-Means, Hierarchical Clustering, PCA, Recommendation Systems." },
      { title: "Deep Learning & Capstone", days: "Week 9", desc: "ANNs, CNNs, TensorFlow/Keras, Final Project Presentation." }
    ]
  }
};

export default function CoursePlanTabs({ tracks }) {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?._id);

  const activeTrack = tracks.find(t => t._id === activeTrackId);
  const planData = plans[activeTrack?.title] || plans["Full Stack Web Dev"]; // Fallback if title doesn't match exactly

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-10 shadow-[0_8px_30px_rgba(3,48,87,0.06)] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl lg:text-3xl font-black text-brand-navy font-shareTech uppercase tracking-wide mb-2">Track Masterplans</h2>
        <p className="text-brand-navy/60 text-sm">Select a track to view its comprehensive learning roadmap.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 relative z-10">
        {tracks.map(track => (
          <button
            key={track._id}
            onClick={() => setActiveTrackId(track._id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold font-shareTech uppercase tracking-wider transition-all duration-300 border ${
              activeTrackId === track._id 
                ? "bg-brand-navy text-white border-brand-navy shadow-md" 
                : "bg-transparent text-brand-navy/60 border-gray-200 hover:bg-gray-50 hover:text-brand-navy"
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>

      {/* Active Plan Content */}
      <div className="relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-block bg-brand-green/10 text-brand-green border border-brand-green/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-3">
            {planData.duration} Journey
          </div>
          <p className="text-xl text-brand-navy/80 font-medium max-w-2xl mx-auto">"{planData.crux}"</p>
        </div>

        {/* Timeline Flow Diagram */}
        <div className="relative border-l-2 border-gray-100 ml-4 lg:ml-8 space-y-8 pb-8">
          {planData.phases.map((phase, idx) => (
            <div key={idx} className="relative pl-8 lg:pl-12">
              {/* Timeline Node */}
              <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-brand-green border-2 border-white shadow-sm"></div>
              
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-5 hover:bg-gray-50 hover:border-gray-200 transition-colors group shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h4 className="text-lg font-bold text-brand-navy font-shareTech tracking-wide group-hover:text-brand-green transition-colors">Phase {idx + 1}: {phase.title}</h4>
                  <span className="text-xs text-brand-green font-bold bg-brand-green/10 px-2 py-1 rounded">{phase.days}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll/Action Action */}
        <div className="mt-8 p-6 bg-brand-navy/5 border border-brand-navy/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-brand-navy font-shareTech uppercase tracking-wide mb-1">
              {activeTrack?.isPurchased ? `Continue your ${activeTrack?.title}` : `Ready to start the ${activeTrack?.title}?`}
            </h3>
            <p className="text-xs text-brand-navy/60">
              {activeTrack?.isPurchased ? "You have lifetime access to this track." : "Scroll down to explore pricing and enroll."}
            </p>
          </div>
          <div className="w-full sm:w-64 shrink-0">
            {activeTrack?.isPurchased ? (
              <a 
                href={`/course/${activeTrack?._id}`}
                className="w-full font-bold transition-all shadow-sm flex justify-center items-center gap-2 font-shareTech uppercase tracking-wide py-3 lg:py-4 px-4 text-sm lg:text-base rounded-xl bg-brand-navy text-white hover:bg-brand-navy/90 hover:shadow-brand-navy/30"
              >
                <span>Start Course</span>
              </a>
            ) : (
              <a 
                href="#pricing-section"
                className="w-full font-bold transition-all shadow-sm flex justify-center items-center gap-2 font-shareTech uppercase tracking-wide py-3 lg:py-4 px-4 text-sm lg:text-base rounded-xl bg-brand-green text-brand-navy hover:bg-brand-green/90 hover:shadow-brand-green/30"
              >
                <span>Start Plan</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
