"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frameCount = 119; // 👈 SET THIS to your exact number of frames

  // Load & render on scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    let loadedImages = 0;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const index = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${index}.png`;

      img.onload = () => {
        loadedImages++;
        if (loadedImages === 1) {
          // Draw first frame immediately
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };

      images.push(img);
    }

    const render = (index: number) => {
      if (!images[index]) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        images[index],
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.body.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      render(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="relative">

      {/* Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 h-screen w-full bg-black pointer-events-none"
      />

      {/* Hero Text */}
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center text-white z-10 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I’m Suheeda SF
        </h1>
        <p className="text-xl max-w-md">
          Python & Data Analytics enthusiast building projects with Next.js and React.
        </p>
      </div>

      {/* Scroll space */}
      <div style={{ height: "300vh" }} />

      {/* Projects Section */}
      <section className="relative z-20 bg-zinc-50 dark:bg-black py-16 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-black dark:text-white mb-6">
          My Projects
        </h2>

        <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 text-lg">
          <li>
            <a
              href="#"
              className="underline hover:text-blue-500"
            >
              Portfolio Website
            </a>
          </li>
          <li>
            <a
              href="#"
              className="underline hover:text-blue-500"
            >
              Data Analytics Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="underline hover:text-blue-500"
            >
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
          <a
            href="mailto:suheedasf10@gmail.com"
            className="underline hover:text-blue-500"
          >
            suheedasf10@gmail.com
          </a>
        </p>

        <p className="text-zinc-700 dark:text-zinc-300 text-lg mt-2">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/suheeda-s-f-21bb45331/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-500"
          >
            linkedin.com/in/suheeda-s-f-21bb45331
          </a>
        </p>
      </section>

    </div>
  );
}
