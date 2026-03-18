import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface KnowledgeItem {
  question: string;
  answer: string;
}

interface DynamicKnowledge {
  dataset: KnowledgeItem[];
  profile: {
    bio: string;
  };
}

const baselineDataset: KnowledgeItem[] = [
  { question: 'who are you', answer: 'I am Odedara Kalpesh, a Full-Stack & AI Developer specializing in intelligent web solutions.' },
  { question: 'your name', answer: 'My name is Odedara Kalpesh.' },
  { question: 'name', answer: 'My name is Odedara Kalpesh.' },
  { question: 'who is your owner', answer: 'I was created by Odedara Kalpesh to help visitors learn about his work.' },
  { question: 'owner', answer: 'My owner is Odedara Kalpesh.' },
  { question: 'how are you', answer: "I'm doing great! I'm an AI, so I'm always ready to help you explore Kalpesh's portfolio." },
  { question: 'hobbies', answer: 'Kalpesh enjoys Artwork, Designing, and Teaching in his free time.' },
  { question: 'hobby', answer: 'Kalpesh enjoys Artwork, Designing, and Teaching.' },
  { question: 'what do you like', answer: 'Kalpesh is passionate about Artwork, Designing, and Teaching.' },
  { question: 'nice to meet you', answer: "It's a pleasure to meet you too! Feel free to ask me anything about Kalpesh's projects or skills." },
  { question: 'nice', answer: 'Thank you! I try my best to be helpful.' },
  { question: 'expertise', answer: 'Kalpesh specializes in React, Node.js, Python, MongoDB, and AI chatbot solutions.' },
  { question: 'skills', answer: 'The technical toolkit includes React, Node.js, Python, MongoDB, ASP.NET, C#, and AI integration.' },
  { question: 'where are you based', answer: 'Kalpesh is based in Gujarat, India.' },
  { question: 'location', answer: 'Kalpesh is based in Gujarat, India.' },
  { question: 'projects', answer: 'Kalpesh has built several impressive projects: DermAI (AI Hospital System), Role Assign System, Feedback System, and multiple E-commerce platforms like Furniture Shop (https://github.com/kalpesh-odedara/Furniture-Shop.git) and Alpha Wear.' },
  { question: 'dermai', answer: 'DermAI is a featured project: An AI-Powered Smart Hospital Management System with skin detection, a voice assistant, and mood analysis. View on GitHub: https://github.com/kalpesh-odedara/dermai.git' },
  { question: 'role assign', answer: 'The Role Assign System is a university platform that manages roles for faculty and students using an AI chatbot.' },
  { question: 'feedback system', answer: 'The Feedback System allows students to provide subject-wise faculty evaluations with intuitive dashboards.' },
  { question: 'e-commerce', answer: 'Kalpesh has built several e-commerce sites: Furniture Shop (https://github.com/kalpesh-odedara/Furniture-Shop.git), Jewelry Shop (ASP.NET), and Alpha Wear (Fashion Store).' },
  { question: 'cgpa', answer: 'Kalpesh has consistently secured a perfect 9.00 SGPA every semester!' },
  { question: 'sgpa', answer: 'Kalpesh maintains a stellar 9.00 SGPA in his BCA studies.' },
  { question: 'education', answer: "Kalpesh is pursuing a BCA (2023–2026) in Gujarat, India, maintaining a 9.00 SGPA and ranking 1st in his university." },
  { question: 'achievements', answer: 'Highlights include National Rank #2 in Code Carnival Season 2, 1st Rank in Gujarat / 2nd Rank in India for a National Web Development Quiz, and being a 3x university hackathon winner.' },
  { question: 'hackathon', answer: 'Kalpesh holds a National Rank #2 from Code Carnival Season 2 and is a SIH 2025 finalist!' },
  { question: 'certificates', answer: 'Kalpesh holds certificates in Cybersecurity (HP LIFE), Ethical Hacking (Edureka), CCC (Govt. of India), and multiple academic excellence awards.' },
  { question: 'certificate', answer: 'Key certificates include HP LIFE Cybersecurity Awareness and Edureka Cyber Security & Ethical Hacking.' },
  { question: 'awards', answer: 'Academic Excellence Award (1st Rank in University, 2024), Tech Noble Winner, and National Level Hackathon Rank 2.' },
  { question: 'quiz', answer: 'Kalpesh secured 1st Rank in Gujarat and 2nd Rank in India in a National Level Web Development Quiz!' },
  { question: 'ccc', answer: 'Yes, Kalpesh is CCC certified by the Government of India.' },
  { question: 'cybersecurity', answer: 'Kalpesh is certified in Cybersecurity Awareness by HP LIFE and has attended Ethical Hacking training with Edureka.' },
  { question: 'hire', answer: 'You can hire Kalpesh by filling out the contact form or reaching out via GitHub/LinkedIn!' },
  { question: 'contact number', answer: 'You can reach Kalpesh at +91 93136 90610.' },
  { question: 'phone', answer: 'Kalpesh\'s phone number is +91 93136 90610.' },
  { question: 'call', answer: 'You can call Kalpesh at +91 93136 90610.' },
  { question: 'email', answer: 'You can email Kalpesh at kalpeshodedra931@gmail.com or use the contact form.' },
  { question: 'mail', answer: 'Kalpesh\'s email is kalpeshodedra931@gmail.com.' },
  { question: 'bye', answer: 'Goodbye! Feel free to come back if you have more questions. Have a great day!' },
  { question: 'by', answer: 'Goodbye! Have a great day!' },
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Kalpesh's AI Assistant. Ask me anything about his projects, skills, or experience!",
      role: "assistant",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic knowledge from backend
  const { data: dynamicData } = useQuery<DynamicKnowledge>({
    queryKey: ['chatbot-knowledge'],
    queryFn: async () => {
      try {
             const resp = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/knowledge`);
             if (!resp.ok) return { dataset: [], profile: { bio: "" } };
             return resp.json();
      } catch (e) {
        return { dataset: [], profile: { bio: "" } };
      }
    }
  });

  const fullDataset = useMemo(() => {
    if (!dynamicData?.dataset) return baselineDataset;
    return [...baselineDataset, ...dynamicData.dataset];
  }, [dynamicData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const getResponse = (message: string): string => {
    const text = message.trim().toLowerCase();
    
    // Greetings
    if (["hi", "hello", "hey", "hy", "hola"].some(g => text === g || text.startsWith(g + " "))) {
      return "Hello! How can I help you today? You can ask about Kalpesh's projects, experience, or skills.";
    }

    // Match from merged dataset - check for exact matches first, then partials
    const exactMatch = fullDataset.find(item => item.question === text);
    if (exactMatch) return exactMatch.answer;

    const partialMatch = fullDataset.find(item => text.includes(item.question));
    if (partialMatch) return partialMatch.answer;

    // Domain check
    const inDomain = ['project', 'ai', 'developer', 'react', 'node', 'python', 'hire', 'work', 'job', 'skill', 'contact', 'email', 'phone', 'call'];
    if (inDomain.some((word) => text.includes(word))) {
      return "I can help with information about Kalpesh's professional background. Ask me about his tech stack or specific apps he's built!";
    }

    return "I'm sorry, I'm specialized in Kalpesh Odedara's profile. Ask me about his coding journey or projects!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  return (
    <>
      {/* FAB Button - Premium Design */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 z-[100] p-4 rounded-2xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]",
          "hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all border border-white/10",
          isOpen && "pointer-events-none opacity-0"
        )}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="relative">
          <MessageCircle className="h-7 w-7" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary" 
          />
        </div>
      </motion.button>

      {/* Chat Window - Premium UI */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 right-8 z-[100] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] flex flex-col bg-background/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/20 shadow-glow">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-foreground">Kalpesh AI</h3>
                    <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">Portfolio Intelligence</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border",
                    message.role === "assistant" 
                      ? "bg-primary/20 border-primary/20 text-primary" 
                      : "bg-secondary border-border text-foreground"
                  )}>
                    {message.role === "assistant" ? <Terminal className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    message.role === "assistant"
                      ? "bg-secondary/50 text-foreground rounded-tl-none border border-white/5"
                      : "bg-primary text-primary-foreground rounded-tr-none shadow-glow font-medium"
                  )}>
                    {message.content}
                    <div className={cn(
                      "text-[9px] mt-2 opacity-40 uppercase tracking-tighter",
                      message.role === "user" && "text-right"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/20 text-primary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 1, 0.3] 
                          }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-primary rounded-full transition-shadow shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/5 bg-black/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative group"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query intelligence database..."
                  className={cn(
                    "w-full pl-5 pr-14 py-4 rounded-2xl bg-white/5 border border-white/10 text-sm outline-none transition-all",
                    "focus:bg-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                    "placeholder:text-muted-foreground/40"
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/80 text-primary-foreground shadow-glow grid place-content-center transition-transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
              <p className="text-[9px] text-center text-muted-foreground/40 mt-3 uppercase tracking-widest font-bold">
                Powered by RoleWise AI Neural Data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

