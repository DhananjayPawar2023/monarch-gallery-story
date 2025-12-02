import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatBreadcrumb = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Skip UUIDs in breadcrumb display
        if (name.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          return null;
        }

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {isLast ? (
              <span className="text-foreground font-medium">{formatBreadcrumb(name)}</span>
            ) : (
              <Link
                to={routeTo}
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {formatBreadcrumb(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
