import { Linkedin } from "lucide-react";

export const PortfolioFooter = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">© 2026 Kalpesh Odedara. All Rights Reserved.</p>
      <a href="https://www.linkedin.com/in/kalpesh-odedara-a056a6320?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Linkedin className="h-5 w-5" />
      </a>
    </div>
  </footer>
);
