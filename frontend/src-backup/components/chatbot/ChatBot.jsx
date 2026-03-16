import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// ─── PORTFOLIO DATASET ────────────────────────────────────────────────────────

const PORTFOLIO_DATA = {
  owner: {
    name: "Odedara Kalpesh Balubhai",
    shortName: "Kalpesh Odedara",
    title: "Full-Stack & AI Developer",
    education: "BCA (Bachelor of Computer Applications) — Noble University, Junagadh",
    cgpa: "9.00 SGPA (1st Rank, Semester 2)",
    location: "Gujarat, India",
    github: "https://github.com/kalpesh-odedara",
    email: "Available via the contact form on this portfolio",
    about:
      "I am Odedara Kalpesh — a Full-Stack & AI Developer pursuing BCA at Noble University. I specialize in building intelligent, production-grade web applications that span healthcare AI, university automation, and e-commerce. I secured Rank 2 at a National Level Hackathon and consistently top my university academically.",
  },

  skills: {
    frontend: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Python", "ASP.NET", "C#", "REST API"],
    database: ["MongoDB", "SQL Server", "MySQL"],
    ai_ml: ["TensorFlow", "Keras", "OpenCV", "NLP", "Voice API", "AI Chatbot Development"],
    tools: ["Git", "GitHub", "Vite", "VS Code", "Postman"],
  },

  projects: [
    {
      name: "DermAI",
      type: "Featured — AI Healthcare",
      tech: "React · Node.js · Python · MongoDB · TensorFlow · Voice API",
      github: "https://github.com/kalpesh-odedara/DermAi.git",
      description:
        "A smart hospital management system powered by 4 AI models: skin condition detection via image analysis, a personal AI chatbot, voice assistant navigation, and mood/skin-type-based skincare planning.",
      features: [
        "Skin Problem Detector — AI photo analysis for skin conditions",
        "Personal AI Chatbot — health assistant & hospital automation",
        "Voice Assistant — navigate pages with natural voice commands",
        "Mood Detector — detects mood and recommends skincare plans",
        "Appointment Booking — dynamic patient workflow management",
        "Secure Data Handling — hospital-grade privacy safeguards",
      ],
      objectives: [
        "AI-driven image recognition for dermatologists",
        "Protected handling of sensitive medical records",
        "Treatment visibility and progress oversight",
        "Accelerated operational efficiency",
        "Bolstered patient engagement via automated reminders",
      ],
    },
    {
      name: "Role Assign System",
      type: "University Tool",
      tech: "React · Node.js · Python · MongoDB · AI Chatbot · Express.js",
      github: "https://github.com/kalpesh-odedara/Role_Assign_System.git",
      description:
        "An intelligent role management system for universities that assigns and manages roles for students, faculty, principals, HODs, trustees, and more — powered by a personal AI chatbot.",
    },
    {
      name: "Feedback System",
      type: "University Tool",
      tech: "React · Node.js · Express.js · REST API",
      github: "https://github.com/kalpesh-odedara/Feedback_System.git",
      description:
        "A comprehensive feedback platform for universities allowing students to submit subject-wise evaluations for faculty members with intuitive reporting dashboards.",
    },
    {
      name: "Furniture Shop",
      type: "E-Commerce",
      tech: "ASP.NET · C# · SQL Server · HTML · CSS · Bootstrap",
      github: "https://github.com/kalpesh-odedara/Furniture_Shop.git",
      description:
        "A full-featured furniture e-commerce website with product catalogue, category browsing, shopping cart, and order management.",
    },
    {
      name: "Jewelry Shop",
      type: "E-Commerce",
      tech: "ASP.NET · C# · SQL Server · HTML · CSS · Bootstrap",
      github: "https://github.com/kalpesh-odedara/Jewelry_Shop.git",
      description:
        "An elegant online jewelry store with category-wise browsing — gold, silver, diamond — complete with filtering and a seamless checkout flow.",
    },
    {
      name: "Online Learning Platform",
      type: "EdTech",
      tech: "ASP.NET · C# · SQL Server · HTML · CSS · Bootstrap",
      github: "https://github.com/kalpesh-odedara/Online_Learning_Platform.git",
      description:
        "A dual-purpose online learning platform where learners enroll in courses and educators sell their teaching skills — fostering a complete knowledge-exchange ecosystem.",
    },
    {
      name: "Alpha Wear",
      type: "Internship Project — E-Commerce",
      tech: "HTML · CSS · JavaScript · Bootstrap",
      github: "https://github.com/kalpesh-odedara/Alpha_Wear.git",
      description:
        "A complete fashion e-commerce website designed and developed during the Alpha internship — featuring product catalogues, cart management, and a polished storefront.",
    },
  ],

  hackathons: [
    {
      rank: "🥈 Rank 2 — National",
      name: "Code Carnival Season 2",
      event: "36-Hour Hackathon @ Atmiya University",
      year: "2025",
      detail:
        "Secured Rank 2 in a National Level Hackathon organized by Atmiya University Developer Student Club (ADSC) in collaboration with SSIP. Competed against teams from across India in a gruelling 36-hour coding sprint.",
    },
    {
      rank: "🏆 3× Winner",
      name: "University-Level Internal Hackathons",
      event: "Noble University Internal Tech Events",
      year: "2023–25",
      detail: "Won 3 consecutive university-level internal hackathons at Noble University across 2023, 2024, and 2025.",
    },
    {
      rank: "🎖️ Finalist",
      name: "YuthTech-25 Hackathon",
      event: "Smart India Hackathon 2025 @ Noble University",
      year: "2025",
      detail:
        "Selected as finalist in YuthTech-25 Hackathon, the Noble University leg of Smart India Hackathon 2025.",
    },
    {
      rank: "🥇 Winner",
      name: "Technoble Event",
      event: "National Level Technical Competition",
      year: "2024",
      detail: "Won the Technoble Event, a national level technical competition showcasing innovation and coding skills.",
    },
  ],

  certificates: [
    {
      title: "Code Carnival Season 2 — Rank 2",
      issuer: "Atmiya University (ADSC + SSIP)",
      date: "October 10–11, 2025",
      type: "Hackathon Achievement",
    },
    {
      title: "Academic Excellence Award — 1st Rank",
      issuer: "Noble University, Junagadh",
      date: "Academic Year 2023–24",
      type: "Academic",
      detail: "9.00 SGPA in Semester 2 of BCA",
    },
    {
      title: "YuthTech-25 Hackathon — Participation",
      issuer: "Faculty of Engineering & Technology, Noble University",
      date: "September 15, 2025",
      type: "Hackathon",
    },
    {
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP Foundation (HP LIFE)",
      date: "June 11, 2025",
      type: "Online Course",
    },
    {
      title: "Cyber Security & Ethical Hacking",
      issuer: "Edureka (a Veranda Enterprise)",
      date: "October 10, 2023",
      type: "Internship Demo Session",
    },
  ],
};

// ─── RESPONSE ENGINE ──────────────────────────────────────────────────────────

const getResponse = (input: string): string => {
  const msg = input.toLowerCase().trim();

  // ── Greetings
  if (
    /^(hi+|hello+|hey+|howdy|greetings|good morning|good evening|good afternoon|hola|heyy+|hihi)/.test(msg) ||
    msg === "hi" || msg === "hello" || msg === "hey" || msg === "hii" || msg === "hiii" ||
    msg === "hy" || msg === "hye" || msg === "helo" || msg === "heloo" || msg === "hellow"
  ) {
    return "Hey there! 👋 I'm Kalpesh's AI Portfolio Assistant.\n\nAsk me anything about his projects, skills, hackathons, certificates, or how to get in touch!";
  }

  // ── How are you
  if (
    msg.includes("how are you") || msg.includes("how r you") || msg.includes("how r u") ||
    msg.includes("hows it going") || msg.includes("how's it going") || msg.includes("you ok") ||
    msg === "how are u" || msg === "hru"
  ) {
    return "I'm doing great, thanks for asking! 😊\n\nI'm always ready to tell you more about Kalpesh's work. Want to know about his projects, skills, or hackathon wins?";
  }

  // ── What is your name
  if (msg.includes("your name") || msg === "name") {
    return "I'm Kalpesh's AI Portfolio Assistant 🤖\n\nI'm powered by Kalpesh Odedara's personal portfolio dataset. You can ask me about his projects, skills, experience, hackathons, and more!";
  }

  // ── Who owns / created you
  if (
    msg.includes("your owner") || msg.includes("who made you") || msg.includes("who created you") ||
    msg.includes("who built you") || msg.includes("who is your creator") || msg.includes("who developed you") ||
    msg.includes("who is your owner") || msg.includes("your creator")
  ) {
    return "👤 **My Owner & Creator**\n\n**Odedara Kalpesh Balubhai** created and owns this AI assistant as part of his portfolio.\n\n🎓 BCA Student — Noble University, Gujarat\n💻 Full-Stack & AI Developer\n🏆 National Hackathon Rank #2\n\nFeel free to ask me anything about him!";
  }

  // ── How can you help
  if (
    msg.includes("what can you") || msg.includes("how can you help") || msg.includes("help me") ||
    msg.includes("what do you do") || msg.includes("capabilities") || msg === "help"
  ) {
    return "I can answer questions about:\n\n• 📂 Kalpesh's 7 projects (DermAI, Role System, Feedback, Furniture, Jewelry, Online Learning, Alpha Wear)\n• 💡 His tech skills & stack (React, Node, Python, MongoDB, AI/ML)\n• 🏆 Hackathon wins & achievements\n• 🎓 Education & certificates\n• 📍 Location & availability\n• 📬 How to contact him\n\nJust ask away!";
  }

  // ── Thanks / Appreciation
  if (
    msg.includes("thank you") || msg.includes("thankyou") || msg.includes("thanks") ||
    msg.includes("thx") || msg === "ty" || msg.includes("appreciate") || msg === "thank"
  ) {
    return "You're welcome! 😊 Happy to help. Feel free to ask anything else about Kalpesh's portfolio!";
  }

  // ── Bye / Goodbye
  if (
    msg === "by" || msg === "bye" || msg === "byee" || msg === "byebye" ||
    msg.includes("goodbye") || msg.includes("see you") || msg.includes("cya") ||
    msg.includes("take care") || msg === "later"
  ) {
    return "Goodbye! 👋 Feel free to come back anytime. Don't forget to check out Kalpesh's projects and reach out if you'd like to collaborate!";
  }

  // ── Who / Identity
  if (msg.includes("who are you") || msg.includes("what are you") || msg.includes("introduce yourself") || msg.includes("about you")) {
    return `I'm the AI assistant for **Odedara Kalpesh**'s portfolio.\n\nKalpesh is a Full-Stack & AI Developer pursuing BCA at Noble University, Gujarat. He builds intelligent web solutions spanning healthcare AI, university automation, and e-commerce — and secured **National Rank #2** in a 36-hour hackathon! 🚀`;
  }

  // ── Owner identity
  if (msg.includes("kalpesh") || msg.includes("odedara") || msg.includes("who is") || msg.includes("tell me about")) {
    return `**Odedara Kalpesh Balubhai** is a Full-Stack & AI Developer from Gujarat, India.\n\n🎓 BCA — Noble University (9.00 SGPA, 1st Rank)\n💻 Expert in React, Node.js, Python, MongoDB & AI/ML\n🏆 National Hackathon Rank #2 (Code Carnival Season 2)\n🔗 7 production projects spanning healthcare AI, e-commerce & university tools`;
  }

  // ── Education
  if (msg.includes("education") || msg.includes("study") || msg.includes("degree") || msg.includes("college") || msg.includes("university") || msg.includes("bca") || msg.includes("noble")) {
    return `🎓 **Education**\n\nDegree: Bachelor of Computer Applications (BCA)\nUniversity: Noble University, Junagadh, Gujarat\nAcademic Performance: **9.00 SGPA** — 1st Rank in Semester 2\n\nKalpesh consistently ranks at the top of his class while simultaneously building production-grade AI apps and winning national hackathons.`;
  }

  // ── CGPA / Marks
  if (msg.includes("cgpa") || msg.includes("sgpa") || msg.includes("marks") || msg.includes("gpa") || msg.includes("grade") || msg.includes("rank") && msg.includes("acad")) {
    return `📊 **Academic Performance**\n\nSGPA: **9.00** (Semester 2, BCA)\nUniversity Standing: **1st Rank** — Noble University\nAward: Academic Excellence Award 2023–24`;
  }

  // ── Location
  if (msg.includes("location") || msg.includes("based") || msg.includes("where") || msg.includes("city") || msg.includes("gujarat") || msg.includes("india")) {
    return `📍 **Location**\n\nKalpesh is based in **Gujarat, India** and is open to:\n• Remote work & collaborations\n• On-site opportunities\n• Freelance & internship projects`;
  }

  // ── Contact
  if (msg.includes("contact") || msg.includes("email") || msg.includes("hire") || msg.includes("reach") || msg.includes("connect") || msg.includes("linkedin")) {
    return `📬 **Get in Touch with Kalpesh**\n\nUse the **Contact section** of this portfolio to send a message directly.\n\n📞 Phone: +91 93136 90610\n📧 Email: kalpeshodedra931@gmail.com\n🔗 LinkedIn: linkedin.com/in/kalpesh-odedara\n🐱 GitHub: github.com/kalpesh-odedara\n\nHe's open to full-time roles, freelance work, and exciting collaborations!`;
  }

  // ── GitHub
  if (msg.includes("github") || msg.includes("repository") || msg.includes("repo") || msg.includes("source code")) {
    return `🔗 **GitHub Profile**\n\ngithub.com/kalpesh-odedara\n\nAll 7 projects are open-source and available there:\n• DermAI\n• Role Assign System\n• Feedback System\n• Furniture Shop\n• Jewelry Shop\n• Online Learning Platform\n• Alpha Wear`;
  }

  // ── Skills overview
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("stack") || msg.includes("language") || msg.includes("tool") || msg.includes("know") || msg.includes("expertise")) {
    return `💡 **Tech Stack & Skills**\n\n🎨 **Frontend:** React, TypeScript, JavaScript, HTML5, CSS3, Bootstrap, Tailwind CSS\n\n⚙️ **Backend:** Node.js, Express.js, Python, ASP.NET, C#\n\n🗄️ **Databases:** MongoDB, SQL Server, MySQL\n\n🤖 **AI/ML:** TensorFlow, OpenCV, NLP, Voice API, Chatbot Dev\n\n🛠️ **Tools:** Git, GitHub, Vite, Postman`;
  }

  // ── React
  if (msg.includes("react") || msg.includes("frontend") || msg.includes("ui")) {
    return `⚛️ **React & Frontend**\n\nKalpesh builds modern UIs with React + TypeScript, Tailwind CSS, and Framer Motion. Projects like DermAI, Role Assign System, and this portfolio itself are all built with React.\n\nHe also uses Bootstrap and vanilla CSS/JS for lighter projects like Alpha Wear.`;
  }

  // ── Python / AI
  if (msg.includes("python") || msg.includes("ai") || msg.includes("machine learning") || msg.includes("ml") || msg.includes("tensorflow") || msg.includes("opencv")) {
    return `🐍 **Python & AI/ML**\n\nKalpesh uses Python for AI model development, including:\n• Skin condition detection (CNN + TensorFlow)\n• Mood & skin type classification\n• Voice command processing\n• Natural language processing\n\nHis flagship AI project is **DermAI** — a smart hospital system with 4 integrated AI models.`;
  }

  // ── Node.js / Backend
  if (msg.includes("node") || msg.includes("backend") || msg.includes("express") || msg.includes("api") || msg.includes("server")) {
    return `⚙️ **Backend Development**\n\nKalpesh builds robust backends with:\n• **Node.js + Express.js** — REST APIs, middleware\n• **Python** — AI model serving\n• **ASP.NET + C#** — enterprise web apps\n\nHis backends power healthcare systems, feedback platforms, and e-commerce sites.`;
  }

  // ── MongoDB
  if (msg.includes("mongodb") || msg.includes("database") || msg.includes("sql") || msg.includes("db")) {
    return `🗄️ **Databases**\n\nKalpesh works with:\n• **MongoDB** — for projects like DermAI, Role Assign System\n• **SQL Server** — for ASP.NET e-commerce projects (Furniture, Jewelry, Online Learning)\n• **MySQL** — general purpose`;
  }

  // ── All projects list
  if ((msg.includes("all") && msg.includes("project")) || msg.includes("projects") || msg.includes("portfolio")) {
    return `📂 **All Projects (7 Total)**\n\n🚀 **DermAI** — AI Hospital System (React, Node, Python, MongoDB)\n🎓 **Role Assign System** — University Role Management\n📝 **Feedback System** — Subject-wise Faculty Feedback\n🛋️ **Furniture Shop** — ASP.NET E-Commerce\n💍 **Jewelry Shop** — ASP.NET E-Commerce\n📚 **Online Learning Platform** — EdTech Platform\n👕 **Alpha Wear** — Fashion E-Commerce (Internship)\n\nAsk me about any specific project for more details!`;
  }

  // ── DermAI details
  if (msg.includes("dermai") || msg.includes("derma") || msg.includes("hospital") || msg.includes("skin") || msg.includes("healthcare")) {
    const p = PORTFOLIO_DATA.projects[0];
    return `🏥 **${p.name}** — ${p.type}\n\n${p.description}\n\n✨ **Key Features:**\n${(p.features ?? []).map((f) => `• ${f}`).join("\n")}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Role Assign System
  if (msg.includes("role assign") || msg.includes("role system") || msg.includes("role management")) {
    const p = PORTFOLIO_DATA.projects[1];
    return `🎓 **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Feedback System
  if (msg.includes("feedback")) {
    const p = PORTFOLIO_DATA.projects[2];
    return `📝 **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Furniture Shop
  if (msg.includes("furniture")) {
    const p = PORTFOLIO_DATA.projects[3];
    return `🛋️ **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Jewelry Shop
  if (msg.includes("jewelry") || msg.includes("jewel")) {
    const p = PORTFOLIO_DATA.projects[4];
    return `💍 **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Online Learning
  if (msg.includes("learning") || msg.includes("online") || msg.includes("edtech") || msg.includes("course")) {
    const p = PORTFOLIO_DATA.projects[5];
    return `📚 **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Alpha Wear
  if (msg.includes("alpha wear") || msg.includes("fashion") || msg.includes("alpha") || msg.includes("internship")) {
    const p = PORTFOLIO_DATA.projects[6];
    return `👕 **${p.name}** — ${p.type}\n\n${p.description}\n\n🛠️ Tech: ${p.tech}\n🔗 GitHub: ${p.github}`;
  }

  // ── Hackathons
  if (msg.includes("hackathon") || msg.includes("competition") || msg.includes("hack") || msg.includes("competitive")) {
    return `🏆 **Hackathon Victories**\n\n${PORTFOLIO_DATA.hackathons
      .map((h) => `${h.rank}\n**${h.name}**\n${h.event} — ${h.year}`)
      .join("\n\n")}\n\nKalpesh has a proven track record of winning national and university-level coding competitions!`;
  }

  // ── Code Carnival
  if (msg.includes("code carnival") || msg.includes("national rank") || msg.includes("rank 2") || msg.includes("atmiya")) {
    const h = PORTFOLIO_DATA.hackathons[0];
    return `🥈 **${h.name}** — ${h.rank}\n\n${h.detail}\n\nEvent: ${h.event}\nYear: ${h.year}`;
  }

  // ── SIH / YuthTech
  if (msg.includes("sih") || msg.includes("smart india") || msg.includes("yuthtech")) {
    const h = PORTFOLIO_DATA.hackathons[2];
    return `🎖️ **${h.name}**\n\n${h.detail}\n\nEvent: ${h.event}\nYear: ${h.year}`;
  }

  // ── Certificates
  if (msg.includes("certificate") || msg.includes("award") || msg.includes("achievement") || msg.includes("certification")) {
    return `🏅 **Certificates & Awards**\n\n${PORTFOLIO_DATA.certificates
      .map((c, i) => `${i + 1}. **${c.title}**\n   📋 ${c.type} — ${c.issuer} (${c.date})`)
      .join("\n\n")}\n\nKalpesh has 5+ certificates spanning hackathons, academic excellence, and professional development.`;
  }

  // ── Cybersecurity certificate
  if (msg.includes("cyber") || msg.includes("security") || msg.includes("ethical hacking") || msg.includes("hacking") || msg.includes("hp life")) {
    return `🛡️ **Cybersecurity Certificates**\n\n1. **Introduction to Cybersecurity Awareness**\n   Issued by HP Foundation (HP LIFE) — June 11, 2025\n\n2. **Cyber Security & Ethical Hacking**\n   Internship Program Demo Session — Edureka — October 10, 2023`;
  }

  // ── ASP.NET projects
  if (msg.includes("asp.net") || msg.includes("asp") || msg.includes("c#") || msg.includes("csharp") || msg.includes("dotnet") || msg.includes(".net")) {
    return `🔷 **ASP.NET Projects**\n\nKalpesh built 3 full-stack e-commerce/edtech platforms using ASP.NET + C# + SQL Server:\n\n🛋️ **Furniture Shop** — Product catalogue, cart, orders\n💍 **Jewelry Shop** — Category-wise browsing (gold, silver, diamond)\n📚 **Online Learning Platform** — Course enrollment & teaching marketplace\n\nAll use Bootstrap for the frontend and SQL Server for the database.`;
  }

  // ── Voice assistant feature
  if (msg.includes("voice") || msg.includes("speech") || msg.includes("voice assistant")) {
    return `🎙️ **Voice Assistant in DermAI**\n\nDermAI includes a voice assistant feature that lets users:\n• Navigate pages using natural voice commands\n• Interact with AI models by speaking\n• Control hospital workflows hands-free\n\nBuilt with a Voice API integrated into the React frontend.`;
  }

  // ── Chatbot feature
  if (msg.includes("chatbot") || msg.includes("chat bot") || msg.includes("personal ai")) {
    return `🤖 **AI Chatbot in DermAI**\n\nDermAI features a Personal AI Chatbot that:\n• Answers patient health queries\n• Automates hospital service guidance\n• Handles appointment-related conversations\n• Integrates with the MongoDB backend for real-time responses`;
  }

  // ── Number of projects
  if ((msg.includes("how many") && msg.includes("project")) || msg.includes("count")) {
    return `📊 Kalpesh has built **7 projects** in total:\n\n• 1 featured AI healthcare system (DermAI)\n• 2 university management tools\n• 3 e-commerce platforms\n• 1 internship project\n\nAll are available on his GitHub!`;
  }

  // ── Open to work
  if (msg.includes("hire") || msg.includes("job") || msg.includes("work") || msg.includes("opportunity") || msg.includes("available") || msg.includes("freelance")) {
    return `💼 **Open to Opportunities!**\n\nKalpesh is actively looking for:\n• Full-time developer roles\n• Freelance & contract projects\n• Remote work / internships\n• Open-source collaborations\n\nUse the **Contact** section on this portfolio to get in touch — he responds fast! ⚡`;
  }

  // ── Out of scope
  const offTopics = ["weather", "news", "politics", "religion", "movies", "songs", "food", "recipes", "sports", "cricket", "soccer", "travel", "finance", "stock", "banking", "game", "anime", "manga"];
  if (offTopics.some((t) => msg.includes(t))) {
    return "This is not related to Kalpesh Odedara, please ask related to him.";
  }

  // ── Default fallback
  return "This is not related to Kalpesh Odedara, please ask related to him.";
};

// ─── SUGGESTED QUESTIONS ──────────────────────────────────────────────────────

const SUGGESTED_QUESTIONS = [
  "Tell me about DermAI",
  "What are Kalpesh's skills?",
  "Show his hackathon wins",
  "List all projects",
  "How to contact Kalpesh?",
  "What certificates does he have?",
];

// ─── INITIAL MESSAGE ──────────────────────────────────────────────────────────

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "👋 Hi! I'm Kalpesh's AI Portfolio Assistant.\n\nAsk me anything about his projects, skills, hackathons, certificates, or how to hire him!",
    role: "assistant",
    timestamp: new Date(),
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleSend = () => sendMessage(input);

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent text-accent-foreground shadow-lg",
          "hover:shadow-xl transition-shadow",
          isOpen && "hidden"
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-success rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] flex flex-col glass rounded-2xl shadow-2xl overflow-hidden border border-border/60"
          >
            {/* ── Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-accent/90 text-accent-foreground">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border border-card" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Kalpesh's AI Assistant</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5 text-accent" />
                    Portfolio Intelligence · Always Online
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* ── Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn("flex gap-2.5", message.role === "user" && "flex-row-reverse")}
                  >
                    <div
                      className={cn(
                        "shrink-0 p-1.5 rounded-lg self-end",
                        message.role === "assistant"
                          ? "bg-accent/80 text-accent-foreground"
                          : "bg-secondary"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-3.5 w-3.5" />
                      ) : (
                        <User className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap",
                        message.role === "assistant"
                          ? "bg-secondary text-foreground rounded-bl-sm"
                          : "bg-accent text-accent-foreground rounded-br-sm"
                      )}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-2.5"
                  >
                    <div className="shrink-0 p-1.5 rounded-lg bg-accent/80 text-accent-foreground self-end">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1 items-center">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay }}
                            className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggested Questions */}
              <AnimatePresence>
                {showSuggestions && messages.length === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <p className="text-[10px] text-muted-foreground font-mono pl-1">// quick questions</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="px-3 py-1.5 rounded-xl text-[11px] font-medium bg-secondary hover:bg-accent/20 hover:text-accent border border-border/50 transition-colors text-muted-foreground"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input */}
            <div className="px-4 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, hackathons..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/80 border border-border/40 text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent/60 transition"
                />
                <Button type="submit" variant="hero" size="icon" disabled={!input.trim()} className="shrink-0 h-9 w-9 rounded-xl">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
              <p className="text-[9px] text-muted-foreground/50 text-center mt-1.5 font-mono">
                Portfolio AI · Powered by Kalpesh's dataset
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
