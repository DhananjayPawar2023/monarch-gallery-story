import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Mail, MessageSquare, Palette, Users } from "lucide-react";

const Contact = () => {
  // Placeholder for future form integration (Google Forms / Typeform)
  const [formType, setFormType] = useState<"embedded" | "native">("embedded");

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
            <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Whether you're an artist interested in showcasing your work, a collector seeking guidance, 
              or simply curious about digital art, we'd love to hear from you.
            </p>
          </header>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-secondary/30 border border-border/50 rounded-lg p-8 text-center hover:border-accent/50 transition-colors duration-300">
              <Palette className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-display text-xl mb-3">For Artists</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Interested in showcasing your work? Share your portfolio and artistic vision with us.
              </p>
            </div>

            <div className="bg-secondary/30 border border-border/50 rounded-lg p-8 text-center hover:border-accent/50 transition-colors duration-300">
              <Users className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-display text-xl mb-3">For Collectors</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Looking to acquire a piece or learn about our collection process? We're here to guide you.
              </p>
            </div>

            <div className="bg-secondary/30 border border-border/50 rounded-lg p-8 text-center hover:border-accent/50 transition-colors duration-300">
              <MessageSquare className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-display text-xl mb-3">General Inquiries</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For partnerships, press inquiries, or any other questions, don't hesitate to reach out.
              </p>
            </div>
          </div>

          {/* Form Section - Placeholder for Google Forms / Typeform */}
          <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-secondary/20 border border-border rounded-lg p-8 md:p-12 text-center">
              <Mail className="w-12 h-12 mx-auto mb-6 text-accent" />
              <h2 className="font-display text-2xl md:text-3xl mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and our team will get back to you within 48 hours.
              </p>

              {/* 
                INTEGRATION PLACEHOLDER:
                Replace this div with your Google Forms or Typeform embed code.
                
                For Google Forms:
                <iframe src="YOUR_GOOGLE_FORM_EMBED_URL" width="100%" height="800" frameBorder="0">Loading...</iframe>
                
                For Typeform:
                <div data-tf-live="YOUR_TYPEFORM_ID"></div>
                <script src="//embed.typeform.com/next/embed.js"></script>
              */}
              <div className="bg-background border-2 border-dashed border-border rounded-lg p-12 mb-6">
                <p className="text-muted-foreground text-sm mb-4">
                  Form embed placeholder
                </p>
                <p className="text-xs text-muted-foreground/70 mb-6">
                  Google Forms or Typeform will be embedded here
                </p>
                
                {/* Temporary email fallback */}
                <Button 
                  size="lg" 
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  <a href="mailto:hello@monarch-gallery.com?subject=Inquiry from Website">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us Directly
                  </a>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Response time: We typically respond within 48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;