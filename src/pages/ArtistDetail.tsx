import { useParams, Link, useNavigate } from "react-router-dom";
import { useArtist } from "@/hooks/useArtists";
import { useArtworks } from "@/hooks/useArtworks";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, Twitter, Globe } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import { FollowArtist } from "@/components/FollowArtist";
import { SocialShare } from "@/components/SocialShare";

const ArtistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: artist, isLoading: artistLoading } = useArtist(id || "");
  const { data: allArtworks } = useArtworks();

  if (artistLoading) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <p className="text-muted-foreground">Loading artist...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen pt-24 px-6 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Artist Not Found</h1>
          <Button onClick={() => navigate("/artists")} variant="outline">
            Browse Artists
          </Button>
        </div>
      </div>
    );
  }

  const artistArtworks = allArtworks?.filter(a => a.artist_id === artist.id) || [];

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

      {/* Artist Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-secondary overflow-hidden rounded-lg">
            <img
              src={artist.image_url}
              alt={artist.name}
              className="w-full h-full object-cover animate-fade-in hover-lift"
            />
          </div>

          <div>
            {artist.specialization && (
              <div className="inline-block px-4 py-1 bg-accent/10 text-accent text-xs uppercase tracking-wider mb-4">
                {artist.specialization}
              </div>
            )}
            <h1 className="font-display text-5xl md:text-7xl mb-4 animate-fade-in-up">
              {artist.name}
            </h1>
            {artist.location && (
              <p className="text-muted-foreground text-lg mb-6">
                {artist.location}
              </p>
            )}
            {artist.short_bio && (
              <p className="text-foreground/80 leading-relaxed text-xl mb-8">
                {artist.short_bio}
              </p>
            )}
            
            {artist.quote && (
              <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/70 mb-8 leading-relaxed text-lg">
                "{artist.quote}"
              </blockquote>
            )}

            <div className="flex flex-wrap gap-4">
              <FollowArtist artistId={artist.id} artistName={artist.name} />
              <SocialShare 
                url={window.location.href}
                title={`${artist.name} - Artist Profile`}
                description={artist.short_bio || artist.bio}
              />
              {artist.instagram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </a>
                </Button>
              )}
              {artist.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={artist.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              )}
              {artist.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={artist.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artist Bio */}
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl mb-8">About the Artist</h2>
          <div className="prose prose-invert max-w-none">
            {artist.bio.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-foreground/80 leading-relaxed text-lg mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {artist.audio_url && (
            <div className="mt-12">
              <AudioPlayer
                audioUrl={artist.audio_url}
                title={artist.audio_title || `Interview with ${artist.name}`}
                artist={artist.name}
              />
            </div>
          )}
        </div>
      </div>

      {/* Artist's Artworks */}
      {artistArtworks.length > 0 && (
        <div className="container mx-auto px-6 pb-24">
          <h2 className="font-display text-4xl mb-12">Artworks by {artist.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistArtworks.map((artwork) => (
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
                  {artwork.year} • {artwork.medium}
                </p>
                {artwork.price && (
                  <p className="text-accent font-semibold mt-2">
                    {artwork.price}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;
