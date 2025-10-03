import { projectAPI } from "@/lib/api";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ISR revalidation

export default async function ProjectsPage() {
  let projects = [];

  try {
    const response = await projectAPI.getAll();
    projects = response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-semibold mb-5">ALL PROJECTS</h1>
        <p className="text-gray-400 max-w-xl mb-10">
          Explore all my projects showcasing full-stack development, UI/UX
          design, and problem-solving skills.
        </p>

        <div className="space-y-12">
          {projects.map((project: any, index: number) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-700 pb-8"
            >
              {/* Text */}
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-medium mb-2">
                  {project.title}{" "}
                  <span className="text-gray-500">(0{index + 1})</span>
                </h3>
                <p className="text-gray-400 mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack
                    .slice(0, 5)
                    .map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-[#7C3AED]/20 text-[#7C3AED] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                <div className="mt-3 flex gap-3 flex-wrap">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-full hover:bg-[#7C3AED] hover:text-white transition duration-300"
                  >
                    Live Project
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 w-3 h-3 -rotate-45"
                    />
                  </a>
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm px-4 py-2 border border-gray-400 text-gray-300 rounded-full hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition duration-300"
                    >
                      Source Code
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="ml-2 w-4 h-4"
                      />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project._id}`}
                    className="text-sm px-4 py-2 border border-gray-600 text-gray-200 rounded-full hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition duration-300"
                  >
                    View Details
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 w-3 h-3 -rotate-45"
                    />
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
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-400 py-10">No projects found.</p>
        )}
      </div>
    </div>
  );
}

