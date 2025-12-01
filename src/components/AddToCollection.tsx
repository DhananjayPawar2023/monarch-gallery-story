import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FolderPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserCollections, useAddToCollection, useCreateUserCollection } from "@/hooks/useUserCollections";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddToCollectionProps {
  artworkId: string;
}

export const AddToCollection = ({ artworkId }: AddToCollectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: collections } = useUserCollections(user?.id);
  const { mutate: addToCollection } = useAddToCollection();
  const { mutate: createCollection } = useCreateUserCollection();
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!user) {
    return (
      <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
        <Plus className="w-4 h-4 mr-2" />
        Add to Collection
      </Button>
    );
  }

  const handleAddToCollection = (collectionId: string) => {
    addToCollection({ collectionId, artworkId });
  };

  const handleCreateAndAdd = () => {
    if (!newCollectionName.trim() || !user) return;

    createCollection(
      {
        userId: user.id,
        name: newCollectionName,
      },
      {
        onSuccess: (data) => {
          addToCollection({ collectionId: data.id, artworkId });
          setNewCollectionName("");
          setIsCreating(false);
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add to Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Collection</DialogTitle>
          <DialogDescription>
            Choose a collection or create a new one
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!isCreating ? (
            <>
              <div className="space-y-2">
                {collections && collections.length > 0 ? (
                  collections.map((collection) => (
                    <Button
                      key={collection.id}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleAddToCollection(collection.id)}
                    >
                      {collection.name} ({collection.collection_artworks?.length || 0})
                    </Button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No collections yet
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsCreating(true)}
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                Create New Collection
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="collection-name">Collection Name</Label>
                <Input
                  id="collection-name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="My Favorite Artworks"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateAndAdd} disabled={!newCollectionName.trim()}>
                  Create & Add
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};