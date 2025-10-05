import AboutIntro from "@/components/about/AboutIntro";
import EducationTimeline from "@/components/about/EducationTimeline";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";
import ExtracurricularSection from "@/components/about/ExtracurricularSection";
import MyThesis from "@/components/about/MyThesis";
import ProcessSteps from "@/components/about/ProcessSteps";
import Skills from "@/components/home/Skills";
import { educationAPI, experienceAPI, extracurricularAPI } from "@/lib/api";

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function AboutPage() {
  let education: Record<string, unknown>[] = [];
  let experience: Record<string, unknown>[] = [];
  let extracurricular: Record<string, unknown>[] = [];

  try {
    const [educationRes, experienceRes, extracurricularRes] = await Promise.all(
      [
        educationAPI.getAll(),
        experienceAPI.getAll(),
        extracurricularAPI.getAll(),
      ]
    );

    education = educationRes.data as Record<string, unknown>[];
    experience = experienceRes.data as Record<string, unknown>[];
    extracurricular = extracurricularRes.data as Record<string, unknown>[];
  } catch (error) {
    console.error("Error fetching about data:", error);
  }

  return (
    <>
      <AboutIntro />
      <Skills />
      <ProcessSteps />
      <ExperienceTimeline
        experience={
          experience as unknown as Parameters<
            typeof ExperienceTimeline
          >[0]["experience"]
        }
      />
      <EducationTimeline
        education={
          education as unknown as Parameters<
            typeof EducationTimeline
          >[0]["education"]
        }
      />
      <MyThesis />
      <ExtracurricularSection
        extracurricular={
          extracurricular as unknown as Parameters<
            typeof ExtracurricularSection
          >[0]["extracurricular"]
        }
      />
    </>
  );
}
