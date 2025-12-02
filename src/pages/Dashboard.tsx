import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useFavorites } from "@/hooks/useFavorites";
import { useNotifications } from "@/hooks/useNotifications";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Bell, User, Settings } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useProfile(user?.id);
  const { data: favorites } = useFavorites(user?.id);
  const { data: notifications } = useNotifications(user?.id);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const unreadCount = notifications?.filter((n) => !n.read).length || 0;

  return (
    <>
      <SEO title="Dashboard" />
      <ScrollToTop />
      <div className="min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              Welcome back, {profile?.display_name || user.email?.split("@")[0]}
            </h1>
            <p className="text-muted-foreground">
              Manage your collection, favorites, and profile
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{favorites?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{unreadCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge>Member</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="mt-8">
              {favorites && favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {favorites.map((fav: any) => (
                    <Link
                      key={fav.id}
                      to={`/artworks/${fav.artwork_id}`}
                      className="group"
                    >
                      <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                        <img
                          src={fav.artworks.image_url}
                          alt={fav.artworks.title}
                          className="w-full h-full object-cover hover-scale"
                        />
                      </div>
                      <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                        {fav.artworks.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {fav.artworks.year}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    No favorites yet. Start exploring artworks!
                  </p>
                  <Button asChild>
                    <Link to="/collections">Browse Collection</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="mt-8">
              {notifications && notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notif: any) => (
                    <Card key={notif.id} className={notif.read ? "opacity-60" : ""}>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          {notif.title}
                          {!notif.read && <Badge variant="default">New</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Profile Settings
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/profile/edit">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Display Name</p>
                    <p className="font-medium">{profile?.display_name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile?.location || "Not set"}</p>
                  </div>
                  {profile?.bio && (
                    <div>
                      <p className="text-sm text-muted-foreground">Bio</p>
                      <p className="font-medium">{profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
