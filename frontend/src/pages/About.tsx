import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Users, Zap, CheckCircle } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import universityBuilding from "@/assets/university-building.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import digitalLearning from "@/assets/digital-learning.jpg";

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "Every feature is built with enterprise-grade security as the foundation.",
  },
  {
    icon: Target,
    title: "Developer Focus",
    description: "APIs and SDKs designed by developers, for developers.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built for teams of all sizes with seamless collaboration features.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-50ms response times with global edge deployment.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", description: "Started with a vision to simplify access control" },
  { year: "2021", title: "First 1K Users", description: "Reached our first milestone of 1,000 active users" },
  { year: "2022", title: "Series A", description: "Raised $10M to expand our platform capabilities" },
  { year: "2023", title: "Enterprise Launch", description: "Launched enterprise tier with SSO and audit logs" },
  { year: "2024", title: "10K+ Users", description: "Serving over 10,000 organizations worldwide" },
];

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Parallax */}
        <section ref={containerRef} className="relative py-32 overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <img 
              src={universityBuilding} 
              alt="University building" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </motion.div>
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              style={{ opacity }}
              className="max-w-3xl mx-auto text-center text-primary-foreground"
            >
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/20 text-accent border border-accent/30 mb-6">
                  Our Story
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Building the Future of{" "}
                  <span className="bg-gradient-to-r from-accent via-success to-accent bg-clip-text text-transparent">
                    Access Control
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg md:text-xl text-primary-foreground/70">
                  We're on a mission to make role-based access control simple, secure, and scalable for every organization.
                </p>
              </ScrollReveal>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                    Our Mission
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Empowering teams with secure access management
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg">
                    We believe that security shouldn't be complicated. RoleGuard provides intuitive tools that let you focus on building great products while we handle the complexity of access control.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Enterprise-grade security by default",
                      "Intuitive developer experience",
                      "Scalable from startup to enterprise",
                      "Comprehensive audit and compliance tools",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-success shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={teamCollaboration} 
                      alt="Team collaboration" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  What drives us forward
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <StaggerItem key={value.title}>
                    <div className="bg-card rounded-2xl border border-border p-6 card-hover h-full">
                      <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                  Our Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Milestones along the way
                </h2>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto">
              {milestones.map((milestone, i) => (
                <ScrollReveal
                  key={milestone.year}
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                >
                  <div className="flex gap-6 mb-8">
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full bg-accent/10 text-accent font-bold flex items-center justify-center">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-lg font-semibold mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </PageTransition>
  );
};

export default About;
