import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Headphones, FileText } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/common/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapEmbed } from "@/components/common/MapEmbed";
import contactReception from "@/assets/contact-reception.jpg";

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat with Us",
    description: "Use our AI assistant for instant help",
    action: "Open Chat",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "support@roleguard.dev",
    action: "Email Support",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Browse our comprehensive docs",
    action: "View Docs",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Parallax */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0">
            <img 
              src={contactReception} 
              alt="University reception" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </motion.div>
          <div className="absolute inset-0 mesh-gradient opacity-50" />

          <motion.div
            style={{ opacity }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <ScrollReveal>
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/20 text-accent border border-accent/30 mb-6">
                  Get in Touch
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  We'd Love to{" "}
                  <span className="bg-gradient-to-r from-accent via-success to-accent bg-clip-text text-transparent">
                    Hear from You
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg md:text-xl text-primary-foreground/70">
                  Have questions about RoleGuard? Our team is here to help you succeed.
                </p>
              </ScrollReveal>
            </div>
          </motion.div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <StaggerContainer className="grid md:grid-cols-3 gap-6 -mt-24 relative z-20">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <StaggerItem key={method.title}>
                    <div className="bg-background rounded-2xl border border-border p-6 card-hover text-center">
                      <div className="inline-flex p-4 rounded-xl bg-accent/10 text-accent mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {method.description}
                      </p>
                      <Button variant="outline" size="sm">
                        {method.action}
                      </Button>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Info */}
              <ScrollReveal direction="left">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                    Contact Us
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Let's start a conversation
                  </h2>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Whether you're exploring RoleGuard for your team or need technical support, we're here to help.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">hello@roleguard.dev</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent/10 text-accent shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Office</h4>
                        <p className="text-muted-foreground">
                          123 Innovation Way<br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Form */}
              <ScrollReveal direction="right">
                <form
                  onSubmit={handleSubmit}
                  className="bg-card rounded-2xl border border-border p-8"
                >
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="mt-2"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="mt-2"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      className="mt-2"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      className="mt-2 min-h-[150px]"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                  Find Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Visit Our Campus
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Come visit our state-of-the-art facilities and experience our campus firsthand
                </p>
              </div>
            </ScrollReveal>
            <MapEmbed className="max-w-5xl mx-auto" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Frequently asked questions
                </h2>
              </div>
            </ScrollReveal>

            <StaggerContainer className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "How long does it take to set up RoleGuard?",
                  a: "Most teams are up and running within 30 minutes. Our SDKs and comprehensive documentation make integration straightforward.",
                },
                {
                  q: "What happens when I exceed my plan limits?",
                  a: "We'll notify you before you hit your limits and help you upgrade seamlessly. Your service will never be interrupted unexpectedly.",
                },
                {
                  q: "Do you offer custom enterprise solutions?",
                  a: "Yes! Our enterprise tier includes custom integrations, dedicated support, and SLA guarantees. Contact our sales team to learn more.",
                },
                {
                  q: "Is my data secure with RoleGuard?",
                  a: "Absolutely. We use industry-standard encryption, are SOC 2 compliant, and never access your data without explicit permission.",
                },
              ].map((faq, i) => (
                <StaggerItem key={i}>
                  <div className="bg-background rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
      <ChatBot />
    </PageTransition>
  );
};

export default Contact;
