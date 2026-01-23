import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/monarch-logo.jpeg";
import { Settings, User, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Artists", path: "/artists" },
    { name: "Interviews", path: "/interviews" },
    { name: "Exhibitions", path: "/exhibitions" },
    { name: "Journal", path: "/journal" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Monarch Gallery" 
              className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
              Monarch
            </span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-body tracking-wide transition-all duration-300 relative py-1",
                  "after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-foreground after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out",
                  location.pathname === link.path
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            {isAdmin && (
              <Button size="sm" variant="ghost" asChild className="hidden sm:flex">
                <Link to="/admin">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
            )}
            
            {user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                  <Link to="/dashboard">
                    <User className="h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  onClick={signOut} 
                  size="sm"
                  className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                asChild 
                size="sm"
                className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-3 text-base transition-colors border-b border-border/50 last:border-0",
                  location.pathname === link.path
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 space-y-3">
              {isAdmin && (
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              {user ? (
                <>
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => { signOut(); setMobileMenuOpen(false); }} 
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button 
                  asChild 
                  className="w-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
