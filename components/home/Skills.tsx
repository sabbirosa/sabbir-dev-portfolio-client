import { skills } from "@/data/skills";
import Image from "next/image";

export default function Skills() {
  return (
    <>
      <hr className="border-[#E2E8F0] w-full" />
      <div className="overflow-hidden w-full">
        <div className="whitespace-nowrap py-10" id="scrolling-container">
          <div className="flex" id="text-container">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="skills flex items-center gap-2 px-6 py-2 mx-3 shadow-sm bg-white rounded-full"
              >
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={20}
                  height={20}
                />
                <span className="text-sm">{skill.name}</span>
              </div>
            ))}
            {/* Duplicate for seamless infinite effect */}
            {skills.map((skill, index) => (
              <div
                key={`dup-${index}`}
                className="skills flex items-center gap-2 px-6 py-2 mx-3 bg-white rounded-full shadow-sm"
              >
                <Image
                  src={skill.image}
                  alt={skill.name}
                  width={20}
                  height={20}
                />
                <span className="text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

