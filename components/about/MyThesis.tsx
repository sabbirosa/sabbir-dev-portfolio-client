"use client";

import {
  faBookOpen,
  faExternalLinkAlt,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ShinyText from "../home/ShinyText";

const MyThesis = ({
  imageSrc = "/images/thesis-photo.png",
  imageAlt = "Sabbir with thesis book",
  civixUrl = "https://civix-ui.vercel.app",
  prototypeUrl = "https://epassport-reimagined.vercel.app",
}) => {
  return (
    <section id="thesis" className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Image Side */}
        <div className="order-2 md:order-1 h-full">
          <div className="rounded-2xl h-full overflow-hidden border border-gray-400 shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-full object-cover aspect-[4/3]"
            />
          </div>
        </div>

        {/* Text Side */}
        <div className="order-1 md:order-2">
          <h2 className="text-lg mb-2 text-[#7C3AED] flex items-center">
            <FontAwesomeIcon icon={faStarOfLife} className="text-lg mr-2" />
            <ShinyText text="My Thesis" disabled={false} speed={2.5} />
          </h2>

          <h3 className="text-3xl md:text-4xl font-semibold mb-3 leading-snug">
            Exploring Usability Issues of E-Government Websites in Bangladesh
          </h3>

          <p className="text-sm text-gray-400 mb-4">
            Oct 2024 – Jun 2025 • BRAC University
          </p>

          <p className="text-base md:text-lg text-gray-200/90 leading-relaxed">
            I conducted a mixed-methods study on Bangladesh's e-government
            platforms focused on citizens with limited digital literacy. The
            work diagnoses recurring UX barriers and proposes standardized,
            accessible design solutions that government teams can adopt quickly.
          </p>

          <ul className="mt-5 space-y-2 text-gray-200/90">
            <li>
              • Evaluated key services and identified common pain points
              (navigation, forms, language).
            </li>
            <li>
              • Built{" "}
              <span className="font-semibold text-[#7C3AED]">Civix UI</span> —
              an accessible component library for gov services.
            </li>
            <li>
              • Prototyped flows (e.g., E-Passport) with clearer steps, error
              states, and form guidance.
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={civixUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED] text-white border border-[#7C3AED]
                         hover:bg-transparent hover:text-[#7C3AED] transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faBookOpen} />
              View Civix UI
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
            </a>

            {prototypeUrl && (
              <a
                href={prototypeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-500 text-gray-200
                           hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition-colors duration-300"
              >
                E-Passport Prototype
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyThesis;
