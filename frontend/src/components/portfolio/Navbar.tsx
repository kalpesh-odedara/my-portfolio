import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/#home", isAnchor: true },
  { name: "About", href: "/#about", isAnchor: true },
  { name: "Skills", href: "/#skills", isAnchor: true },
  { name: "Projects", href: "/#projects", isAnchor: true },
  { name: "Bhautik", href: "/bhautik", isAnchor: false },
  { name: "Certificates", href: "/#certificates", isAnchor: true },
  { name: "Contact", href: "/#contact", isAnchor: true },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string, isAnchor: boolean) => {
    setIsOpen(false);
    if (isAnchor) {
      if (location.pathname !== "/") {
        navigate(href);
      } else {
        const id = href.replace("/", "");
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "glass shadow-lg" : "bg-transparent")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => handleNav("/#home", true)} className="font-mono text-xl font-bold text-primary tracking-tighter hover:scale-105 transition-transform">
            {"<KO />"}
          </button>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.isAnchor)}
                className="px-4 py-2 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-all rounded-full hover:bg-primary/5"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="hero" size="sm" onClick={() => handleNav("/#contact", true)} className="rounded-full px-6">
              Let's Talk
            </Button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 rounded-xl bg-secondary/50 text-primary hover:bg-secondary transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }} 
            className="lg:hidden absolute top-20 left-4 right-4 z-50 glass rounded-3xl border border-primary/20 shadow-2xl overflow-hidden shadow-glow-subtle"
          >
            <div className="p-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href, link.isAnchor)}
                  className="w-full text-center px-6 py-4 rounded-2xl text-base font-bold text-foreground hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/10"
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="pt-4 px-2">
                <Button variant="hero" className="w-full py-6 rounded-2xl text-lg font-bold" onClick={() => handleNav("/#contact", true)}>
                   Let's Talk
                </Button>
                <div className="flex justify-center mt-4 opacity-30 hover:opacity-100 transition-opacity">
                   <Link to="/admin" onClick={() => setIsOpen(false)} className="text-[10px] flex items-center gap-1 text-muted-foreground">
                      <Shield className="h-3 w-3" /> Admin
                   </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
