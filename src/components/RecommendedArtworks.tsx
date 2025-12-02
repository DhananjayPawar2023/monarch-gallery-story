import { Link } from "react-router-dom";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useAuth } from "@/contexts/AuthContext";
import { useArtworks } from "@/hooks/useArtworks";
import { Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const RecommendedArtworks = () => {
  const { user } = useAuth();
  const { data: recommendations } = useRecommendations(user?.id);
  const { data: allArtworks } = useArtworks();

  if (!recommendations || recommendations.length === 0) return null;

  // Get full artwork details
  const recommendedArtworks = recommendations
    .map((rec) => allArtworks?.find((art) => art.id === rec.id))
    .filter(Boolean);

  if (recommendedArtworks.length === 0) return null;

  return (
    <div className="bg-secondary/30 py-16 px-6">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="font-display text-3xl">Recommended for You</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendedArtworks.map((artwork: any) => (
              <CarouselItem key={artwork.id} className="md:basis-1/2 lg:basis-1/3">
                <Link to={`/artwork/${artwork.id}`} className="group block">
                  <div className="aspect-square bg-secondary mb-4 overflow-hidden rounded-lg">
                    <img
                      src={artwork.image_url}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {artwork.year} • {artwork.medium}
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
