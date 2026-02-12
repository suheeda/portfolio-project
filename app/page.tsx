import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans px-6 py-12">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-black dark:text-white mb-4 text-center">
        Hi, I’m Suheeda SF
      </h1>
      <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 text-center max-w-md">
        I’m a Python & Data Analytics enthusiast building projects with Next.js and React.
      </p>

      {/* Projects Section */}
      <section className="mb-12 w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          My Projects
        </h2>
        <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
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
      <section className="w-full max-w-xl text-center">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
          Contact Me
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Email: <a href="mailto:suheedasf10@.gmailcom" className="underline">suheedasf10@gmail.com</a>
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          LinkedIn:{" "}
          <a href="https://www.linkedin.com/in/suheeda/" className="underline">
            linkedin.com/in/suheeda
          </a>
        </p>
      </section>
    </div>
  );
}
