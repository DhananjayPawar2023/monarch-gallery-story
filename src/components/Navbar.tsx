import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/monarch-logo.jpeg";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Artists", path: "/artists" },
    { name: "Journal", path: "/journal" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Monarch" 
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display text-xl tracking-tight group-hover:text-accent transition-colors hidden md:inline">
              Monarch
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-xs md:text-sm font-body tracking-wide transition-colors relative",
                  "after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-[-4px] after:left-0 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300",
                  location.pathname === link.path
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
