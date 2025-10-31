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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Monarch" 
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display text-lg md:text-xl tracking-tight group-hover:text-accent transition-colors">
              Monarch
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-2 md:gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-xs md:text-sm font-body tracking-wide transition-colors relative px-1",
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
