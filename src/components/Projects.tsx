"use client";

import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: "voxtutor",
    title: "VoxTutor",
    category: "AI INTERVIEW PREPARATION PLATFORM",
    description: "An AI-powered interview preparation platform built with VAPI. Choose from different AI avatar personas to conduct your mock interview — each with unique speaking styles and personalities. Get real-time voice feedback and performance analytics.",
    image: "/projects/aurelia.png",
    demoLink: "#",
    githubLink: "#",
    tags: ["AI", "VAPI", "Voice", "Interview Prep"],
  },
  {
    id: "inevitable",
    title: "Inevitable",
    category: "SMART SHOPPING AGGREGATOR",
    description: "A smart shopping aggregator that compares prices and stock across all major platforms in one search. Features an integrated AI Fashion Stylist that suggests outfits based on prompts and shows real-time availability across marketplaces.",
    image: "/projects/monza.png",
    demoLink: "#",
    githubLink: "#",
    tags: ["AI", "E-Commerce", "Fashion Tech"],
  },
  {
    id: "fintrace",
    title: "FinTrace",
    category: "INTELLIGENT AML DETECTION SYSTEM",
    description: "An intelligent money laundering detection system that analyzes financial transaction patterns and flags suspicious activity using machine learning algorithms.",
    image: "/projects/obsidian.png",
    demoLink: "#",
    githubLink: "#",
    tags: ["FinTech", "ML", "Security"],
  },
];

interface Achievement {
  title: string;
  award: string;
  link: string;
}

const achievements: Achievement[] = [
  {
    title: "GFG Hackathon",
    award: "Top 10 Finalist",
    link: "#",
  },
  {
    title: "GSSoC Contribution",
    award: "Top 10 Contributor",
    link: "#",
  },
];

export default function Projects() {
  return (
    <div className="bg-black text-white w-full">
      {/* PROJECTS SECTION */}
      <section id="projects" className="relative py-32 px-6 md:px-16 border-t border-white/10 max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4">
          <span className="font-sans text-[#FF5000] text-xs tracking-[0.35em] uppercase block font-black">
            ATHLETIC CRAFT // GRID
          </span>
          <h2 className="font-display font-normal text-6xl md:text-8xl text-white uppercase tracking-tighter leading-none select-none">
            SELECTED PROJECTS
          </h2>
        </div>

        {/* Editorial Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex flex-col border border-white/10 bg-black rounded-none p-6 transition-all duration-300 hover:border-[#FF5000] h-full"
            >
              {/* Product Cover Style Image */}
              <div className="relative aspect-[16/10] w-full bg-[#111] border border-white/5 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-103 opacity-90 hover:opacity-100"
                />
              </div>

              {/* Specs & Info */}
              <div className="flex-1 flex flex-col justify-between pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="font-sans text-white/50 bg-white/5 border border-white/10 px-2 py-0.5 text-[8px] tracking-widest uppercase font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-normal text-3xl md:text-4xl text-white tracking-tight leading-none">
                    {project.title}
                  </h3>

                  <p className="font-sans text-white/60 text-xs md:text-sm leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Sharp Nike-style Button Pairs */}
                <div className="pt-6 grid grid-cols-2 gap-4 border-t border-white/10">
                  <a 
                    href={project.demoLink}
                    className="flex justify-center items-center bg-white hover:bg-[#FF5000] text-black hover:text-white transition-all duration-300 font-sans font-black text-[10px] tracking-widest uppercase py-3 rounded-none select-none text-center"
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.githubLink}
                    className="flex justify-center items-center bg-transparent hover:bg-white/10 border border-white/20 text-white hover:border-white transition-all duration-300 font-sans font-black text-[10px] tracking-widest uppercase py-3 rounded-none select-none text-center"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="relative py-28 px-6 md:px-16 border-t border-white/10 bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center">
            <span className="font-sans text-[#FF5000] text-xs tracking-[0.35em] uppercase block font-black">
              PERFORMANCE RECORDS // STATS
            </span>
            <h2 className="font-display font-normal text-5xl md:text-7xl text-white uppercase tracking-tighter leading-none select-none">
              ACHIEVEMENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {achievements.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-8 border border-white/10 bg-black rounded-none group hover:border-[#FF5000] transition-colors duration-300"
              >
                <div className="space-y-2">
                  <span className="font-sans text-[#FF5000] text-[10px] tracking-[0.2em] uppercase font-black">
                    🏆 {item.award}
                  </span>
                  <h3 className="font-display font-normal text-2xl md:text-3xl text-white tracking-tight uppercase leading-none">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <a 
                    href={item.link}
                    className="inline-block bg-white hover:bg-[#FF5000] text-black hover:text-white font-sans font-black text-[10px] tracking-widest uppercase px-5 py-3 rounded-none transition-all duration-300"
                  >
                    Verify »
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
