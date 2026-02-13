"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const frameCount = 120;

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
      const maxScroll =
        document.body.scrollHeight - window.innerHeight;
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
    };

    window.addEventListener("scroll", render);
    render();

    return () => window.removeEventListener("scroll", render);
  }, [images]);

  const projects = [
    {
      title: "Bounty Creation Platform",
      description:
        "A full-stack platform where users can create, manage and track bounties. Designed with a clean UI and deployed live.",
      tech: ["Next.js", "TypeScript", "Node.js"],
      github: "https://github.com/suheeda/bounty-creation-platform",
      live: "https://bounty-creation-platform.netlify.app/",
    },
    {
      title: "Animated Portfolio Website",
      description:
        "Scroll-based frame animation portfolio built with Next.js and deployed on Vercel for high performance.",
      tech: ["Next.js", "React", "Vercel"],
      github: "https://github.com/suheeda/portfolio-project",
      live: "https://portfolio-project-alpha-mocha.vercel.app/",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* Scroll Animation Section */}
      <section className="h-[200vh] relative">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full"
        />
      </section>

      {/* Professional Title Section */}
      <section className="relative z-10 px-6 md:px-20 py-20 bg-black text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Entry-Level Data Engineer
        </h1>

        <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Entry-level Data Engineer with hands-on experience in Python-based data processing,
          analytics, and machine learning projects. Skilled in SQL, Pandas, NumPy, and
          building data-driven applications with a strong focus on data validation,
          workflow optimization, and structured data handling. Experience working with
          high-volume operational datasets at TCS. Immediate joiner seeking an
          Associate Data Engineer / DataOps role.
        </p>
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
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  GitHub
                </a>

                <a
                  href={project.live}
                  target="_blank"
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
      <section className="text-center py-16 bg-black">
        <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
        <p>Email: suheedasf10@gmail.com</p>
        <p className="mt-2">
          LinkedIn: linkedin.com/in/suheeda-s-f-21bb45331
        </p>
      </section>
    </main>
  );
}