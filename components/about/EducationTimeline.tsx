import { education } from "@/data/education";

export default function EducationTimeline() {
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold mb-10">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="border-l-4 border-[#7C3AED] pl-6">
              <h3 className="text-2xl font-medium mb-2">{edu.degree}</h3>
              <p className="text-gray-400 mb-1">{edu.institution}</p>
              <p className="text-gray-500 text-sm">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
