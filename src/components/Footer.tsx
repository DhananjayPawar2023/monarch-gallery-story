import { Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          <div>
            <h3 className="font-display text-2xl mb-5">Monarch</h3>
            <p className="text-sm text-muted-foreground leading-[1.7]">
              Bridging digital artistry and human emotion through curated exhibitions and thoughtful storytelling.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-[0.15em] mb-5">Explore</h4>
            <ul className="space-y-3">
              <li>
                <a href="/collections" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Collections
                </a>
              </li>
              <li>
                <a href="/artists" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Artists
                </a>
              </li>
              <li>
                <a href="/journal" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Journal
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-[0.15em] mb-5">Follow</h4>
            <div className="flex gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe on YouTube"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <p className="text-xs text-muted-foreground text-center tracking-wide">
            © {new Date().getFullYear()} Monarch Gallery — Where Art Meets Story. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
