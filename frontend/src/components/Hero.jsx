import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const text = "With Taskly";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;

      if (index === text.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">

          {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Organize Your Work
            <br />

            <span className="text-primary">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Description */}
          <p className="py-6 text-lg text-base-content/70">
            Manage your tasks, stay organized, and get things done
            efficiently with Taskly.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>

            <Link to="/dashboard" className="btn btn-outline">
              View Demo
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;