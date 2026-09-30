import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsConstellation from "@/components/skills/SkillsConstellation";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import CertificationsSection from "@/components/certifications/CertificationsSection";
import ContactSection from "@/components/contact/ContactSection";
import CinematicIntro from "@/components/cinematic/CinematicIntro";
import CinematicOutro from "@/components/cinematic/CinematicOutro";
import SceneDivider from "@/components/cinematic/SceneDivider";

export default function HomePage() {
  return (
    <>
      <CinematicIntro />
      <HeroSection />
      <SceneDivider label="SCENE 01 // 02" />
      <AboutSection />
      <SceneDivider label="SCENE 02 // 03" />
      <SkillsConstellation />
      <SceneDivider label="SCENE 03 // 04" />
      <ProjectsSection />
      <SceneDivider label="SCENE 04 // 05" />
      <ExperienceTimeline />
      <SceneDivider label="SCENE 05 // 06" />
      <CertificationsSection />
      <SceneDivider label="SCENE 06 // 07" />
      <ContactSection />
      <SceneDivider label="FINALE" />
      <CinematicOutro />
    </>
  );
}
