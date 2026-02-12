"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Load sequence images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i <= 119; i++) { // Adjust number of frames
      const img = new Image();
      const index = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${index}_delay-0.067s.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw current frame on canvas based on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d")!;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(scrollTop / docHeight, 1);
      const frameIndex = Math.min(
        images.length - 1,
        Math.floor(scrollFraction * images.length)
      );
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial draw

    return () => window.removeEventListener("scroll", handleScroll);
  }, [images]);

  return (
    <div>
      {/* Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 h-screen w-full object-cover bg-black"
      />

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center text-white z-10 px-6">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Hi, I’m Suheeda SF
        </h1>
        <p className="text-xl text-center max-w-md">
          I’m a Python & Data Analytics enthusiast building projects with Next.js and React.
        </p>
      </div>

      {/* Projects Section */}
      <section className="relative z-20 bg-zinc-50 dark:bg-black py-16 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-6">
          My Projects
        </h2>
        <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">
          <li>
            <a href="#" className="underline hover:text-blue-500">
              Portfolio Website
            </a>
          </li>
          <li>
            <a href="#" className="underline hover:text-blue-500">
              Data Analytics Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="underline hover:text-blue-500">
              Python Automation Scripts
            </a>
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 bg-zinc-50 dark:bg-black py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-4">
          Contact Me
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-lg">
          Email:{" "}
          <a href="mailto:suheedasf10@gmail.com" className="underline">
            suheedasf10@gmail.com
          </a>
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 text-lg">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/suheeda/"
            className="underline"
          >
            linkedin.com/in/suheeda
          </a>
        </p>
      </section>
    </div>
  );
}
