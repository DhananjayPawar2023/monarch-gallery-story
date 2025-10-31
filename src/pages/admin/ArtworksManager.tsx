import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";
import { useAllCollections } from "@/hooks/useCollections";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const ArtworksManager = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { data: artworks } = useArtworks();
  const { data: artists } = useArtists();
  const { data: collections } = useAllCollections();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    artist_id: "",
    collection_id: "",
    description: "",
    story: "",
    medium: "",
    year: new Date().getFullYear(),
    edition: "",
    price: "",
    featured: false,
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
        const { error: uploadError } = await supabase.storage
          .from("artworks")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("artworks")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error } = await supabase.from("artworks").insert([
        {
          ...formData,
          image_url: imageUrl,
          collection_id: formData.collection_id || null,
          created_by: user!.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Artwork added successfully",
        description: "The artwork has been added to the collection.",
      });

      setFormData({
        title: "",
        artist_id: "",
        collection_id: "",
        description: "",
        story: "",
        medium: "",
        year: new Date().getFullYear(),
        edition: "",
        price: "",
        featured: false,
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

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <h1 className="font-display text-5xl mb-8">Manage Artworks</h1>

        <div className="bg-secondary/30 border border-border p-8 rounded-lg mb-12">
          <h2 className="font-display text-2xl mb-6">Add New Artwork</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Artwork Image *</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imageFile && <Upload className="w-4 h-4 text-accent" />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="artist_id">Artist *</Label>
                <Select
                  value={formData.artist_id}
                  onValueChange={(value) => setFormData({ ...formData, artist_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists?.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="collection_id">Collection (Optional)</Label>
                <Select
                  value={formData.collection_id}
                  onValueChange={(value) => setFormData({ ...formData, collection_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections?.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="story">Story Behind the Artwork *</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="medium">Medium *</Label>
                <Input
                  id="medium"
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  placeholder="Digital, 3D, etc."
                  required
                />
              </div>

              <div>
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edition">Edition *</Label>
                <Input
                  id="edition"
                  value={formData.edition}
                  onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                  placeholder="1/1, 10, etc."
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="price">Price (Optional)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.5 ETH"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked as boolean })
                }
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Feature this artwork on the homepage
              </Label>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Artwork
            </Button>
          </form>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-6">Existing Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artworks?.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-secondary/20 border border-border p-4 rounded-lg"
              >
                <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-lg mb-1">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground">{artwork.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworksManager;
