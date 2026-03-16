import { motion } from "framer-motion";
import { Code2, Brain, Palette, Shield, Database, Server } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const categories = [
  {
    icon: Code2,
    title: "Frontend",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript ES6+", level: 88 },
      { name: "TypeScript", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "ASP.NET", level: 70 },
      { name: "REST APIs", level: 85 },
      { name: "Python (Flask)", level: 78 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    icon: Brain,
    title: "AI / ML",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "Python", level: 85 },
      { name: "Scikit-Learn", level: 72 },
      { name: "TensorFlow", level: 65 },
      { name: "Image Analytics", level: 70 },
      { name: "Voice APIs", level: 78 },
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    color: "text-red-400",
    bg: "bg-red-500/10",
    skills: [
      { name: "Ethical Hacking", level: 60 },
      { name: "Cyber Awareness", level: 80 },
      { name: "Network Security", level: 55 },
      { name: "OWASP Basics", level: 65 },
    ],
  },
  {
    icon: Database,
    title: "Databases",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "SQL", level: 75 },
      { name: "Firebase", level: 65 },
    ],
  },
  {
    icon: Palette,
    title: "Design & Tools",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    skills: [
      { name: "UI/UX (Figma)", level: 78 },
      { name: "Git / GitHub", level: 85 },
      { name: "Logo Design", level: 80 },
      { name: "Video Editing", level: 70 },
    ],
  },
];

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="font-mono text-foreground/80">{name}</span>
      <span className="text-primary font-semibold">{level}%</span>
    </div>
    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  </div>
);

export const SkillsSection = () => (
  <section id="skills" className="section-padding bg-secondary/30">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="font-mono text-primary text-sm mb-2">{"// skills"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">My Toolkit</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Technologies I use to build fast, scalable, and intelligent applications.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, ci) => (
          <ScrollReveal key={cat.title}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass rounded-2xl p-7 h-full card-hover"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center`}>
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                </div>
                <h3 className="text-lg font-bold">{cat.title}</h3>
              </div>
              <div>
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} level={s.level} />
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
