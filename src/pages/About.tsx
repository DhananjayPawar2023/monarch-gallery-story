const About = () => {
  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-display text-5xl md:text-7xl mb-12 animate-fade-in-up">
          About Monarch
        </h1>

        <div className="space-y-8 text-lg leading-relaxed">
          <p className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="font-display text-3xl text-accent">M</span>onarch was founded on the belief 
            that digital art deserves the same reverence and presentation as traditional fine art. We bridge
            the gap between artists and collectors through curated exhibitions, thoughtful storytelling, and 
            an unwavering commitment to artistic excellence.
          </p>

          <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Our platform represents a new paradigm in art curation—one that honors the craftsmanship and 
            vision of digital artists while providing collectors with an elevated experience that matches 
            the sophistication of the work itself.
          </p>

          <div className="pt-12 pb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-display text-3xl mb-6">Our Vision</h2>
            <p className="text-muted-foreground">
              We envision a future where digital art is recognized not just as a new medium, but as a 
              legitimate and celebrated form of artistic expression. Through careful curation and immersive 
              presentation, we're building a platform that elevates both artists and collectors.
            </p>
          </div>

          <div className="pt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-display text-3xl mb-6">Our Approach</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="pl-6 border-l-2 border-accent">
                <strong className="text-foreground">Curatorial Excellence</strong> — Every artwork is 
                carefully selected for its artistic merit, technical execution, and cultural relevance.
              </li>
              <li className="pl-6 border-l-2 border-accent">
                <strong className="text-foreground">Artist-First</strong> — We prioritize the artist's 
                vision and provide a platform that respects their creative autonomy.
              </li>
              <li className="pl-6 border-l-2 border-accent">
                <strong className="text-foreground">Collector Experience</strong> — From discovery to 
                acquisition, we ensure every interaction is meaningful and memorable.
              </li>
            </ul>
          </div>

          <div className="pt-12 pb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h2 className="font-display text-3xl mb-6">Join Our Community</h2>
            <p className="text-muted-foreground">
              Whether you're an artist seeking representation or a collector building your collection, 
              Monarch offers a space where digital art is celebrated, preserved, and elevated to 
              its rightful place in the contemporary art world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
