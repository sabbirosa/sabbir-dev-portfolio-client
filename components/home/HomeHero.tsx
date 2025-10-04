"use client";

import { socials } from "@/data/socials";
import { faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ShinyText from "./ShinyText";

export default function HomeHero() {
  return (
    <section className="py-10 flex flex-col justify-center items-center px-4 sm:px-16">
      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full gap-8">
        {/* Text Section */}
        <div className="intro w-full lg:w-1/2 space-y-4 py-6">
          <p className="text-lg sm:text-xl">
            Hi, I&apos;m Sabbir Bin Abdul Latif
          </p>
          <h1 className="text-5xl sm:text-6xl font-semibold leading-tight">
            Aspiring <br />{" "}
            <span className="text-[#7C3AED]">Software Engineer</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl text-gray-300">
            I connect real-world problems to scalable, accessible software,
            building with{" "}
            <ShinyText
              text="React/Next.js • TypeScript • Node/Express"
              disabled={false}
              speed={2.5}
              className="text-[#7C3AED]"
            />{" "}
            and modern databases.
          </p>

          <hr className="border-[#E2E8F0]/40 w-full" />

          <div className="mt-4 flex gap-3 flex-wrap">
            <a
              href="/Documents/Resume_Sabbir Bin Abdul Latif.pdf"
              download={"Sabbir Bin Abdul Latif's Resume"}
              className="text-sm px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-full hover:bg-[#7C3AED] hover:text-white transition duration-300"
            >
              Download Resume
              <FontAwesomeIcon
                icon={faArrowDown}
                className="ml-2 w-3 h-3 -rotate-45"
              />
            </a>
          </div>

          {/* Social Links */}
          <div className="social-links flex gap-6 mt-6 font-normal">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="group relative py-2 bg-transparent"
              aria-label="GitHub"
            >
              GitHub
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mx-2 w-4 h-4 -rotate-45"
              />
              <span className="block h-[2px] bg-[#7C3AED] w-0 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group relative py-2 bg-transparent"
              aria-label="LinkedIn"
            >
              LinkedIn
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mx-2 w-4 h-4 -rotate-45"
              />
              <span className="block h-[2px] bg-[#7C3AED] w-0 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <a
              href={socials.email}
              className="group relative py-2 bg-transparent"
              aria-label="Email"
            >
              Email
              <FontAwesomeIcon
                icon={faArrowRight}
                className="mx-2 w-4 h-4 -rotate-45"
              />
              <span className="block h-[2px] bg-[#7C3AED] w-0 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="h-[500px] w-[400px] max-md:h-96 overflow-hidden rounded-b-full shadow-2xl border border-white/5">
            <Image
              src="/images/sabbir.png"
              alt="Sabbir portrait"
              width={400}
              height={500}
              className="h-full w-full aspect-[3/4] rounded-b-full object-cover object-top transition duration-300 hover:scale-[1.02] grayscale hover:grayscale-0"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
