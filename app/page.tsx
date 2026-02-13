"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [activeText, setActiveText] = useState(0);

  const frameCount = 120;

  const highlights = [
    "Suheeda S F",
    "Entry-Level Data Engineer",
    "Python & SQL",
    "ETL & Data Processing",
    "Workflow Optimization",
    "Data Validation & Structured Handling",
    "Associate Data Engineer / DataOps Role"
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

  return (
    <main className="bg-black text-white">
      {/* Animation Section */}
      <section className="relative h-[200vh]">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full -z-10"
        />

        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
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
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Bounty Creation Platform
            </h3>
            <p className="text-gray-300 mb-6">
              Multi-step wizard web application with structured form handling and state persistence.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/suheeda/bounty-creation-platform"
                target="_blank"
                className="px-4 py-2 bg-gray-800 rounded-lg"
              >
                GitHub
              </a>

              <a
                href="https://bounty-creation-platform.netlify.app/"
                target="_blank"
                className="px-4 py-2 bg-blue-600 rounded-lg"
              >
                Live Demo
              </a>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-3">
              Animated Portfolio Website
            </h3>
            <p className="text-gray-300 mb-6">
              Scroll-based frame animation portfolio built with Next.js and deployed on Vercel.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/suheeda/portfolio-project"
                target="_blank"
                className="px-4 py-2 bg-gray-800 rounded-lg"
              >
                GitHub
              </a>

              <a
                href="https://portfolio-project-alpha-mocha.vercel.app/"
                target="_blank"
                className="px-4 py-2 bg-blue-600 rounded-lg"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center py-16 bg-black">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>Email: suheedasf10@gmail.com</p>
        <p className="mt-2">
          LinkedIn: linkedin.com/in/suheeda-s-f-21bb45331
        </p>
      </section>
    </main>
  );
}