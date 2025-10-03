import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  codeLink?: string;
  year: string;
  techStack: string[];
}

interface FeaturedWorkProps {
  projects: Project[];
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="work-tage py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-semibold mb-5">FEATURED WORK</h2>
        <div className="flex flex-wrap justify-between">
          <p className="text-gray-400 max-w-xl mb-10">
            As an aspiring software engineer, I build scalable, accessible, and user-focused
            digital solutions—from full-stack platforms to open-source libraries.
          </p>
          <Link href="/contact">
            <button className="contact-btn border p-3 border-black rounded-3xl cursor-pointer hover:bg-black hover:text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 mb-10">
              Let's Discuss{" "}
              <FontAwesomeIcon icon={faArrowRight} className="mx-2 w-4 h-4 -rotate-45" />
            </button>
          </Link>
        </div>

        {projects.map((project, index) => (
          <div
            key={project._id}
            className="flex flex-col md:flex-row items-center gap-6 mb-12 border-b border-gray-700 pb-8 w-full"
          >
            {/* Text */}
            <div className="flex-1 text-left">
              <h3 className="text-2xl font-medium mb-2">
                {project.title} <span className="text-gray-500">(0{index + 1})</span>
              </h3>
              <p className="text-gray-400">{project.description}</p>
              <div className="mt-3 flex gap-3 flex-wrap">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-full hover:bg-[#7C3AED] hover:text-white transition duration-300"
                >
                  Live Project
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 -rotate-45" />
                </a>
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 border border-gray-400 text-gray-300 rounded-full hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition duration-300"
                  >
                    Source Code
                    <FontAwesomeIcon icon={faGithub} className="ml-2 w-4 h-4" />
                  </a>
                )}
                <Link
                  href={`/projects/${project._id}`}
                  className="text-sm px-4 py-2 border border-gray-600 text-gray-200 rounded-full hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition duration-300"
                >
                  View Details
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-3 h-3 -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <a href="https://github.com/sabbirosa" target="_blank" rel="noreferrer">
            <button
              type="button"
              className="btn bg-[#222] text-gray-400 hover:text-white rounded-full px-5 py-3 text-sm 
              hover:bg-[#1E1E1E] transition-all cursor-pointer inline-flex items-center gap-1 shadow-lg"
            >
              More projects on
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

