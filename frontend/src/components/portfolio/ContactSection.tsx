import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 93136 90610", href: "tel:+919313690610" },
  { icon: Mail, label: "Email", value: "kalpeshodedra931@gmail.com", href: "mailto:kalpeshodedra931@gmail.com" },
];

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to send message");
      
      setShowSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast({ 
        title: "Error", 
        description: error.message || "Failed to send message. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="font-mono text-primary text-sm mb-2">{"// contact"}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Innovate Together?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              I am actively seeking full-stack opportunities and am confident I can contribute value to the engineering team at UEST Edtech. Let's discuss my projects.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
          <ScrollReveal>
            <div className="space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="glass rounded-xl p-6 flex items-start gap-4 card-hover shadow-glow-subtle border border-primary/5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                    <c.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-mono mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-base font-bold text-foreground hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-base font-bold text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 lg:p-10 space-y-5 shadow-glow-subtle border border-primary/5">
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} className="h-12 bg-secondary/30 border-border/50 rounded-xl focus:ring-primary/40 transition-all" />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" maxLength={255} className="h-12 bg-secondary/30 border-border/50 rounded-xl focus:ring-primary/40 transition-all" />
              </div>
              <div>
                <label className="text-sm font-mono text-muted-foreground mb-2 block">Message</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." rows={5} maxLength={1000} className="bg-secondary/30 border-border/50 rounded-2xl focus:ring-primary/40 transition-all p-4" />
              </div>
              <Button variant="hero" type="submit" disabled={loading} className="w-full h-14 rounded-xl text-lg font-bold">
                {loading ? "Sending..." : "Send Message"}
                <Send className="h-5 w-5 ml-2" />
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>

      {/* Professional Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass rounded-3xl p-8 border border-primary/20 text-center shadow-glow"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setShowSuccess(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <CheckCircle2 className="h-10 w-10 text-primary animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold mb-3">Message Received</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Thank you for messaging Odedara Kalpesh. He will connect with you in a short time.
              </p>

              <Button 
                variant="hero" 
                className="w-full" 
                onClick={() => setShowSuccess(false)}
              >
                Done
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
