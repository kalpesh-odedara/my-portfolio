import { motion } from "framer-motion";
import { Award, ExternalLink, Trophy, BookOpen, GraduationCap, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const certificates = [
  {
    id: 1,
    type: "achievement",
    badge: "🥈 Rank 2",
    title: "Code Carnival Season 2",
    subtitle: "National Level — 36 Hours Hackathon",
    issuer: "Atmiya University, Rajkot",
    date: "October 10–11, 2025",
    description:
      "Secured Rank 2 in a National Level Hackathon organized by Atmiya University Developer Student Club (ADSC) in collaboration with SSIP. Competed against teams from across India in a gruelling 36-hour coding sprint.",
    tags: ["Hackathon", "National Level", "Rank 2"],
    icon: Trophy,
    color: "from-yellow-500/20 to-amber-500/10",
    border: "border-yellow-500/30",
    badgeClass: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    iconClass: "text-yellow-400",
    bgIcon: "bg-yellow-500/10",
  },
  {
    id: 2,
    type: "academic",
    badge: "🏆 1st Rank",
    title: "Academic Excellence Award",
    subtitle: "University Ranker of 2024 — Noble University",
    issuer: "Noble University, Junagadh",
    date: "Academic Year 2023–24",
    description:
      "Awarded to Odedara Kalpesh Balubhai for securing 1st Rank in Semester-2 of B.C.A., Faculty of Computer Application. Recognized for extraordinary academic performance with 9.00 SGPA.",
    tags: ["Academic", "1st Rank", "BCA", "9.00 SGPA"],
    icon: GraduationCap,
    color: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/30",
    badgeClass: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    iconClass: "text-purple-400",
    bgIcon: "bg-purple-500/10",
  },
  {
    id: 3,
    type: "participation",
    badge: "🎖️ Participation",
    title: "YuthTech-25 Hackathon",
    subtitle: "Smart India Hackathon 2025 — Noble University",
    issuer: "Faculty of Engineering & Technology, Noble University",
    date: "September 15, 2025",
    description:
      "Certificate of Participation for successfully participating in YuthTech-25 Hackathon organized by the Faculty of Engineering & Technology at Noble University under the Smart India Hackathon 2025 initiative.",
    tags: ["SIH 2025", "SSIP", "Hackathon", "Noble University"],
    icon: Award,
    color: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/30",
    badgeClass: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    iconClass: "text-blue-400",
    bgIcon: "bg-blue-500/10",
  },
  {
    id: 4,
    type: "course",
    badge: "✅ Completed",
    title: "Introduction to Cybersecurity Awareness",
    subtitle: "HP LIFE Online Course",
    issuer: "HP Foundation (Stephanie Bormann, Deputy Director)",
    date: "June 11, 2025",
    description:
      "Successfully completed the HP LIFE online course on Introduction to Cybersecurity Awareness. Learned about common cybersecurity threats and basic ways to keep online data and information more secure.",
    tags: ["Cybersecurity", "HP LIFE", "Online Course"],
    icon: Shield,
    color: "from-cyan-500/20 to-sky-500/10",
    border: "border-cyan-500/30",
    badgeClass: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
    iconClass: "text-cyan-400",
    bgIcon: "bg-cyan-500/10",
  },
  {
    id: 5,
    type: "internship",
    badge: "📜 Attendance",
    title: "Cyber Security & Ethical Hacking",
    subtitle: "Internship Program Demo Session",
    issuer: "Edureka (a Veranda Enterprise)",
    date: "October 10, 2023",
    description:
      "Certificate of Attendance for participating in the Cyber Security and Ethical Hacking Internship Program Demo Session organized by Edureka. Demonstrated keen interest in security and ethical hacking practices.",
    tags: ["Cyber Security", "Ethical Hacking", "Internship", "Edureka"],
    icon: BookOpen,
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/30",
    badgeClass: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    iconClass: "text-emerald-400",
    bgIcon: "bg-emerald-500/10",
  },
];

const stats = [
  { label: "Certificates", value: "5+" },
  { label: "Hackathons", value: "4+" },
  { label: "National Rank", value: "#2" },
  { label: "SGPA", value: "9.00" },
];

export const CertificatesSection = () => (
  <section id="certificates" className="section-padding">
    <div className="container mx-auto px-4">
      <ScrollReveal>
        <div className="text-center mb-14">
          <p className="font-mono text-primary text-sm mb-2">{"// certificates"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Awards & Certificates</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm md:text-base">
            A collection of achievements earned through dedication, competitive hackathons, and continuous learning.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats Row */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-5 text-center card-hover"
            >
              <p className="text-2xl md:text-3xl font-bold gradient-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {certificates.map((cert, i) => (
          <ScrollReveal key={cert.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`glass rounded-2xl overflow-hidden card-hover border ${cert.border} h-full flex flex-col`}
            >
              {/* Top accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cert.color}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${cert.bgIcon} flex items-center justify-center flex-shrink-0`}>
                    <cert.icon className={`h-6 w-6 ${cert.iconClass}`} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cert.badgeClass}`}>
                    {cert.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold mb-1 leading-tight">{cert.title}</h3>
                <p className={`text-xs font-semibold mb-3 ${cert.iconClass}`}>{cert.subtitle}</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed flex-1">
                  {cert.description}
                </p>

                {/* Issuer & Date */}
                <div className="border-t border-border/50 pt-4 mb-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/70">Issued by:</span> {cert.issuer}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="font-semibold text-foreground/70">Date:</span> {cert.date}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);
