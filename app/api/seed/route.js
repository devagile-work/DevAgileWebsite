import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/mongodb';
import Bootcamp from '../../../models/Bootcamp';
import Track from '../../../models/Track';

export async function GET() {
  try {
    await connectMongoDB();

    // Clear existing to avoid duplicates if run multiple times
    await Bootcamp.deleteMany({});
    await Track.deleteMany({});

    // Create Tracks
    const track1 = await Track.create({
      slug: "full-stack-web-dev",
      title: "Full Stack Web Dev",
      description: "Master modern web development, React, Next.js, Node.js, and system design in this comprehensive track.",
      individualPrice: 799,
      features: ["MERN Stack Mastery", "Next.js & SSR", "System Design Basics"],
      videos: [
        { title: "Introduction to HTML/CSS", description: "Basics of web pages", link: "https://example.com/vid1", duration: "15:00" },
        { title: "Advanced React", description: "Hooks and context", link: "https://example.com/vid2", duration: "25:30" }
      ]
    });

    const track2 = await Track.create({
      slug: "dsa-track",
      title: "DSA Track",
      description: "Conquer Data Structures and Algorithms. Learn to solve complex problems and ace your technical interviews.",
      individualPrice: 799,
      features: ["Arrays & Linked Lists", "Trees & Graphs", "Dynamic Programming"],
      videos: [
        { title: "Big O Notation", description: "Time and space complexity", link: "https://example.com/vid3", duration: "20:00" },
        { title: "Graph Traversal", description: "BFS and DFS", link: "https://example.com/vid4", duration: "30:15" }
      ]
    });

    const track3 = await Track.create({
      slug: "ai-track",
      title: "AI Track",
      description: "Dive into Artificial Intelligence, Machine Learning, and building real-world LLM applications.",
      individualPrice: 799,
      features: ["Machine Learning Basics", "Transformers & LLMs", "LangChain & AI Agents"],
      videos: [
        { title: "Intro to Neural Networks", description: "Basic perceptron model", link: "https://example.com/vid5", duration: "18:45" },
        { title: "Building a RAG App", description: "Using LangChain", link: "https://example.com/vid6", duration: "40:00" }
      ]
    });

    // Create Bootcamp
    await Bootcamp.create({
      slug: "tech-mastery",
      title: "TechMastery Bootcamp",
      description: "Master modern web development, algorithms, and AI in this comprehensive bootcamp. Designed to take you from beginner to job-ready.",
      image: "/poster/techMastery.png",
      bundlePrice: 1999,
      tracks: [track1._id, track2._id, track3._id]
    });

    return NextResponse.json({ message: "Seed successful!" }, { status: 200 });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
