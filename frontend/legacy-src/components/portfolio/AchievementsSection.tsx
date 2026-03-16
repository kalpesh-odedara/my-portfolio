import { Award, GraduationCap, Medal, BookOpen, Globe, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { motion } from "framer-motion";

const achievements = [
  {
    icon: Medal,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    text: "🥇 1st Rank in Gujarat / 2nd Rank in India — National Level Web Development Quiz",
  },
  {
    icon: GraduationCap,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    text: "🎓 Academic Excellence Award — Noble University University Ranker 2024 (B.C.A., 9.00 SGPA, Semester 2)",
  },
  {
    icon: Award,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    text: "🏆 Winner of Tech Noble Technical Events — National Level Competition",
  },
  {
    icon: BookOpen,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    text: "🖥️ HP LIFE — Introduction to Cybersecurity Awareness (Completed, June 2025)",
  },
  {
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    text: "⚡ Edureka — Cyber Security & Ethical Hacking Internship Attendance (October 2023)",
  },
  {
    icon: Globe,
    color: "text-accent",
    bg: "bg-accent/10",
    text: "🌐 CCC (Course on Computer Concepts) — Government of India Certification",
  },
  {
    icon: Medal,
    color: "text-warning",
    bg: "bg-warning/10",
    text: "🥈 Rank 2 — Code Carnival Season 2, National Level 36-Hour Hackathon @ Atmiya University (Oct 2025)",
  },
  {
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    text: "🚀 YuthTech-25 Hackathon Participant — Smart India Hackathon 2025, Noble University (Sep 2025)",
  },
];

export const AchievementsSection = () => (
  <section id="achievements" className="section-padding bg-secondary/30">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="font-mono text-primary text-sm mb-2">{"// achievements"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Awards & Recognition</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Excellence recognized at national, university, and industry levels.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-3">
        {achievements.map((a, i) => (
          <ScrollReveal key={i}>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-start gap-4 glass rounded-xl p-5 card-hover"
            >
              <div className={`w-10 h-10 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                <a.icon className={`h-5 w-5 ${a.color}`} />
              </div>
              <p className="text-sm font-medium text-foreground pt-1.5">{a.text}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
