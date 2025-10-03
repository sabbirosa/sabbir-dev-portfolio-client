"use client";

import { menuItems } from "@/data/menu";
import { socials } from "@/data/socials";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-6 px-14 max-sm:px-2 flex flex-col items-center">
      {/* Call to Action Box */}
      <div className="footer bg-white shadow-lg rounded-4xl py-10 items-center flex justify-center flex-col text-center h-96 w-[70rem] max-lg:w-full">
        <p className="work inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm mb-3">
          <span className="inline-flex mr-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
            <span className="absolute w-2 h-2 bg-purple-500 rounded-full"></span>
          </span>
          Available for work
        </p>
        <h2 className="text-2xl sm:text-5xl font-medium text-gray-900">
          Let&apos;s build something
          <br />
          amazing together.
        </h2>
        <Link href="/contact">
          <button className="contact-btn mt-5 px-8 py-3 bg-[#18181B] text-white rounded-full text-sm max-sm:text-xs cursor-pointer font-medium transition ease-in-out hover:bg-gray-800">
            Contact Me
          </button>
        </Link>
      </div>

      {/* Footer Navigation */}
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="transition-colors hover:text-[#7C3AED]"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 mt-8 w-full px-4 max-sm:pb-20">
        {/* Copyright Text */}
        <p className="max-sm:text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} Sabbir Bin Abdul Latif. All rights
          reserved.
        </p>

        {/* Social Media Icons */}
        <div className="social-links flex gap-5">
          <a
            href={socials.linkedin}
            className="text-gray-700 hover:text-black transition text-2xl"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
          </a>
          <a
            href={socials.github}
            className="text-gray-700 hover:text-black transition text-2xl"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
          </a>
          <a
            href={socials.email}
            className="text-gray-700 hover:text-black transition text-2xl"
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
