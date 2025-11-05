import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <SEO 
        title="About Monarch - Curated Digital Art Platform"
        description="Monarch bridges digital artists and collectors through curated exhibitions, thoughtful storytelling, and an unwavering commitment to artistic excellence in contemporary digital art."
      />
      <main className="min-h-screen pt-28 px-6 pb-20">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <div className="inline-block px-5 py-2 bg-accent/10 text-accent text-xs uppercase tracking-[0.2em] mb-8 rounded animate-fade-in">
              Our Story
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-10 animate-fade-in-up leading-[1.1]">
              About Monarch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-[1.7] animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Bridging digital artistry and human emotion through thoughtfully curated exhibitions
            </p>
          </div>

        <div className="space-y-10 text-lg leading-[1.8]">
          <p className="animate-fade-in-up text-lg md:text-xl" style={{ animationDelay: "0.2s" }}>
            <span className="font-display text-4xl md:text-5xl text-accent float-left mr-4 leading-[0.8]">M</span>onarch was founded on the belief 
            that digital art deserves the same reverence and presentation as traditional fine art. We bridge
            the gap between artists and collectors through curated exhibitions, thoughtful storytelling, and 
            an unwavering commitment to artistic excellence.
          </p>

          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Our platform represents a new paradigm in art curation—one that honors the craftsmanship and 
            vision of digital artists while providing collectors with an elevated experience that matches 
            the sophistication of the work itself.
          </p>

          <div className="pt-16 pb-10 animate-fade-in-up bg-secondary/30 p-10 md:p-14 rounded-lg" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Our Vision</h2>
            <p className="text-muted-foreground text-lg leading-[1.8]">
              We envision a future where digital art is recognized not just as a new medium, but as a 
              legitimate and celebrated form of artistic expression. Through careful curation and immersive 
              presentation, we're building a platform that elevates both artists and collectors.
            </p>
          </div>

          <div className="pt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-display text-3xl md:text-4xl mb-10">Our Approach</h2>
            <ul className="space-y-6 text-muted-foreground">
              <li className="pl-8 border-l-4 border-accent">
                <strong className="text-foreground text-lg block mb-2">Curatorial Excellence</strong>
                Every artwork is carefully selected for its artistic merit, technical execution, and cultural relevance.
              </li>
              <li className="pl-8 border-l-4 border-accent">
                <strong className="text-foreground text-lg block mb-2">Artist-First</strong>
                We prioritize the artist's vision and provide a platform that respects their creative autonomy.
              </li>
              <li className="pl-8 border-l-4 border-accent">
                <strong className="text-foreground text-lg block mb-2">Collector Experience</strong>
                From discovery to acquisition, we ensure every interaction is meaningful and memorable.
              </li>
            </ul>
          </div>

          <div className="pt-16 pb-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Join Our Community</h2>
            <p className="text-muted-foreground text-lg leading-[1.8] mb-10">
              Whether you're an artist seeking representation or a collector building your collection, 
              Monarch offers a space where digital art is celebrated, preserved, and elevated to 
              its rightful place in the contemporary art world.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
