import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, Linkedin } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const info = [
  { icon: Calendar, label: "DOB", value: "19 Nov 2005" },
  { icon: MapPin, label: "Location", value: "Gujarat, India" },
  { icon: Heart, label: "Hobbies", value: "Artwork, Designing, Teaching" },
];

export const AboutSection = () => (
  <section id="about" className="section-padding relative">
    <div className="absolute inset-0 mesh-gradient" />
    <div className="container mx-auto px-4 relative">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="font-mono text-primary text-sm mb-2">{"// about"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Kalpesh</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Currently pursuing my BCA (2023–2026), I have consistently secured the <span className="text-primary font-semibold">1st Rank</span> across my university with a perfect <span className="text-primary font-semibold">9.00 SGPA</span> in every semester. My passion lies at the intersection of powerful backend development (Node.js/ASP.NET) and cutting-edge Artificial Intelligence.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {info.map((item) => (
            <div key={item.label} className="glass rounded-xl p-6 text-center card-hover border border-primary/5 shadow-glow-subtle">
              <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-mono mb-1">{item.label}</p>
              <p className="text-base font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="text-center">
          <a href="https://linkedin.com/in/kalpesh-odedara" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-medium">
            <Linkedin className="h-4 w-4" /> linkedin.com/in/kalpesh-odedara
          </a>
        </div>
      </ScrollReveal>

      {/* Experience */}
      <ScrollReveal>
        <div className="max-w-2xl mx-auto mt-16 glass rounded-2xl p-8 card-hover">
          <p className="font-mono text-primary text-xs mb-3">{"// experience"}</p>
          <h3 className="text-xl font-bold mb-2">Full-Stack Developer Internship</h3>
          <p className="text-accent text-sm font-semibold mb-3">Code Alpha</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Developed and deployed multiple real-world web applications. Mastered the full software development lifecycle (SDLC), from initial architecture and front-end design to complex back-end integration and debugging.
          </p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
