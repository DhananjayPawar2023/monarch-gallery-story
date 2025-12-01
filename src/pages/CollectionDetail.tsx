import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import { SEO } from "@/components/SEO";

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: collection, isLoading } = useQuery({
    queryKey: ["collection", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: artworks } = useQuery({
    queryKey: ["collection-artworks", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("artworks")
        .select("*, artists(name)")
        .eq("collection_id", id);

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading collection...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Collection Not Found</h1>
          <Button onClick={() => navigate("/collections")} variant="outline">
            Browse Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${collection.name} - Art Collection`}
        description={collection.description}
      />
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-6 mb-8">
          <Button onClick={() => navigate(-1)} variant="ghost" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>
        </div>

        {/* Collection Header */}
        <div className="container mx-auto px-6 mb-16">
          {collection.cover_image_url && (
            <div className="aspect-[21/9] bg-secondary overflow-hidden rounded-lg mb-8">
              <img
                src={collection.cover_image_url}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h1 className="font-display text-5xl md:text-7xl mb-6">
            {collection.name}
          </h1>
          <p className="text-foreground/80 text-xl mb-8 max-w-3xl leading-relaxed">
            {collection.description}
          </p>
          
          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="font-display text-3xl mb-4">Curator's Statement</h2>
            <p className="text-foreground/80 leading-relaxed">
              {collection.curator_statement}
            </p>
          </div>

          {collection.audio_url && (
            <AudioPlayer
              audioUrl={collection.audio_url}
              title={collection.audio_title || `About ${collection.name}`}
              artist="Curator"
            />
          )}
        </div>

        {/* Artworks in Collection */}
        {artworks && artworks.length > 0 && (
          <div className="container mx-auto px-6 pb-24">
            <h2 className="font-display text-4xl mb-12">Artworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork) => (
                <Link
                  key={artwork.id}
                  to={`/artwork/${artwork.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {artwork.artists?.name} • {artwork.year}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionDetail;