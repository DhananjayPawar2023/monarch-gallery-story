import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAllCollections, useUpdateCollection, useDeleteCollection } from "@/hooks/useCollections";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CollectionEditDialog } from "@/components/admin/CollectionEditDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const CollectionsManager = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { data: collections } = useAllCollections();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any>(null);
  const [deletingCollection, setDeletingCollection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    curator_statement: "",
    release_date: new Date().toISOString().split("T")[0],
    status: "draft" as "draft" | "published",
  });

  if (!isAdmin) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("collections").insert([
        {
          ...formData,
          created_by: user!.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Collection added successfully",
        description: "The collection has been created.",
      });

      setFormData({
        name: "",
        description: "",
        curator_statement: "",
        release_date: new Date().toISOString().split("T")[0],
        status: "draft",
      });
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
      await updateCollection.mutateAsync({ id: editingCollection.id, updates });
      toast({
        title: "Collection updated",
        description: "The collection has been updated successfully.",
      });
      setEditingCollection(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingCollection) return;
    
    try {
      await deleteCollection.mutateAsync(deletingCollection);
      toast({
        title: "Collection deleted",
        description: "The collection has been removed.",
      });
      setDeletingCollection(null);
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

        <h1 className="font-display text-5xl mb-8">Manage Collections</h1>

        <div className="bg-secondary/30 border border-border p-8 rounded-lg mb-12">
          <h2 className="font-display text-2xl mb-6">Add New Collection</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Collection Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
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
              <Label htmlFor="curator_statement">Curator's Statement *</Label>
              <Textarea
                id="curator_statement"
                value={formData.curator_statement}
                onChange={(e) =>
                  setFormData({ ...formData, curator_statement: e.target.value })
                }
                rows={6}
                required
                placeholder="Share your thoughts on this collection..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="release_date">Release Date *</Label>
                <Input
                  id="release_date"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) =>
                    setFormData({ ...formData, release_date: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Collection
            </Button>
          </form>
        </div>

        <div>
          <h2 className="font-display text-2xl mb-6">Existing Collections</h2>
          <div className="space-y-4">
            {collections?.map((collection) => (
              <div
                key={collection.id}
                className="bg-secondary/20 border border-border p-6 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display text-xl mb-2">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Release: {new Date(collection.release_date).toLocaleDateString()}</span>
                      <span
                        className={
                          collection.status === "published"
                            ? "text-accent"
                            : "text-muted-foreground"
                        }
                      >
                        {collection.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingCollection(collection)}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => setDeletingCollection(collection.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingCollection && (
        <CollectionEditDialog
          collection={editingCollection}
          open={!!editingCollection}
          onOpenChange={(open) => !open && setEditingCollection(null)}
          onSave={handleUpdate}
          isLoading={updateCollection.isPending}
        />
      )}

      <AlertDialog open={!!deletingCollection} onOpenChange={(open) => !open && setDeletingCollection(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this collection. This action cannot be undone.
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

export default CollectionsManager;
