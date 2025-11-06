import { useState } from "react";
import { useNewsletterSubscribe } from "@/hooks/useNewsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";

export const EnhancedNewsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const { mutate: subscribe, isPending } = useNewsletterSubscribe();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    subscribe(
      { email, name },
      {
        onSuccess: () => {
          setEmail("");
          setName("");
          setConsent(false);
        },
      }
    );
  };

  return (
    <aside className="bg-secondary/40 border border-border p-10 md:p-14 rounded-lg">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 mx-auto mb-6 text-accent" />
        <h3 className="font-display text-3xl md:text-4xl mb-4">
          Stay Connected
        </h3>
        <p className="text-foreground/80 mb-8 leading-[1.8]">
          Join our community to receive curated stories, exhibition updates, and exclusive insights from the artists behind our collection.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background"
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="flex items-start gap-3 text-left">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm text-foreground/70 leading-relaxed cursor-pointer">
              I agree to receive occasional emails from Monarch Gallery about new artworks, exhibitions, and artist stories. You can unsubscribe at any time.
            </label>
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={!consent || !email || isPending}
            className="w-full md:w-auto"
          >
            {isPending ? "Subscribing..." : "Subscribe to Newsletter"}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-6">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </aside>
  );
};
