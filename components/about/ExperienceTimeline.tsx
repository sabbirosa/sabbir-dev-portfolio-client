"use client";

interface Experience {
  position: string;
  company: string;
  year: string;
  description?: string;
}

interface ExperienceTimelineProps {
  experience: Experience[];
}

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  return (
    <section className="w-full my-16 px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Left Section (Heading) */}
        <div className="md:w-1/2">
          <h2 className="text-lg mb-2 text-[#7C3AED]">★ Experience</h2>
          <h3 className="text-4xl md:text-5xl mb-4 font-medium text-white">
            My Experience
          </h3>
          <p className="text-sm font-medium text-gray-400 pr-28 max-sm:pr-5 mb-4">
            Professional journey building innovative solutions and contributing
            to impactful projects in the software industry.
          </p>
        </div>

        {/* Right Section (Experience Details) */}
        <div className="md:w-1/2 max-sm:text-sm">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="flex justify-between items-start border-b border-gray-600 py-4"
            >
              <div className="text-lg font-medium flex-1">
                <div className="text-white">{exp.position}</div>
                <span className="text-gray-400 text-sm block">
                  {exp.company}
                </span>
                {exp.description && (
                  <p className="text-gray-500 text-sm mt-2">
                    {exp.description}
                  </p>
                )}
              </div>
              <div className="text-gray-400 text-right text-sm ml-4 whitespace-nowrap">
                {exp.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
