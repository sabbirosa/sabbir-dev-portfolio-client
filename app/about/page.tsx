import AboutIntro from "@/components/about/AboutIntro";
import EducationTimeline from "@/components/about/EducationTimeline";
import ExtracurricularSection from "@/components/about/ExtracurricularSection";
import MyThesis from "@/components/about/MyThesis";
import ProcessSteps from "@/components/about/ProcessSteps";
import Skills from "@/components/home/Skills";

// Static page with SSG
export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Skills />
      <ProcessSteps />
      <EducationTimeline />
      <MyThesis />
      <ExtracurricularSection />
    </>
  );
}
