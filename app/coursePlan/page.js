"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RegisterModal from "../../components/RegisterModal";
import ScrollReveal from "../../components/ScrollReveal";

// a simple comment

export default function CoursePlan() {
  const [activeTab, setActiveTab] = useState("ai");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  const tracks = {
    ai: {
      title: "AI / ML Engineering Track",
      description: "A 30-day intensive sprint focusing on applied ML, the modern LLM stack, and deploying AI applications.",
      phases: [
        {
          id: "Phase 1",
          duration: "Days 1–6",
          title: "Foundations & Data",
          goal: "NumPy, Pandas, Linear Algebra, Statistics",
          milestone: "Complete a full data EDA (Exploratory Data Analysis) on a real-world dataset (e.g., from Kaggle)."
        },
        {
          id: "Phase 2",
          duration: "Days 7–14",
          title: "Applied ML",
          goal: "Scikit-learn, Feature Engineering, Evaluation",
          milestone: "Build a predictive model (e.g., house price or churn prediction) and deploy it as a simple API using FastAPI."
        },
        {
          id: "Phase 3",
          duration: "Days 15–23",
          title: "The LLM Stack & Agents",
          goal: "Prompting, RAG, LangChain/LangGraph, Vector DBs",
          milestone: "Build a 'Chat with your Data' app using a Vector DB and an LLM API."
        },
        {
          id: "Phase 4",
          duration: "Days 24–30",
          title: "MLOps & Capstone",
          goal: "FastAPI, Docker, Fine-Tuning, Deployment",
          milestone: "Full production deployment of your Capstone Project (e.g., an autonomous research agent)."
        }
      ]
    },
    fullstack: {
      title: "Full Stack Developer Track",
      description: "Focus on building high-performance, type-safe applications bridging frontend with AI/ML models and databases.",
      phases: [
        {
          id: "Week 1",
          duration: "Days 1–7",
          title: "Frontend Excellence",
          goal: "Modern Frontend (TypeScript & React), Responsive UI with Tailwind, complex state management.",
          milestone: "Build a complex interactive dashboard. Ensure code is modular, reusable, and follows clean code principles."
        },
        {
          id: "Week 2",
          duration: "Days 8–14",
          title: "Backend & API Engineering",
          goal: "Secure REST/GraphQL APIs, Authentication, Node.js/Express or FastAPI.",
          milestone: "Build an API handling CRUD operations. Implement JWT Authentication, middleware, and validation."
        },
        {
          id: "Week 3",
          duration: "Days 15–21",
          title: "Database & Data Modeling",
          goal: "PostgreSQL normalization, relational modeling, Redis caching.",
          milestone: "Integrate backend with DB. Learn complex joins and when to cache data in Redis."
        },
        {
          id: "Week 4",
          duration: "Days 22–30",
          title: "DevOps & Deployment",
          goal: "Docker, CI/CD, AWS/Cloud deployment.",
          milestone: "Deploy your project to the cloud. Set up a CI/CD pipeline running tests on every git push."
        }
      ]
    },
    dsa: {
      title: "Data Structures & Algorithms Track",
      description: "Master pattern recognition targeting the greatest hits of algorithmic interviews (LeetCode 75 & Blind 75).",
      phases: [
        {
          id: "Phase 1",
          duration: "Days 1–8",
          title: "The Linear & Hashing Sprint",
          goal: "Arrays, Strings, Hashing, Linked Lists. Two Pointers, Sliding Window, Prefix Sum.",
          milestone: "Master pointer and hashing patterns. Practice 8-10 problems a day."
        },
        {
          id: "Phase 2",
          duration: "Days 9–18",
          title: "The Non-Linear Sprint",
          goal: "Trees, Graphs, Heaps. BFS/DFS, Union-Find, Dijkstra's.",
          milestone: "Learn recursive thinking. Understand that Trees are simplified versions of Graphs."
        },
        {
          id: "Phase 3",
          duration: "Days 19–30",
          title: "Advanced Optimization",
          goal: "Dynamic Programming, Greedy, Backtracking, Sorting.",
          milestone: "Handling complexity. Master Binary Search on Answer and DP Memoization vs Tabulation."
        }
      ]
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-white selection:bg-brand-green/30 selection:text-brand-navy flex flex-col font-roboto">
      <Navbar onRegisterClick={handleOpenRegister} />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4 font-shareTech">
              30-Day Intensive Course Plan
            </h1>
            <p className="text-lg text-brand-navy/70 max-w-2xl mx-auto">
              Follow our structured 30-day timelines designed for extreme growth. Select a track below to view the daily milestones and goals.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {[
              { id: "ai", label: "AI / ML Track" },
              { id: "fullstack", label: "Full Stack Track" },
              { id: "dsa", label: "DSA Track" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-brand-navy text-brand-white shadow-lg scale-105"
                    : "bg-gray-100 text-brand-navy hover:bg-brand-green/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          {/* Track Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-brand-navy mb-3 font-shareTech">
                {tracks[activeTab].title}
              </h2>
              <p className="text-gray-600 mb-10 text-lg border-l-4 border-brand-green pl-4">
                {tracks[activeTab].description}
              </p>

              {/* Timeline */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-brand-green before:to-brand-navy/20">
                {tracks[activeTab].phases.map((phase, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Timeline dot */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-green text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <span className="font-bold text-brand-green text-sm tracking-wider uppercase">
                          {phase.id}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 bg-brand-navy/5 text-brand-navy rounded-full mt-2 sm:mt-0 w-fit">
                          {phase.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy mb-2 font-shareTech">
                        {phase.title}
                      </h3>
                      <div className="space-y-3 mt-4">
                        <div>
                          <h4 className="text-xs text-gray-400 font-bold uppercase mb-1">Focus & Goals</h4>
                          <p className="text-sm text-gray-700">{phase.goal}</p>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400 font-bold uppercase mb-1">Milestone</h4>
                          <p className="text-sm text-brand-navy font-medium bg-brand-green/10 p-3 rounded-lg border border-brand-green/20">
                            {phase.milestone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
}
