import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi! I'm your RoleGuard assistant. How can I help you with role and permission management today?",
    role: "assistant",
    timestamp: new Date(),
  },
];

const mockResponses: Record<string, string> = {
  // Personal profile and self info
  "your name": "I'm Odedara Kalpesh, a Full-Stack and AI Developer currently pursuing BCA. I build production-grade web apps and intelligent AI solutions.",
  "who are you": "I'm Odedara Kalpesh, a web developer and AI enthusiast. I build solutions for healthcare, university automation, and e-commerce.",
  "where are you based": "I'm based in India and open to remote and on-site opportunities.",
  "what is your expertise": "My expertise includes React, Node.js, Python, MongoDB, AI chatbots, and full-stack web development.",
  "what projects do you have": "I have multiple projects including DermAI, Role Assign System, Feedback System, and several e-commerce platforms in ASP.NET.",
  "what is your education": "I'm a BCA student with strong academic performance and a national hackathon rank of #2.",
  "what is your cgpa": "I have a 9.00 SGPA.",
  "how can i contact you": "You can contact me through the contact form on this portfolio or via my GitHub profile.",

  // Default role-based assistant responses
  role: "Roles define a set of permissions that can be assigned to users. Common roles include Admin, Manager, and User. Each role has specific access levels within the system.",
  permission: "Permissions are granular access controls that determine what actions a user can perform. They can be assigned directly to users or bundled into roles.",
  admin: "Admin users have full access to all system features, including user management, role configuration, and system settings. They can create, modify, and delete any resource.",
  manager: "Managers have elevated privileges to oversee team members and approve certain actions. They typically can view reports and manage users within their department.",
  user: "Standard users have basic access to the system. They can view their own data and perform routine operations but cannot access administrative functions.",
  help: "I can help you with:\n• Understanding roles and permissions\n• Setting up access controls\n• Managing user assignments\n• Best practices for RBAC\n\nJust ask me anything!",
  default: "That's a great question! For detailed information on that topic, I'd recommend checking our documentation or contacting our support team. Is there anything specific about roles or permissions I can help clarify?",
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Direct self-introduction answers for conversational queries about the creator
  if (lowerMessage.includes("who are you") || lowerMessage.includes("your name") || lowerMessage.includes("yourself")) {
    return "I am Odedara Kalpesh — Full-Stack & AI Developer. I build intelligent web solutions, including DermAI and role/feedback systems.";
  }

  if (lowerMessage.includes("where are you based") || lowerMessage.includes("location")) {
    return "I'm based in India and open to remote collaborations and job opportunities.";
  }

  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }

  const outOfDomainList = [
    "weather",
    "movies",
    "songs",
    "pizza",
    "soccer",
    "cricket",
    "election",
    "politics",
    "religion",
    "finance",
    "bank",
    "sports",
    "travel",
    "fashion",
    "cooking",
    "food",
    "medicine",
  ];

  if (outOfDomainList.some((word) => lowerMessage.includes(word))) {
    return "This question is not related to Kalpesh Odedara, ask related to domain please.";
  }

  return "This question is not related to Kalpesh Odedara, ask related to domain please.";
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response delay
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
    }, 1000 + Math.random() * 1000);
  };

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
        whileHover={{ scale: 1.05 }}
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] flex flex-col glass rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent text-accent-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">RoleGuard Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={cn(
                        "shrink-0 p-2 rounded-lg",
                        message.role === "assistant"
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-wrap",
                        message.role === "assistant"
                          ? "bg-secondary text-secondary-foreground rounded-tl-md"
                          : "bg-accent text-accent-foreground rounded-tr-md"
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
                    className="flex gap-3"
                  >
                    <div className="shrink-0 p-2 rounded-lg bg-accent text-accent-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-secondary p-4 rounded-2xl rounded-tl-md">
                      <div className="flex gap-1">
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
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
                  placeholder="Ask about roles & permissions..."
                  className="flex-1 px-4 py-2 rounded-xl bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button type="submit" variant="hero" size="icon" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
