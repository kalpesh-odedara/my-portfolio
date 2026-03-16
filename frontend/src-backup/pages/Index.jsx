import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CertificatesSection } from "@/components/portfolio/CertificatesSection";
import { AchievementsSection } from "@/components/portfolio/AchievementsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { PortfolioFooter } from "@/components/portfolio/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <AchievementsSection />
      <ContactSection />
    </main>
    <PortfolioFooter />
    <ChatBot />
  </>
);

export default Index;
