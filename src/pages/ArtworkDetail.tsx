import { useParams, Link, useNavigate } from "react-router-dom";
import { useArtwork } from "@/hooks/useArtworks";
import { useArtist } from "@/hooks/useArtists";
import { useArtworks } from "@/hooks/useArtworks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: artwork, isLoading: artworkLoading } = useArtwork(id || "");
  const { data: artist } = useArtist(artwork?.artist_id || "");
  const { data: allArtworks } = useArtworks();

  useEffect(() => {
    if (artwork?.id) {
      supabase.from("artwork_views").insert({
        artwork_id: artwork.id,
        user_id: user?.id || null,
      });
    }
  }, [artwork?.id, user?.id]);

  if (artworkLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading artwork...</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Artwork Not Found</h1>
          <Button onClick={() => navigate("/collections")} variant="outline">
            Browse Collections
          </Button>
        </div>
      </div>
    );
  }

  const moreFromArtist = allArtworks?.filter(
    (a) => a.artist_id === artwork.artist_id && a.id !== artwork.id
  ) || [];

  return (
    <div className="min-h-screen pt-24">
      {/* Back Button */}
      <div className="container mx-auto px-6 mb-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </Button>
      </div>

      {/* Fullscreen Image */}
      <div className="container mx-auto px-6 mb-16">
        <div className="aspect-[16/10] bg-secondary overflow-hidden rounded-lg">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full h-full object-cover animate-fade-in"
          />
        </div>
      </div>

      {/* Artwork Details */}
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
              {artwork.medium}
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4 animate-fade-in-up">
              {artwork.title}
            </h1>
            <Link
              to={`/artists/${artwork.artist_id}`}
              className="text-xl text-muted-foreground hover:text-accent transition-colors mb-8 inline-block"
            >
              {artist?.name || "Unknown Artist"}
            </Link>

            <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div>
                <span className="block font-semibold text-foreground mb-1">Edition</span>
                {artwork.edition}
              </div>
              <div>
                <span className="block font-semibold text-foreground mb-1">Year</span>
                {artwork.year}
              </div>
              {artwork.price && (
                <div>
                  <span className="block font-semibold text-foreground mb-1">Price</span>
                  {artwork.price}
                </div>
              )}
            </div>

            <p className="text-foreground/80 leading-relaxed text-lg mb-8">
              {artwork.description}
            </p>

            <div className="flex gap-4">
              <FavoriteButton artworkId={artwork.id} variant="default" />
              <Button size="lg">
                Collect
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Marketplace
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-6">The Story</h2>
            <div className="prose prose-invert max-w-none mb-8">
              {artwork.story.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-foreground/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {artwork.audio_url && (
              <AudioPlayer
                audioUrl={artwork.audio_url}
                title={artwork.audio_title || `Story of ${artwork.title}`}
                artist={artist?.name || "Unknown Artist"}
                className="mb-8"
              />
            )}

            {artist && (
              <div className="p-6 bg-secondary/30 rounded-lg border border-border">
                <h3 className="font-display text-xl mb-4">About the Artist</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={artist.image_url}
                    alt={artist.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <Link
                      to={`/artists/${artist.id}`}
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      {artist.name}
                    </Link>
                    {artist.location && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {artist.location}
                      </p>
                    )}
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {artist.bio.slice(0, 150)}...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More from Artist */}
      {moreFromArtist.length > 0 && artist && (
        <div className="container mx-auto px-6 pb-24">
          <h2 className="font-display text-4xl mb-12">More from {artist.name}</h2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {moreFromArtist.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link
                    to={`/artwork/${item.id}`}
                    className="group block"
                  >
                    <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.year} • Edition of {item.edition}
                    </p>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
