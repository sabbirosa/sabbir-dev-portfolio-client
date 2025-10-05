"use client";

import ShinyText from "../home/ShinyText";

export default function AboutIntro() {
  return (
    <section className="py-10 flex flex-col justify-center items-center px-4 sm:px-16">
      <div className="relative flex flex-col lg:flex-row items-center justify-between w-full gap-8">
        {/* Text Section */}
        <div className="w-full space-y-4 text-left max-md:text-start">
          <h1 className="text-4xl text-balance sm:text-7xl font-semibold py-5">
            I&apos;m a software engineer passionate about creating{" "}
            <span className="text-[#7C3AED]">interactive, impactful</span>{" "}
            digital experiences
          </h1>
          <div className="text-right">
            <p className="text-balance sm:text-xl max-sm:text-start mb-10 max-md:ml-0 ml-40">
              I&apos;m{" "}
              <ShinyText
                text="Sabbir Bin Abdul Latif"
                disabled={false}
                speed={3}
                className="text-[#7C3AED]"
              />
              , a creative problem-solver dedicated to building scalable,
              user-friendly, and visually engaging applications. I strive to
              blend thoughtful design with robust functionality, ensuring
              seamless experiences across web platforms.
            </p>

            <a
              href="/Documents/Resume_Sabbir Bin Abdul Latif.pdf"
              download={"Sabbir Bin Abdul Latif's Resume"}
            >
              <button className="resume-btn border p-3 w-36 border-black rounded-full cursor-pointer hover:bg-black hover:text-white transition delay-150 duration-300 ease-in-out">
                My Resume
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
