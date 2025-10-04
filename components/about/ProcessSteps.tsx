"use client";

import {
  faCode,
  faPencil,
  faRocket,
  faSearch,
  faStarOfLife,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShinyText from "../home/ShinyText";

const ProcessSteps = () => {
  const processes = [
    {
      id: "01",
      icon: faSearch,
      title: "Discover & Align",
      description:
        "Clarify goals, constraints, and success metrics. Map user journeys and edge cases to define a clear problem statement.",
    },
    {
      id: "02",
      icon: faPencil,
      title: "Design & Plan",
      description:
        "Sketch wireframes and plan architecture: data models, API contracts, and state strategy for scalable, maintainable code.",
    },
    {
      id: "03",
      icon: faCode,
      title: "Build & Test",
      description:
        "Implement modular features with TypeScript where possible, add accessibility, and cover with unit/integration tests.",
    },
    {
      id: "04",
      icon: faRocket,
      title: "Ship, Measure, Iterate",
      description:
        "Deploy via CI/CD, monitor performance and errors, gather feedback/analytics, then iterate to improve UX and reliability.",
    },
  ];

  return (
    <section id="myprocess" className="w-full mt-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg mb-2 shiny-sec text-[#7C3AED]">
          <FontAwesomeIcon icon={faStarOfLife} className="text-lg mr-2" />
          <ShinyText text="Steps I follow" disabled={false} speed={2.5} />
        </h2>
        <h3 className="text-4xl md:text-5xl font-medium mb-6">
          How I Build Software
        </h3>
        <p className="mb-4 text-lg max-sm:text-sm">
          A practical, impact-focused workflow—from problem discovery to
          measurable, iterative improvements.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 p-5 items-center justify-center">
        {processes.map((process) => (
          <div
            key={process.id}
            className="container border border-gray-400 w-72 h-64 rounded-2xl p-5 shadow-lg 
                              hover:shadow-xl transition ease-in-out duration-300
                              hover:border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
          >
            <FontAwesomeIcon
              icon={process.icon}
              className="bg-black text-white rounded-full p-3 
                              transition duration-300 hover:bg-white hover:text-[#7C3AED]"
            />
            <h1 className="font-medium text-xl max-md:text-lg mt-2">
              {process.id}. {process.title}
            </h1>
            <p className="mt-2">{process.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessSteps;
