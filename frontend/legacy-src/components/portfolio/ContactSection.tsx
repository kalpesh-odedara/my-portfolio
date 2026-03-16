import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 93136 90610", href: "tel:+919313690610" },
  { icon: Mail, label: "Email", value: "kalpeshodedra931@gmail.com", href: "mailto:kalpeshodedra931@gmail.com" },
  { icon: MapPin, label: "Address", value: "Near Post Office, Devda, Kutiyana – Porbandar, Gujarat" },
];

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    }, 1200);
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

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="space-y-4">
              {contactInfo.map((c) => (
                <div key={c.label} className="glass rounded-xl p-5 flex items-start gap-4 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <c.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="glass rounded-xl overflow-hidden h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29657.88!2d69.85!3d21.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39581f0d7e9d28a1%3A0x1!2sKutiyana%2C+Gujarat!5e0!3m2!1sen!2sin!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-4">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} className="bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Email</label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" maxLength={255} className="bg-secondary/50 border-border" />
              </div>
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-1.5 block">Message</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." rows={5} maxLength={1000} className="bg-secondary/50 border-border" />
              </div>
              <Button variant="hero" type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
                <Send className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
