"use client";

import { Star } from "lucide-react";

const expertiseItems = [
  "React & Next.js",
  "Node.js & Express",
  "Flask & Python",
  "SQL & NoSQL Databases",
  "UI/UX Implementation",
  "Accessibility (WCAG)",
  "Performance Optimization",
  "API Design & Integration",
  "Version Control (Git, GitHub)",
  "Full-Stack Development",
  "Research & Design Systems",
];

export default function ExpertiseTicker() {
  return (
    <>
      <hr className="border-gray-700 w-full" />
      <div className="overflow-hidden w-full">
        <div
          id="scrolling-container"
          className="flex gap-5 text-2xl md:text-3xl lg:text-4xl flex-row items-center font-medium whitespace-nowrap p-10 text-gray-300"
        >
          {/* Primary Row */}
          <div className="flex items-center gap-5">
            {expertiseItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-5">
                <Star className="text-lg fill-current" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Duplicate for seamless scroll */}
          <div className="flex items-center gap-5">
            {expertiseItems.map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-5">
                <Star className="text-lg fill-current" size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-gray-700 w-full" />
    </>
  );
}
