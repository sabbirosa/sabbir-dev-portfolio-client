import { extracurricular } from "@/data/extracurricular";

export default function ExtracurricularSection() {
  return (
    <section className="py-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-semibold mb-10">
          Extracurricular & Leadership
        </h2>
        <div className="space-y-8">
          {extracurricular.map((activity, index) => (
            <div key={index} className="border-l-4 border-[#7C3AED] pl-6">
              <h3 className="text-2xl font-medium mb-2">{activity.role}</h3>
              <p className="text-gray-400 mb-1">{activity.organization}</p>
              <p className="text-gray-500 text-sm mb-3">{activity.period}</p>
              <p className="text-gray-300">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
