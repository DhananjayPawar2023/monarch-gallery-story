import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display text-xl mb-4">Monarch Gallery</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bridging artists and collectors through meaningful digital art.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="/artists" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Artists
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Monarch Gallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
