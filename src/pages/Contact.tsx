import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageSquare, Palette, Users, Clock, ExternalLink } from "lucide-react";

const Contact = () => {
  const contactOptions = [
    {
      icon: Palette,
      title: "For Artists",
      description: "Interested in showcasing your work? Share your portfolio and artistic vision with us.",
      badge: "Artist Submissions",
    },
    {
      icon: Users,
      title: "For Collectors",
      description: "Looking to acquire a piece or learn about our collection process? We're here to guide you.",
      badge: "Collecting",
    },
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "For partnerships, press inquiries, or any other questions, don't hesitate to reach out.",
      badge: "Contact",
    },
  ];

  return (
    <>
      <SEO 
        title="Contact Monarch - Get in Touch"
        description="Connect with Monarch for artist submissions, collector inquiries, or general questions about our curated digital art platform."
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <header className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              Contact Us
            </Badge>
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Whether you're an artist interested in showcasing your work, a collector seeking guidance, 
              or simply curious about digital art, we'd love to hear from you.
            </p>
          </header>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {contactOptions.map((option, index) => (
              <Card 
                key={option.title} 
                className="text-center hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <option.icon className="w-7 h-7 text-accent" />
                  </div>
                  <Badge variant="outline" className="w-fit mx-auto mb-2 text-xs">
                    {option.badge}
                  </Badge>
                  <CardTitle className="font-display text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Form Section - Placeholder for Google Forms / Typeform */}
          <Card className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="font-display text-2xl md:text-3xl">Send Us a Message</CardTitle>
              <p className="text-muted-foreground mt-2">
                Fill out the form below and our team will get back to you.
              </p>
            </CardHeader>
            <Separator />
            <CardContent className="p-8">
              {/* 
                INTEGRATION PLACEHOLDER:
                Replace this div with your Google Forms or Typeform embed code.
                
                For Google Forms:
                <iframe src="YOUR_GOOGLE_FORM_EMBED_URL" width="100%" height="800" frameBorder="0">Loading...</iframe>
                
                For Typeform:
                <div data-tf-live="YOUR_TYPEFORM_ID"></div>
                <script src="//embed.typeform.com/next/embed.js"></script>
              */}
              <div className="bg-secondary/30 border-2 border-dashed border-border rounded-lg p-10 text-center">
                <Badge variant="secondary" className="mb-4">
                  Coming Soon
                </Badge>
                <p className="text-muted-foreground text-sm mb-2">
                  Form embed placeholder
                </p>
                <p className="text-xs text-muted-foreground/70 mb-6">
                  Google Forms or Typeform will be embedded here
                </p>
                
                {/* Temporary email fallback */}
                <Button 
                  size="lg" 
                  asChild
                  className="group"
                >
                  <a href="mailto:hello@monarch-gallery.com?subject=Inquiry from Website">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us Directly
                    <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                  </a>
                </Button>
              </div>

              <Separator className="my-8" />

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Response time: We typically respond within 48 hours during business days.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Contact;