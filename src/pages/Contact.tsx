import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO 
        title="Contact Monarch - Get in Touch"
        description="Connect with Monarch for artist submissions, collector inquiries, or general questions about our curated digital art platform."
      />
      <main className="min-h-screen pt-24 px-6 pb-16">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-16">
          <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in-up">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Whether you're an artist interested in showcasing your work, a collector seeking guidance, 
            or simply curious about digital art, we'd love to hear from you.
          </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div>
              <Label htmlFor="name" className="text-sm font-body">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-body">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-body">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-body">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-2"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Send Message
            </Button>
          </form>

          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div>
              <h3 className="font-display text-2xl mb-4">For Artists</h3>
              <p className="text-muted-foreground leading-relaxed">
                We're always seeking exceptional digital artists to feature in our curated collections. 
                Share your portfolio and artistic vision with us.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl mb-4">For Collectors</h3>
              <p className="text-muted-foreground leading-relaxed">
                Interested in acquiring a piece or learning more about our collection process? 
                Our team is here to guide you through every step.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl mb-4">General Inquiries</h3>
              <p className="text-muted-foreground leading-relaxed">
                For partnerships, press inquiries, or any other questions, please don't hesitate to reach out.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Response time: We typically respond within 48 hours during business days.
              </p>
            </div>
          </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
