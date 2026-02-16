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
        "Streamlit + Scikit-learn based ML app for health risk classification with preprocessing, feature engineering, and data visualization.",
      tech: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      github: "https://github.com/suheeda/RiskPredictor",
      live: "https://secure-encouragement-production-1faf.up.railway.app/",
    },
    {
      title: "News Analyzer Dashboard",
      description:
        "End-to-end data engineering pipeline with NewsAPI ingestion, VADER sentiment analysis, SQLite storage, and Streamlit visualization.",
      tech: ["Python", "Streamlit", "SQLite", "VADER", "NewsAPI"],
      github: "https://github.com/suheeda/news-analyzer",
      live: "https://github.com/suheeda/news-analyzer",
    },
    {
      title: "Bounty Creation Platform",
      description:
        "Full-stack bounty management platform with clean UI and scalable architecture.",
      tech: ["Next.js", "TypeScript", "Node.js"],
      github: "https://github.com/suheeda/bounty-creation-platform",
      live: "https://bounty-creation-platform.netlify.app/",
    },
  ];

  return (
    <main className="relative z-0 text-white bg-gradient-to-br from-black via-gray-950 to-black overflow-x-hidden">

      {/* Scroll Animation Section (UNCHANGED) */}
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

      {/* Projects Section — GRAY THEME */}
      <section className="relative z-10 px-6 md:px-20 py-24 
        bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 text-gray-900">

        <h2 className="text-4xl font-bold mb-16 text-center 
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 
          text-transparent bg-clip-text">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white 
                         p-8 rounded-3xl border border-gray-200
                         transition-all duration-500 
                         hover:scale-105 hover:shadow-2xl 
                         hover:shadow-purple-300/40"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 
                             group-hover:text-purple-600 transition">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm
                               group-hover:bg-purple-100 
                               group-hover:text-purple-700 
                               transition"
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
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-black transition"
                >
                  GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg 
                             bg-gradient-to-r from-blue-500 to-purple-600
                             text-white hover:scale-105 transition duration-300"
                >
                  Live Demo 🚀
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section — DARK GRAY THEME */}
      <section className="relative z-20 py-24 flex justify-center 
        bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800">

        <div className="w-full max-w-3xl bg-gray-900 p-12 rounded-3xl 
                        shadow-2xl border border-purple-500/30">

          <h2 className="text-4xl font-bold text-center mb-4 
            bg-gradient-to-r from-purple-400 to-pink-500 
            text-transparent bg-clip-text">
            Get In Touch
          </h2>

          <p className="text-center text-gray-400 mb-10">
            Have a project in mind? Let’s build something impactful.
          </p>

          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent successfully 🚀");
            }}
          >
            <div className="grid md:grid-cols-2 gap-8">

              <div className="relative">
                <input
                  type="text"
                  required
                  className="peer w-full bg-transparent border-b border-gray-600 
                             py-3 focus:outline-none focus:border-purple-500 
                             text-white transition-all duration-300"
                />
                <label
                  className="absolute left-0 top-3 text-gray-400 
                             peer-focus:-top-4 peer-focus:text-sm 
                             peer-focus:text-purple-400 
                             transition-all duration-300"
                >
                  Your Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  className="peer w-full bg-transparent border-b border-gray-600 
                             py-3 focus:outline-none focus:border-purple-500 
                             text-white transition-all duration-300"
                />
                <label
                  className="absolute left-0 top-3 text-gray-400 
                             peer-focus:-top-4 peer-focus:text-sm 
                             peer-focus:text-purple-400 
                             transition-all duration-300"
                >
                  Your Email
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                required
                className="peer w-full bg-transparent border-b border-gray-600 
                           py-3 focus:outline-none focus:border-purple-500 
                           text-white transition-all duration-300"
              />
              <label
                className="absolute left-0 top-3 text-gray-400 
                           peer-focus:-top-4 peer-focus:text-sm 
                           peer-focus:text-purple-400 
                           transition-all duration-300"
              >
                Tell me about your project...
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-semibold 
                         bg-gradient-to-r from-purple-500 to-pink-600 
                         hover:scale-105 hover:shadow-xl 
                         hover:shadow-purple-500/40 
                         transition-all duration-300"
            >
              Send Message ✨
            </button>
          </form>

          <div className="my-10 border-t border-gray-800"></div>

          <div className="text-center space-y-4">
            <p className="text-gray-400">
              📧{" "}
              <a
                href="mailto:suheedasf10@gmail.com"
                className="text-purple-400 hover:text-pink-400 transition duration-300"
              >
                suheedasf10@gmail.com
              </a>
            </p>

            <p className="text-gray-400">
              🔗{" "}
              <a
                href="https://linkedin.com/in/suheeda-s-f-21bb45331"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-pink-400 transition duration-300"
              >
                linkedin.com/in/suheeda-s-f-21bb45331
              </a>
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}