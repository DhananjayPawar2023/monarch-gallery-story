import { useParams, Link, useNavigate } from "react-router-dom";
import { getArtworkById, getArtworksByArtist } from "@/data/artworks";
import { getArtistById } from "@/data/artists";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
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
  const artwork = id ? getArtworkById(id) : undefined;

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

  const artist = getArtistById(artwork.artistId);
  const moreFromArtist = getArtworksByArtist(artwork.artistId).filter(
    (a) => a.id !== artwork.id
  );

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
            src={artwork.image}
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
              to={`/artists#${artwork.artistId}`}
              className="text-xl text-muted-foreground hover:text-accent transition-colors mb-8 inline-block"
            >
              {artwork.artist}
            </Link>

            <div className="flex items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div>
                <span className="block font-semibold text-foreground mb-1">Edition</span>
                {artwork.edition} pieces
              </div>
              <div>
                <span className="block font-semibold text-foreground mb-1">Year</span>
                {artwork.year}
              </div>
              <div>
                <span className="block font-semibold text-foreground mb-1">Price</span>
                {artwork.price || "Sold Out"}
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed text-lg mb-8">
              {artwork.description}
            </p>

            <div className="flex gap-4">
              <Button size="lg" disabled={!artwork.available}>
                {artwork.available ? "Collect" : "Sold Out"}
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Marketplace
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl mb-6">The Story</h2>
            <p className="text-foreground/80 leading-relaxed mb-8">
              {artwork.story}
            </p>

            {artwork.audioUrl && (
              <AudioPlayer
                audioUrl={artwork.audioUrl}
                title={`Story of ${artwork.title}`}
                artist={artwork.artist}
                className="mb-8"
              />
            )}

            {artist && (
              <div className="p-6 bg-secondary/30 rounded-lg border border-border">
                <h3 className="font-display text-xl mb-4">About the Artist</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <Link
                      to={`/artists#${artist.id}`}
                      className="font-semibold hover:text-accent transition-colors"
                    >
                      {artist.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {artist.location}
                    </p>
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
      {moreFromArtist.length > 0 && (
        <div className="container mx-auto px-6 pb-24">
          <h2 className="font-display text-4xl mb-12">More from {artwork.artist}</h2>
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
                    <div className="aspect-square bg-secondary mb-4 overflow-hidden">
                      <img
                        src={item.image}
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
