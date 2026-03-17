import { motion } from "framer-motion";
import { ArrowRight, Download, Terminal, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/kalpesh-profile.jpg";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const terminalLines = [
  { prompt: "$ ", text: "whoami", delay: 0 },
  { prompt: "> ", text: "Kalpesh Odedara — Full-Stack & AI Developer", delay: 600, isOutput: true },
  { prompt: "$ ", text: "cat achievements.txt", delay: 1200 },
  { prompt: "> ", text: "🥈 Rank 2 | National Hackathon | 9.00 SGPA", delay: 1800, isOutput: true },
  { prompt: "$ ", text: "echo $STATUS", delay: 2600 },
  { prompt: "> ", text: "Open to Opportunities ✅", delay: 3200, isOutput: true },
];

const TerminalWidget = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="glass rounded-xl overflow-hidden border border-primary/20 shadow-xl max-w-full lg:max-w-md w-full"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-secondary/50">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <Terminal className="h-3.5 w-3.5 text-muted-foreground ml-2" />
        <span className="text-xs font-mono text-muted-foreground">kalpesh@portfolio:~</span>
      </div>
      {/* Terminal output */}
      <div className="p-4 font-mono text-xs space-y-1 min-h-[140px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={line.isOutput ? "text-accent pl-2" : "text-primary"}
          >
            {!line.isOutput && <span className="text-muted-foreground">{line.prompt}</span>}
            {line.text}
          </motion.div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
};

export const HeroSection = () => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Tech background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Profile + Terminal */}
          <motion.div variants={item} className="flex-shrink-0 flex flex-col items-center gap-6">
            {/* Profile */}
            <div className="relative group">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/30 glow transition-all group-hover:scale-105">
                <img src={profileImg} alt="Kalpesh Odedara" className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-success border-4 border-background"
              />
            </div>
            {/* Terminal Widget */}
            <TerminalWidget />
          </motion.div>

          {/* Right: Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Open to Opportunities
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
              Building the Future with{" "}
              <span className="gradient-text">Full-Stack Code</span>
              {" & "}
              <span className="gradient-text">AI Intelligence</span>
            </motion.h1>

            <motion.p variants={item} className="text-muted-foreground text-base md:text-lg mb-3 font-medium">
              BCA Student • University Topper • National Hackathon Rank #2
            </motion.p>

            <motion.p variants={item} className="text-muted-foreground/80 text-sm md:text-base mb-8 max-w-xl mx-auto lg:mx-0">
              I am Odedara Kalpesh, a highly motivated developer with a singular focus: crafting scalable web applications and integrating advanced machine learning &amp; AI solutions. With a perfect academic record and real-world project experience, I am ready to make an immediate impact.
            </motion.p>

            {/* Quick stats */}
            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              {[
                { label: "SGPA", value: "9.00" },
                { label: "Rank", value: "#2 National" },
                { label: "Projects", value: "7+" },
                { label: "Certs", value: "5+" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-bold gradient-text">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-mono">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group" onClick={() => scrollTo("#projects")}>
                See My Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollTo("#contact")} className="border-border hover:bg-secondary">
                Contact Me
              </Button>
            </motion.div>

            {/* Premium Highlighted Social Links */}
            <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start mt-10">
              <a 
                href="https://github.com/kalpesh-odedara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all shadow-glow-subtle hover:shadow-glow-primary"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <Github className="h-5 w-5 text-primary group-hover:scale-110 transition-transform relative z-10" />
                <span className="text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors relative z-10">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kalpesh-odedara-a056a6320?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all shadow-glow-subtle hover:shadow-glow-primary"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform relative z-10" />
                <span className="text-sm font-bold tracking-wide text-foreground group-hover:text-primary transition-colors relative z-10">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
