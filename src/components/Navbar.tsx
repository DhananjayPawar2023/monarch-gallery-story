import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/monarch-logo.jpeg";
import { LogIn, Settings, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: "Explore", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Artists", path: "/artists" },
    { name: "Journal", path: "/journal" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Monarch Gallery" 
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-display text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
              Monarch
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-body tracking-wide transition-all duration-300 relative py-1",
                    "after:content-[''] after:absolute after:w-full after:h-[2px] after:bottom-0 after:left-0 after:bg-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out",
                    location.pathname === link.path
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground hover:after:scale-x-100"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleDarkMode}
                className="h-8 w-8 p-0"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              
              {isAdmin && (
                <Button size="sm" variant="outline" asChild>
                  <Link to="/admin">
                    <Settings className="w-3 h-3 sm:mr-2" />
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                </Button>
              )}
              
              {!user && (
                <Button size="sm" asChild>
                  <Link to="/auth">
                    <LogIn className="w-3 h-3 sm:mr-2" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
