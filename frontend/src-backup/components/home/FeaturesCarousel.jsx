import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Users, Lock, Zap, Settings, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Define custom roles with granular permissions that match your organization's structure.",
    gradient: "from-accent to-accent/60",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Easily manage users and their roles across departments and projects.",
    gradient: "from-success to-success/60",
  },
  {
    icon: Lock,
    title: "Secure by Default",
    description: "Enterprise-grade security with encrypted credentials and audit logs.",
    gradient: "from-warning to-warning/60",
  },
  {
    icon: Zap,
    title: "Instant Sync",
    description: "Real-time permission updates across all connected services and applications.",
    gradient: "from-accent to-success/60",
  },
  {
    icon: Settings,
    title: "Easy Configuration",
    description: "Intuitive dashboard for setting up and modifying access controls.",
    gradient: "from-success to-accent/60",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Track permission usage and identify security patterns across your organization.",
    gradient: "from-warning to-accent/60",
  },
];

export const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, features.length - itemsPerView);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxIndex) {
        next();
      } else {
        setDirection(-1);
        setCurrentIndex(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  const visibleFeatures = features.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for{" "}
            <span className="gradient-text">access control</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to manage permissions at any scale
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Controls */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="glass"
              size="icon"
              onClick={prev}
              disabled={currentIndex === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="glass"
              size="icon"
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel Items */}
          <div className="overflow-hidden mx-8">
            <motion.div
              className="flex gap-6"
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleFeatures.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 min-w-0"
                    >
                      <div className="group p-8 rounded-2xl bg-background border border-border card-hover h-full">
                        <div
                          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-accent-foreground mb-6`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-8 bg-accent"
                    : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
