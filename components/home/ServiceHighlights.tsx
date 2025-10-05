"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServiceHighlights() {
  return (
    <section className="service-tag py-28 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="w-full">
        {/* Title Section */}
        <div className="flex flex-wrap justify-between mb-8 gap-8">
          <h2 className="text-4xl md:text-5xl font-semibold mb-5 uppercase text-balance">
            My Service
            <br />
            Expertise
          </h2>
          <div className="flex justify-end">
            <div className="max-w-lg">
              <p className="text-gray-400 mb-5 text-balance">
                As an aspiring software engineer, I blend technical precision
                with user-focused design—delivering solutions that are
                functional, scalable, and visually engaging. My approach pairs
                solid engineering principles with seamless user experience.
              </p>

              {/* Right Side Button */}
              <Link href="/contact">
                <button className="contact-btn border p-3 text-sm border-gray-700 rounded-3xl cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 mb-10 flex items-center gap-2">
                  Let's Discuss
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {/* UI/UX Implementation */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg text-gray-500">(01)</h3>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              UI/UX Implementation
            </h3>
            <p className="text-gray-400 mt-2">
              Building intuitive, accessible interfaces guided by research and
              modern design systems. Prioritizing responsiveness, clarity, and
              accessibility for all users.
            </p>
          </div>

          {/* Animations & Performance */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg text-gray-500">(02)</h3>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              Animations & Performance Optimization
            </h3>
            <p className="text-gray-400 mt-2">
              Adding motion that enhances—not distracts—from usability, with
              GSAP-powered animations and performance tuning for smooth,
              high-FPS experiences.
            </p>
          </div>

          {/* Full-Stack Development */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg text-gray-500">(03)</h3>
            <h3 className="text-2xl font-semibold mt-2 mb-3">
              Full-Stack Development
            </h3>
            <p className="text-gray-400 mt-2">
              Developing scalable applications with React/Next.js, Node/Express,
              Flask, and SQL/NoSQL databases—integrating secure APIs, optimized
              queries, and modular architectures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
