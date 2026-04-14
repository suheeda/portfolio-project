"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [activeText, setActiveText] = useState(0);

  const frameCount = 120;

  const highlights = [
    "Entry-Level Data Engineer",
    "Python-Based Data Processing",
    "Eager to Learn SQL, Pandas & NumPy",
    "Data Validation & Structured Handling",
    "Workflow Optimization",
    "TCS | High-Volume Operational Datasets",
    "Open to Associate Data Engineer / DataOps Roles"
  ];

  useEffect(() => {
    const imgArray: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}.png`;
      imgArray.push(img);
    }

    setImages(imgArray);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      const img = images[frameIndex];
      if (img) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      const textIndex = Math.min(
        highlights.length - 1,
        Math.floor(scrollFraction * highlights.length)
      );

      setActiveText(textIndex);
    };

    window.addEventListener("scroll", render);
    render();

    return () => window.removeEventListener("scroll", render);
  }, [images]);

  const projects = [
    {
      title: "Founder OS",
      featured: true,
      description:
        "Full-stack frontend assignment with clean UI structure and scalable component design.",
      tech: ["Next.js", "TypeScript", "React"],
      github: "https://github.com/suheeda/founder-os",
      live: "https://founder-os-frontend.onrender.com/",
    },
    {
      title: "O2C Graph Intelligence",
      description:
        "Graph-based system for visualizing order-to-cash workflow and data insights.",
      tech: ["React", "D3.js", "Node.js"],
      github: "https://github.com/suheeda/o2c-graph-intelligence",
      live: "https://o2c-graph-intelligence.onrender.com/",
    },
    {
      title: "News Analyzer Dashboard",
      description:
        "Data pipeline with sentiment analysis, NewsAPI ingestion, and visualization dashboard.",
      tech: ["Python", "Streamlit", "SQLite"],
      github: "https://github.com/suheeda/news-analyzer",
      live: "https://github.com/suheeda/news-analyzer",
    },
    {
      title: "Student Table Assignment",
      description:
        "Full-stack CRUD application for managing student records with responsive UI.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/suheeda/Full-Stack-Assignment-Students-Table",
      live: "https://students-table-assignment.netlify.app/",
    },
    {
      title: "Bounty Creation Platform",
      description:
        "Bounty management platform with structured UI and scalable backend integration.",
      tech: ["Next.js", "TypeScript", "Node.js"],
      github: "https://github.com/suheeda/bounty-creation-platform",
      live: "https://bounty-creation-platform.netlify.app/",
    },
    {
      title: "Health Risk Predictor App",
      description:
        "ML-based health risk prediction app using preprocessing and visualization techniques.",
      tech: ["Python", "Streamlit", "Scikit-learn"],
      github: "https://github.com/suheeda/RiskPredictor",
      live: "https://secure-encouragement-production-1faf.up.railway.app/",
    },
  ];

  return (
    <main className="relative z-0 text-white bg-gradient-to-br from-black via-gray-950 to-black overflow-x-hidden">

      {/* ANIMATION (UNCHANGED — DO NOT TOUCH) */}
      <section className="h-[200vh] relative">
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1
            key={activeText}
            className="text-4xl md:text-6xl font-semibold text-center 
                       bg-gradient-to-r from-blue-400 to-purple-500 
                       text-transparent bg-clip-text"
          >
            {highlights[activeText]}
          </h1>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="relative z-10 px-6 md:px-20 py-24 
        bg-gradient-to-br from-[#1c1c1e] via-[#2c2c2e] to-[#1c1c1e] text-gray-100">

        <h2 className="text-4xl font-bold mb-16 text-center 
          bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
          text-transparent bg-clip-text">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative 
                         bg-white/5 backdrop-blur-xl
                         p-8 rounded-3xl 
                         border border-white/10
                         transition-all duration-500 
                         hover:scale-105 
                         hover:border-purple-400/40
                         hover:shadow-2xl 
                         hover:shadow-purple-500/20"
            >

              {/* FEATURED BADGE */}
              {project.featured && (
                <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full 
                  bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                  Featured
                </span>
              )}

              <h3 className="text-2xl font-semibold mb-4 text-white 
                             group-hover:text-purple-300 transition">
                {project.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-gray-200 px-3 py-1 rounded-full text-sm
                               group-hover:bg-purple-500/20 transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-black transition">
                  GitHub
                </a>

                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg 
                             bg-gradient-to-r from-blue-500 to-purple-600
                             text-white hover:scale-105 transition duration-300">
                  Live Demo 🚀
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT (UNCHANGED) */}
      <section className="relative z-20 py-24 flex justify-center 
        bg-gradient-to-br from-[#2c2c2e] via-[#1c1c1e] to-black">

        <div className="w-full max-w-3xl 
                        bg-white/5 backdrop-blur-xl
                        p-12 rounded-3xl 
                        shadow-2xl 
                        border border-white/10">

          <h2 className="text-4xl font-bold text-center mb-4 
            bg-gradient-to-r from-purple-400 to-pink-500 
            text-transparent bg-clip-text">
            Get In Touch
          </h2>

          <p className="text-center text-gray-400 mb-10">
            Have a project in mind? Let’s build something impactful.
          </p>

          <form className="space-y-8">
            <input className="w-full bg-transparent border-b border-gray-600 py-3 text-white" placeholder="Your Name" />
            <input className="w-full bg-transparent border-b border-gray-600 py-3 text-white" placeholder="Your Email" />
            <textarea className="w-full bg-transparent border-b border-gray-600 py-3 text-white" rows={4} placeholder="Message" />

            <button
              className="w-full py-4 rounded-xl font-semibold 
                         bg-gradient-to-r from-purple-500 to-pink-600 
                         hover:scale-105 transition-all duration-300">
              Send Message ✨
            </button>
          </form>

        </div>
      </section>

    </main>
  );
}