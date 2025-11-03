import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useArtists, useUpdateArtist, useDeleteArtist } from "@/hooks/useArtists";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ArtistEditDialog } from "@/components/admin/ArtistEditDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const ArtistsManager = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { data: artists } = useArtists();
  const updateArtist = useUpdateArtist();
  const deleteArtist = useDeleteArtist();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingArtist, setEditingArtist] = useState<any>(null);
  const [deletingArtist, setDeletingArtist] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    short_bio: "",
    location: "",
    specialization: "",
    quote: "",
    instagram: "",
    twitter: "",
    website: "",
  });

  if (!isAdmin) {
    navigate("/auth");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data } = await supabase.storage
          .from("artists")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("artists")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("artists").insert([
        {
          ...formData,
          image_url: imageUrl,
          created_by: user!.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Artist added successfully",
        description: "The artist has been added to the gallery.",
      });

      setFormData({
        name: "",
        bio: "",
        short_bio: "",
        location: "",
        specialization: "",
        quote: "",
        instagram: "",
        twitter: "",
        website: "",
      });
      setImageFile(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (updates: any) => {
    try {
      await updateArtist.mutateAsync({ id: editingArtist.id, updates });
      toast({
        title: "Artist updated",
        description: "The artist has been updated successfully.",
      });
      setEditingArtist(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingArtist) return;
    
    try {
      await deleteArtist.mutateAsync(deletingArtist);
      toast({
        title: "Artist deleted",
        description: "The artist has been removed.",
      });
      setDeletingArtist(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <h1 className="font-display text-5xl mb-8">Manage Artists</h1>

        <div className="bg-secondary/30 border border-border p-8 rounded-lg mb-12">
          <h2 className="font-display text-2xl mb-6">Add New Artist</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Artist Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Profile Image *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imageFile && (
                  <Upload className="w-4 h-4 text-accent" />
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="Digital Artist, 3D Designer, etc."
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="New York, USA"
              />
            </div>

            <div>
              <Label htmlFor="short_bio">Short Bio</Label>
              <Textarea
                id="short_bio"
                value={formData.short_bio}
                onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                rows={3}
                placeholder="A brief introduction..."
              />
            </div>

            <div>
              <Label htmlFor="bio">Full Biography *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={6}
                required
                placeholder="Artist's complete biography..."
              />
            </div>

            <div>
              <Label htmlFor="quote">Quote</Label>
              <Input
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="A memorable quote from the artist"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Artist
            </Button>
          </form>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-6">Existing Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artists?.map((artist) => (
              <div
                key={artist.id}
                className="bg-secondary/20 border border-border p-6 rounded-lg"
              >
                <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-xl mb-2">{artist.name}</h3>
                {artist.location && (
                  <p className="text-sm text-muted-foreground mb-4">{artist.location}</p>
                )}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setEditingArtist(artist)}
                    className="flex-1"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setDeletingArtist(artist.id)}
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingArtist && (
        <ArtistEditDialog
          artist={editingArtist}
          open={!!editingArtist}
          onOpenChange={(open) => !open && setEditingArtist(null)}
          onSave={handleUpdate}
          isLoading={updateArtist.isPending}
        />
      )}

      <AlertDialog open={!!deletingArtist} onOpenChange={(open) => !open && setDeletingArtist(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this artist. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArtistsManager;
