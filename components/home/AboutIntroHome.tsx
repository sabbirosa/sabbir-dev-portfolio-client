"use client";

import { Star } from "lucide-react";
import { useEffect, useRef } from "react";
import ShinyText from "./ShinyText";

export default function AboutIntroHome() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            textRef.current.style.opacity = "1";
            textRef.current.style.clipPath = "inset(0% 0% 0% 0%)";
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="page-3 pb-16 pt-20 px-4 md:px-20 max-w-7xl mx-auto"
    >
      <h2 className="h2 text-center text-purple-600 text-sm md:text-base pb-10 uppercase flex items-center justify-center gap-2">
        <Star className="text-sm" size={12} />
        <ShinyText text="About Me" disabled={false} speed={3} />
      </h2>

      <h3
        ref={textRef}
        className="mx-auto max-w-6xl text-3xl font-medium max-md:text-xl text-gray-600 leading-relaxed text-center transition-all duration-1000 ease-out"
        style={{
          opacity: 0,
          clipPath: "inset(0% 100% 0% 0%)",
        }}
      >
        I&apos;m <span className="text-white">Sabbir Bin Abdul Latif</span>, an
        <span className="text-purple-600"> aspiring software engineer</span> who
        loves connecting patterns between real‑world problems and scalable
        digital systems. I build accessible, performance‑minded apps with
        React/Next.js, TypeScript, Node/Express & Flask, and SQL/NoSQL
        databases.
      </h3>
    </div>
  );
}
