import { projectAPI } from "@/lib/api";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // ISR revalidation

export async function generateStaticParams() {
  try {
    const response = await projectAPI.getAll();
    return response.data.map((project: Record<string, unknown>) => ({
      id: project._id as string,
    }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let project: Record<string, unknown> | null = null;

  try {
    const response = await projectAPI.getById(params.id);
    project = response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  if (!project) {
    return (
      <div className="py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-[#7C3AED] hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-[#7C3AED] hover:underline mb-4 inline-block"
          >
            ← Back to Projects
          </Link>
          <h1 className="text-5xl font-bold mb-4">{String(project.title)}</h1>
          <p className="text-xl text-gray-400">{String(project.description)}</p>
        </div>

        {/* Project Image */}
        <div className="mb-8">
          <Image
            src={String(project.image)}
            alt={String(project.title)}
            width={1200}
            height={600}
            className="w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <a
            href={String(project.liveLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#7C3AED] text-[#7C3AED] rounded-full hover:bg-[#7C3AED] hover:text-white transition duration-300"
          >
            Live Project
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 w-4 h-4 -rotate-45"
            />
          </a>
          {Boolean(project.codeLink) && (
            <a
              href={String(project.codeLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-400 text-gray-300 rounded-full hover:border-[#7C3AED] hover:text-white hover:bg-[#7C3AED] transition duration-300"
            >
              Source Code
              <FontAwesomeIcon icon={faGithub} className="ml-2 w-4 h-4" />
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(project.techStack) && project.techStack.map((tech: unknown, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#7C3AED]/20 text-[#7C3AED] rounded-full"
              >
                {String(tech)}
              </span>
            ))}
          </div>
        </div>

        {/* Challenges */}
        {Array.isArray(project.challenges) && project.challenges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.challenges.map((challenge: unknown, index: number) => (
                <li key={index}>{String(challenge)}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {Array.isArray(project.improvements) && project.improvements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Future Improvements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.improvements.map(
                (improvement: unknown, index: number) => (
                  <li key={index}>{String(improvement)}</li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Year */}
        <div className="text-gray-500 text-sm">
          <p>Year: {String(project.year)}</p>
        </div>
      </div>
    </div>
  );
}

