import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Palette, Users, Heart, ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Palette,
      title: "Curatorial Excellence",
      description: "Every artwork is carefully selected for its artistic merit, technical execution, and cultural relevance.",
    },
    {
      icon: Users,
      title: "Artist-First",
      description: "We prioritize the artist's vision and provide a platform that respects their creative autonomy.",
    },
    {
      icon: Heart,
      title: "Collector Experience",
      description: "From discovery to acquisition, we ensure every interaction is meaningful and memorable.",
    },
  ];

  return (
    <>
      <SEO 
        title="About Monarch - Curated Digital Art Platform"
        description="Monarch bridges digital artists and collectors through curated exhibitions, thoughtful storytelling, and an unwavering commitment to artistic excellence in contemporary digital art."
      />
      <main className="min-h-screen pt-28 px-6 pb-20">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <header className="text-center mb-20">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Our Story
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-8 animate-fade-in-up leading-[1.1]">
              About Monarch
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-[1.7] max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Bridging digital artistry and human emotion through thoughtfully curated exhibitions
            </p>
          </header>

          {/* Main Content */}
          <div className="space-y-16">
            {/* Introduction */}
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0">
                <p className="text-lg md:text-xl leading-[1.8] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <span className="font-display text-5xl md:text-6xl text-accent float-left mr-4 leading-[0.8]">M</span>
                  onarch was founded on the belief that digital art deserves the same reverence and presentation as traditional fine art. We bridge the gap between artists and collectors through curated exhibitions, thoughtful storytelling, and an unwavering commitment to artistic excellence.
                </p>
              </CardContent>
            </Card>

            <Separator />

            {/* Vision Card */}
            <Card className="bg-secondary/30 border-border/50 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  <CardTitle className="font-display text-3xl md:text-4xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-[1.8]">
                  We envision a future where digital art is recognized not just as a new medium, but as a 
                  legitimate and celebrated form of artistic expression. Through careful curation and immersive 
                  presentation, we're building a platform that elevates both artists and collectors.
                </p>
              </CardContent>
            </Card>

            {/* Values Grid */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="font-display text-3xl md:text-4xl mb-10 text-center">Our Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <Card 
                    key={value.title} 
                    className="text-center hover:border-accent/50 transition-all duration-300"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                        <value.icon className="w-7 h-7 text-accent" />
                      </div>
                      <CardTitle className="font-display text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA Section */}
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <CardContent className="py-12 px-8">
                <h2 className="font-display text-3xl md:text-4xl mb-6">Join Our Community</h2>
                <p className="text-muted-foreground text-lg leading-[1.8] mb-8 max-w-2xl mx-auto">
                  Whether you're an artist seeking representation or a collector building your collection, 
                  Monarch offers a space where digital art is celebrated, preserved, and elevated.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="group">
                    <Link to="/contact">
                      Get in Touch
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/artists">Meet Our Artists</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;