"use client";

interface Extracurricular {
  role: string;
  organization: string;
  year: string;
}

interface ExtracurricularSectionProps {
  extracurricular: Extracurricular[];
}

export default function ExtracurricularSection({
  extracurricular,
}: ExtracurricularSectionProps) {
  return (
    <section className="w-full my-16 px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Left Section (Heading) */}
        <div className="md:w-1/2 pb-5">
          <h2 className="text-lg mb-2 text-[#7C3AED]">
            ★ Leadership & Activities
          </h2>
          <h3 className="text-4xl md:text-5xl mb-4 font-medium text-white">
            Extracurricular & <br /> Leadership
          </h3>
          <p className="text-sm font-medium text-gray-400 pr-28 max-sm:pr-5">
            Roles and contributions that reflect my leadership, teamwork, and
            initiative within university and community activities.
          </p>
        </div>

        {/* Right Section (Details) */}
        <div className="md:w-1/2 max-sm:text-sm">
          {extracurricular.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start border-b border-gray-600 py-4"
            >
              <div className="text-lg font-medium flex-1">
                <div className="text-white">{item.role}</div>
                <span className="text-gray-400 text-sm block">
                  {item.organization}
                </span>
              </div>
              <div className="text-gray-400 text-right text-sm ml-4 whitespace-nowrap">
                {item.year}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
