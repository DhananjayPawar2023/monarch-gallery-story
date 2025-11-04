import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAllJournalEntries, useCreateJournalEntry, useUpdateJournalEntry, useDeleteJournalEntry } from "@/hooks/useJournal";
import { Pencil, Trash2, Plus } from "lucide-react";
import { FileUpload } from "@/components/admin/FileUpload";

const JournalManager = () => {
  const { isAdmin, loading, user } = useAuth();
  const { toast } = useToast();
  const { data: entries, isLoading } = useAllJournalEntries();
  const createEntry = useCreateJournalEntry();
  const updateEntry = useUpdateJournalEntry();
  const deleteEntry = useDeleteJournalEntry();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Essay" as "Essay" | "Interview" | "Feature",
    author: "Monarch Editorial",
    published_date: new Date().toISOString().split('T')[0],
    read_time: "",
    status: "draft" as "draft" | "published",
    featured: false,
    cover_image_url: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEntry.mutateAsync({ id: editingId, ...formData });
        toast({
          title: "Journal entry updated",
          description: "The entry has been updated successfully.",
        });
      } else {
        await createEntry.mutateAsync({
          ...formData,
          created_by: user!.id,
        });
        toast({
          title: "Journal entry created",
          description: "The new entry has been added successfully.",
        });
      }
      
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save journal entry",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (entry: any) => {
    setEditingId(entry.id);
    setFormData({
      title: entry.title,
      slug: entry.slug,
      excerpt: entry.excerpt,
      content: entry.content,
      category: entry.category,
      author: entry.author,
      published_date: entry.published_date,
      read_time: entry.read_time,
      status: entry.status,
      featured: entry.featured,
      cover_image_url: entry.cover_image_url || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this journal entry?")) return;

    try {
      await deleteEntry.mutateAsync(id);
      toast({
        title: "Entry deleted",
        description: "The journal entry has been removed.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete entry",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Essay",
      author: "Monarch Editorial",
      published_date: new Date().toISOString().split('T')[0],
      read_time: "",
      status: "draft",
      featured: false,
      cover_image_url: "",
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === "title") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-display text-5xl md:text-6xl mb-12">
          Journal Manager
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-secondary/30 border border-border p-8 rounded-lg mb-12">
          <h2 className="font-display text-2xl mb-6">
            {editingId ? "Edit Journal Entry" : "Add New Journal Entry"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="slug">Slug (URL-friendly)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                required
                rows={3}
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="content">Full Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                required
                rows={12}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Essay">Essay</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange("author", e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="published_date">Published Date</Label>
              <Input
                id="published_date"
                type="date"
                value={formData.published_date}
                onChange={(e) => handleChange("published_date", e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="read_time">Read Time (e.g., "8 min read")</Label>
              <Input
                id="read_time"
                value={formData.read_time}
                onChange={(e) => handleChange("read_time", e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor="featured">Featured Entry</Label>
            </div>

            <div className="md:col-span-2">
              <FileUpload
                bucket="artworks"
                currentUrl={formData.cover_image_url}
                onUploadComplete={(url) => handleChange("cover_image_url", url)}
                accept="image/*"
                label="Cover Image"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" disabled={createEntry.isPending || updateEntry.isPending}>
              {editingId ? "Update Entry" : "Create Entry"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </div>
        </form>

        {/* Entries List */}
        <div>
          <h2 className="font-display text-3xl mb-6">Existing Entries</h2>
          {isLoading ? (
            <p className="text-muted-foreground">Loading entries...</p>
          ) : !entries || entries.length === 0 ? (
            <p className="text-muted-foreground">No journal entries yet.</p>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-secondary/30 border border-border p-6 rounded-lg flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-xl">{entry.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        entry.status === 'published' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {entry.status}
                      </span>
                      {entry.featured && (
                        <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {entry.category} • {entry.author} • {entry.published_date} • {entry.read_time}
                    </p>
                    <p className="text-sm text-foreground/70">{entry.excerpt.slice(0, 150)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(entry)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalManager;
