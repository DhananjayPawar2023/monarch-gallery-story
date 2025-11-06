import { useState } from "react";
import { useArtworks } from "@/hooks/useArtworks";
import { useArtists } from "@/hooks/useArtists";
import { SEO } from "@/components/SEO";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Compare = () => {
  const { data: artworks } = useArtworks();
  const { data: artists } = useArtists();
  const [artwork1Id, setArtwork1Id] = useState<string>("");
  const [artwork2Id, setArtwork2Id] = useState<string>("");

  const artwork1 = artworks?.find((a) => a.id === artwork1Id);
  const artwork2 = artworks?.find((a) => a.id === artwork2Id);
  const artist1 = artists?.find((a) => a.id === artwork1?.artist_id);
  const artist2 = artists?.find((a) => a.id === artwork2?.artist_id);

  return (
    <>
      <SEO
        title="Compare Artworks"
        description="Compare artworks side by side—explore details, techniques, and stories to deepen your understanding of Monarch's collection."
      />
      <ScrollToTop />
      <div className="min-h-screen">
        {/* Header */}
        <section className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-3xl mx-auto text-center scroll-reveal">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Tools
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-[1.1]">
              Compare Artworks
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-[1.8]">
              Explore artworks side by side—compare details, techniques, and stories to discover new perspectives and deepen your understanding.
            </p>
          </div>
        </section>

        {/* Selectors */}
        <section className="container mx-auto px-6 pb-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 scroll-reveal">
            <div>
              <label className="block text-sm font-medium mb-3">Select First Artwork</label>
              <Select value={artwork1Id} onValueChange={setArtwork1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an artwork..." />
                </SelectTrigger>
                <SelectContent>
                  {artworks?.map((artwork) => {
                    const artist = artists?.find((a) => a.id === artwork.artist_id);
                    return (
                      <SelectItem key={artwork.id} value={artwork.id}>
                        {artwork.title} - {artist?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Select Second Artwork</label>
              <Select value={artwork2Id} onValueChange={setArtwork2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an artwork..." />
                </SelectTrigger>
                <SelectContent>
                  {artworks?.map((artwork) => {
                    const artist = artists?.find((a) => a.id === artwork.artist_id);
                    return (
                      <SelectItem key={artwork.id} value={artwork.id}>
                        {artwork.title} - {artist?.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Comparison */}
        {artwork1 && artwork2 && (
          <section className="container mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
              {/* Artwork 1 */}
              <Card className="scroll-reveal">
                <div className="aspect-square bg-secondary overflow-hidden">
                  <img
                    src={artwork1.image_url}
                    alt={artwork1.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Link
                      to={`/artwork/${artwork1.id}`}
                      className="font-display text-2xl md:text-3xl hover:text-accent transition-colors"
                    >
                      {artwork1.title}
                    </Link>
                    <Link
                      to={`/artists/${artwork1.artist_id}`}
                      className="block text-muted-foreground mt-2 hover:text-accent transition-colors"
                    >
                      {artist1?.name}
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year</span>
                      <span>{artwork1.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium</span>
                      <span>{artwork1.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Edition</span>
                      <span>{artwork1.edition}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-foreground/80 leading-[1.7]">
                      {artwork1.description}
                    </p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/artwork/${artwork1.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Artwork 2 */}
              <Card className="scroll-reveal" style={{ animationDelay: "0.1s" }}>
                <div className="aspect-square bg-secondary overflow-hidden">
                  <img
                    src={artwork2.image_url}
                    alt={artwork2.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Link
                      to={`/artwork/${artwork2.id}`}
                      className="font-display text-2xl md:text-3xl hover:text-accent transition-colors"
                    >
                      {artwork2.title}
                    </Link>
                    <Link
                      to={`/artists/${artwork2.artist_id}`}
                      className="block text-muted-foreground mt-2 hover:text-accent transition-colors"
                    >
                      {artist2?.name}
                    </Link>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year</span>
                      <span>{artwork2.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium</span>
                      <span>{artwork2.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Edition</span>
                      <span>{artwork2.edition}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-foreground/80 leading-[1.7]">
                      {artwork2.description}
                    </p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to={`/artwork/${artwork2.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Empty State */}
        {(!artwork1 || !artwork2) && (
          <section className="container mx-auto px-6 pb-24">
            <div className="max-w-2xl mx-auto text-center py-20">
              <p className="text-muted-foreground text-lg">
                Select two artworks above to begin comparing them side by side.
              </p>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Compare;
