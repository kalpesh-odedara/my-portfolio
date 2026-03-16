import { Linkedin } from "lucide-react";

export const PortfolioFooter = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2026 Kalpesh Odedara. All Rights Reserved.</p>
      <a href="https://linkedin.com/in/kalpesh-odedara" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  </footer>
);
