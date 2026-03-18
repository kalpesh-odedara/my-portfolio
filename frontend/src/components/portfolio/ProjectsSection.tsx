import { motion } from "framer-motion";
import {
  Camera, Mic, MessageSquare, CalendarCheck, Trophy, Lock, Activity,
  BarChart2, Shield, Users, Zap, ExternalLink, Github, Brain,
  ShoppingBag, BookOpen, GraduationCap, Star
} from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import dermaCareImg from "@/assets/derma-care-project.jpg";

const dermaCareFeatures = [
  { icon: Camera, title: "Skin Problem Detector", desc: "AI-driven photo analysis detects skin conditions and provides personalized skin care planning." },
  { icon: MessageSquare, title: "Personal Chatbot", desc: "Personal AI chatbot for health assistant and hospital service automation." },
  { icon: Mic, title: "Voice Assistant", desc: "Navigate pages and interact with models using natural voice commands." },
  { icon: Brain, title: "Mood Detector", desc: "Detects mood, skin type, and recommends skincare plans and wellness steps." },
  { icon: CalendarCheck, title: "Appointment Booking", desc: "Dynamic appointment and hospital service management with real-time patient workflow." },
  { icon: Lock, title: "Secure Data Handling", desc: "Protected handling of sensitive health records with hospital-grade privacy safeguards." },
];

const dermaCareObjectives = [
  { icon: BarChart2, text: "AI-driven image recognition & visual asset tracking for dermatologists to make data-backed clinical decisions." },
  { icon: Shield, text: "Protected and streamlined data handling for sensitive medical records, ensuring privacy and healthcare standards compliance." },
  { icon: Activity, text: "Treatment visibility and progress oversight, ensuring patients follow recovery protocols with elevated clinical contentment." },
  { icon: Zap, text: "Accelerated operational efficiency, dynamic patient inflow management, and a high-standard digital healthcare presence." },
  { icon: Users, text: "Bolstered patient engagement via automated reminders, treatment milestone tracking, and personalized skincare recommendations." },
];

const otherProjects = [
  {
    emoji: "🎓",
    title: "Role Assign System",
    subtitle: "University Role Management Platform",
    description:
      "An intelligent role management system for universities that assigns and manages roles for students, faculty, principals, HODs, trustees, and more — powered by a personal AI chatbot.",
    tech: ["React", "Node.js", "Python", "MongoDB", "AI Chatbot", "Express.js"],
    github: "https://github.com/kalpesh-odedara/Role_Assign_System.git",
    color: "from-blue-500/20 to-indigo-500/10",
    badge: "University Tool",
  },
  {
    emoji: "📝",
    title: "Feedback System",
    subtitle: "Subject-Wise Faculty Feedback",
    description:
      "A comprehensive feedback platform for universities that allows students to submit subject-wise evaluations for faculty members with intuitive reporting dashboards.",
    tech: ["React", "Node.js", "Express.js", "REST API"],
    github: "https://github.com/kalpesh-odedara/Feedback_System.git",
    color: "from-green-500/20 to-teal-500/10",
    badge: "University Tool",
  },
  {
    emoji: "🛋️",
    title: "Furniture Shop",
    subtitle: "Furniture E-Commerce Website",
    description:
      "A full-featured furniture e-commerce website with product catalogue, category browsing, shopping cart, and order management built on the ASP.NET platform.",
    tech: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/kalpesh-odedara/Furniture-Shop.git",
    color: "from-orange-500/20 to-amber-500/10",
    badge: "E-Commerce",
  },
  {
    emoji: "💍",
    title: "Jewelry Shop",
    subtitle: "Category-Wise Jewelry E-Commerce",
    description:
      "An elegant online jewelry store with category-wise browsing — gold, silver, diamond, and more — complete with product listings, filtering, and a seamless checkout flow.",
    tech: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/kalpesh-odedara/Jewelry_Shop.git",
    color: "from-yellow-500/20 to-pink-500/10",
    badge: "E-Commerce",
  },
  {
    emoji: "📚",
    title: "Online Learning Platform",
    subtitle: "Learn & Teach Online",
    description:
      "A dual-purpose online learning platform where learners can enroll in courses and educators can sell their teaching skills — fostering a complete knowledge-exchange ecosystem.",
    tech: ["ASP.NET", "C#", "SQL Server", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/kalpesh-odedara/Online_Learning_Platform.git",
    color: "from-purple-500/20 to-violet-500/10",
    badge: "EdTech",
  },
  {
    emoji: "👕",
    title: "Alpha Wear",
    subtitle: "Fashion E-Commerce — Alpha Internship",
    description:
      "A complete fashion e-commerce website designed and developed during the Alpha internship program — featuring product catalogues, cart management, and a polished storefront.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "https://github.com/kalpesh-odedara/Alpha_Wear.git",
    color: "from-red-500/20 to-rose-500/10",
    badge: "Internship Project",
  },
];

const hackathons = [
  {
    badge: "🥈 Rank 2 — National",
    title: "Code Carnival Season 2",
    event: "36-Hour Hackathon @ Atmiya University",
    year: "2025",
  },
  {
    badge: "🏆 3× Winner",
    title: "University-Level Internal Hackathons",
    event: "Noble University Internal Tech Events",
    year: "2023–25",
  },
  {
    badge: "🎖️ Finalist",
    title: "YuthTech-25 Hackathon",
    event: "Smart India Hackathon 2025 @ Noble University",
    year: "2025",
  },
  {
    badge: "🥇 Winner",
    title: "Technoble Event",
    event: "National Level Technical Competition",
    year: "2024",
  },
];

export const ProjectsSection = () => (
  <section id="projects" className="section-padding">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="font-mono text-primary text-sm mb-2">{"// projects"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">The Showcase</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Building real-world solutions at the intersection of healthcare, AI, e-commerce, and modern web technology.
          </p>
        </div>
      </ScrollReveal>

      {/* DermAI — Featured */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto glass rounded-2xl overflow-hidden mb-10 card-hover border border-accent/20">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-2 relative h-64 sm:h-80 lg:h-auto min-h-[300px]">
              <img src={dermaCareImg} alt="DermAI" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent lg:hidden" />
            </div>
            <div className="lg:col-span-3 p-6 sm:p-10 lg:p-12 relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/10 text-accent border border-accent/20">
                  🚀 Featured Project
                </span>
                <a
                  href="https://github.com/kalpesh-odedara/dermai.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary text-muted-foreground hover:text-foreground border border-border/50 transition-colors"
                >
                  <Github className="h-3 w-3" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <h3 className="text-2xl font-bold mb-1">DermAI</h3>
              <p className="text-accent text-sm font-semibold mb-1">AI-Powered Smart Hospital Management System</p>
              <p className="text-muted-foreground text-xs mb-4 font-mono">React · Node.js · Python · MongoDB · Personal AI Chatbot</p>
              <p className="text-muted-foreground text-sm mb-6">
                A smart hospital management system with 4 AI models: skin condition detection via image analysis, personal AI chatbot, voice assistant navigation, and mood/skin type-based skincare planning.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {dermaCareFeatures.map((f) => (
                  <div key={f.title} className="flex gap-3 items-start bg-secondary/40 rounded-lg p-3">
                    <f.icon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{f.title}</p>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "Python", "MongoDB", "TensorFlow", "Voice API", "Express.js", "REST API"].map((t) => (
                  <span key={t} className="px-2 py-1 rounded text-[10px] font-mono bg-secondary text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* DermAI Objectives */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto mb-14">
          <h3 className="text-xl font-bold mb-6 text-center">
            <span className="gradient-text">DermAI — Project Objectives</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dermaCareObjectives.map((obj, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass rounded-xl p-5 flex gap-4 items-start card-hover border border-border/50"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <obj.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{obj.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Other Projects Grid */}
      <ScrollReveal>
        <div className="max-w-6xl mx-auto mb-14">
          <h3 className="text-xl font-bold mb-2 text-center">
            <span className="gradient-text">More Projects</span>
          </h3>
          <p className="text-muted-foreground text-sm text-center mb-8">
            A diverse range of full-stack, e-commerce, and university management systems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((p, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className={`glass rounded-2xl p-6 flex flex-col gap-4 card-hover border border-border/50 bg-gradient-to-br ${p.color}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{p.emoji}</span>
                    <div>
                      <p className="font-bold text-sm text-foreground leading-tight">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.subtitle}</p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-secondary/80 text-muted-foreground border border-border/40">
                    {p.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{p.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary/80 text-muted-foreground border border-border/30">
                      {t}
                    </span>
                  ))}
                </div>

                {/* GitHub Link */}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent transition-colors mt-auto"
                >
                  <Github className="h-3.5 w-3.5" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Hackathon Wins */}
      <ScrollReveal>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 text-center">
            <Trophy className="inline h-5 w-5 text-warning mr-2" />
            Hackathon Victories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hackathons.map((h, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                className="glass rounded-xl p-5 flex items-start gap-4 card-hover border border-warning/10"
              >
                <div className="w-11 h-11 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-warning font-semibold">{h.badge}</span>
                  <p className="font-semibold text-sm mt-0.5">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.event}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">{h.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
