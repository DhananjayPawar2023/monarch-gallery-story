import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Collections = () => {
  const collections = [
    {
      id: 1,
      image: artwork1,
      title: "Geometric Harmony",
      artist: "Elena Voss",
      year: "2024",
      edition: "25",
      description: "An exploration of balance through minimal geometric forms and soft gradients.",
    },
    {
      id: 2,
      image: artwork2,
      title: "Liquid Gold",
      artist: "Marcus Chen",
      year: "2024",
      edition: "15",
      description: "Flowing forms that capture the essence of transformation and fluidity.",
    },
    {
      id: 3,
      image: artwork3,
      title: "Minimal Forms",
      artist: "Sofia Laurent",
      year: "2024",
      edition: "20",
      description: "Architectural elegance meets digital craftsmanship in this refined series.",
    },
    {
      id: 4,
      image: artwork1,
      title: "Digital Serenity",
      artist: "Elena Voss",
      year: "2024",
      edition: "30",
      description: "A meditation on space, light, and contemporary digital aesthetics.",
    },
    {
      id: 5,
      image: artwork2,
      title: "Abstract Momentum",
      artist: "Marcus Chen",
      year: "2024",
      edition: "18",
      description: "Dynamic energy captured in elegant digital strokes.",
    },
    {
      id: 6,
      image: artwork3,
      title: "Form & Function",
      artist: "Sofia Laurent",
      year: "2024",
      edition: "22",
      description: "Where architectural precision meets artistic expression.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
            Collections
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Curated exhibitions showcasing the finest limited-edition digital artworks. Each piece tells a story, 
            bridging the gap between traditional fine art and contemporary digital creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-secondary mb-6 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl mb-2 group-hover:text-accent transition-colors">
                  {collection.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {collection.artist} • {collection.year} • Edition of {collection.edition}
                </p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
