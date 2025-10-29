import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 text-background animate-fade-in-up">
            Bridging Artists and Collectors
          </h1>
          <p className="text-xl md:text-2xl text-background/90 mb-8 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Through meaningful digital art
          </p>
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button asChild variant="outline" size="lg" className="bg-background/10 backdrop-blur-sm border-background/40 text-background hover:bg-background hover:text-foreground">
              <Link to="/collections">
                Explore Collections <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">Featured Collections</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Curated selections of limited-edition digital artworks from leading and emerging artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { image: artwork1, title: "Geometric Harmony", artist: "Elena Voss", edition: "Edition of 25" },
              { image: artwork2, title: "Liquid Gold", artist: "Marcus Chen", edition: "Edition of 15" },
              { image: artwork3, title: "Minimal Forms", artist: "Sofia Laurent", edition: "Edition of 20" },
            ].map((item, index) => (
              <Link
                key={index}
                to="/collections"
                className="group hover-lift"
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
                  {item.artist} • {item.edition}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            Discover Your Next Collection
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join collectors worldwide in building meaningful digital art collections.
          </p>
          <Button asChild variant="outline" size="lg" className="bg-primary-foreground/10 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Link to="/artists">
              Meet the Artists <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
