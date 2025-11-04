import { useState } from "react";
import { Artist } from "@/hooks/useArtists";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface ArtistEditDialogProps {
  artist: Artist;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Artist>) => void;
  isLoading: boolean;
}

export function ArtistEditDialog({ artist, open, onOpenChange, onSave, isLoading }: ArtistEditDialogProps) {
  const [formData, setFormData] = useState({
    name: artist.name,
    bio: artist.bio,
    short_bio: artist.short_bio || "",
    location: artist.location || "",
    specialization: artist.specialization || "",
    quote: artist.quote || "",
    instagram: artist.instagram || "",
    twitter: artist.twitter || "",
    website: artist.website || "",
    image_url: artist.image_url,
    cover_image_url: artist.cover_image_url || "",
    audio_url: artist.audio_url || "",
    audio_title: artist.audio_title || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Artist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="short_bio">Short Bio</Label>
            <Textarea
              id="short_bio"
              value={formData.short_bio}
              onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
              rows={3}
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
            />
          </div>

          <div>
            <Label htmlFor="quote">Quote</Label>
            <Input
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            />
          </div>

          <FileUpload
            bucket="artists"
            currentUrl={formData.image_url}
            onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
            accept="image/*"
            label="Profile Image *"
          />

          <FileUpload
            bucket="artists"
            currentUrl={formData.cover_image_url}
            onUploadComplete={(url) => setFormData({ ...formData, cover_image_url: url })}
            accept="image/*"
            label="Cover Image"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="audio_title">Audio Title</Label>
              <Input
                id="audio_title"
                value={formData.audio_title}
                onChange={(e) => setFormData({ ...formData, audio_title: e.target.value })}
              />
            </div>
          </div>

          <FileUpload
            bucket="artists"
            currentUrl={formData.audio_url}
            onUploadComplete={(url) => setFormData({ ...formData, audio_url: url })}
            accept="audio/*"
            label="Audio File"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
