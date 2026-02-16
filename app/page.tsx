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
      title: "Health Risk Predictor App",
      description:
        "Developed a Python application using Streamlit and Scikit-learn for health risk classification. Implemented Pandas and NumPy for preprocessing and integrated Matplotlib and Seaborn for health trend visualizations. Enables users to identify potential health risks through data-driven analysis.",
      tech: [
        "Python",
        "Streamlit",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn"
      ],
      github: "https://github.com/suheeda/RiskPredictor",
      live: "https://secure-encouragement-production-1faf.up.railway.app/",
    },
    {
      title: "News Analyzer Dashboard",
      description:
        "End-to-end data engineering project that fetches live news using NewsAPI, performs sentiment analysis with VADER, stores processed data in SQLite, and visualizes insights through a Streamlit dashboard.",
      tech: ["Python", "Streamlit", "SQLite", "VADER", "NewsAPI"],
      github: "https://github.com/suheeda/news-analyzer",
      live: "https://github.com/suheeda/news-analyzer",
    },
    {
      title: "Bounty Creation Platform",
      description:
        "A full-stack platform where users can create, manage and track bounties. Designed with a clean UI and deployed live.",
      tech: ["Next.js", "TypeScript", "Node.js"],
      github: "https://github.com/suheeda/bounty-creation-platform",
      live: "https://bounty-creation-platform.netlify.app/",
    },
  ];

  return (
    <main className="bg-black text-white relative z-0">
      {/* Scroll Animation Section */}
      <section className="h-[200vh] relative">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full z-0"
        />

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
          <h1
            key={activeText}
            className="text-4xl md:text-6xl font-semibold text-center 
                       bg-gradient-to-r from-blue-400 to-purple-500 
                       text-transparent bg-clip-text 
                       transition-all duration-700 ease-in-out"
          >
            {highlights[activeText]}
          </h1>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 px-6 md:px-20 py-20 bg-black">
        <h2 className="text-4xl font-bold mb-12 text-center">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                >
                  Live Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 text-center py-16 bg-black">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <p>
          Email:{" "}
          <a
            href="mailto:suheedasf10@gmail.com"
            className="text-blue-500 hover:underline"
          >
            suheedasf10@gmail.com
          </a>
        </p>
        <p className="mt-2">
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/suheeda-s-f-21bb45331"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            linkedin.com/in/suheeda-s-f-21bb45331
          </a>
        </p>
      </section>
    </main>
  );
}