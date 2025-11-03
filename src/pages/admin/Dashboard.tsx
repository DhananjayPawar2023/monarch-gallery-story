import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Image, BookOpen, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const { isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const adminSections = [
    {
      title: "Artists",
      description: "Manage artist profiles, bios, and portfolios",
      icon: Users,
      link: "/admin/artists",
      color: "text-blue-500",
    },
    {
      title: "Artworks",
      description: "Add and edit artwork entries and stories",
      icon: Image,
      link: "/admin/artworks",
      color: "text-purple-500",
    },
    {
      title: "Collections",
      description: "Curate exhibitions and collections",
      icon: BookOpen,
      link: "/admin/collections",
      color: "text-green-500",
    },
    {
      title: "Journal",
      description: "Write and publish journal entries",
      icon: PlusCircle,
      link: "/admin/journal",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your gallery's content and exhibitions
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.link}
                to={section.link}
                className="group bg-secondary/30 border border-border p-8 rounded-lg hover:bg-secondary/50 transition-all hover-lift"
              >
                <Icon className={`w-12 h-12 mb-4 ${section.color}`} />
                <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {section.description}
                </p>
                <div className="flex items-center text-sm text-accent">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Manage {section.title}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-secondary/20 border border-border rounded-lg">
          <h3 className="font-display text-xl mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link to="/admin/artists/new">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Artist
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/artworks/new">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Artwork
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/collections/new">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Collection
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-lg">
          <h3 className="font-display text-xl mb-2">Admin Access</h3>
          <p className="text-sm text-muted-foreground">
            You're logged in as an administrator. Only you can access this dashboard and manage content.
            All changes will be visible on the public website immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
