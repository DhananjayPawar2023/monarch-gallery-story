import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewsletterSubscribe {
  email: string;
  name?: string;
}

export const useNewsletterSubscribe = () => {
  return useMutation({
    mutationFn: async ({ email, name }: NewsletterSubscribe) => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, name })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          throw new Error("This email is already subscribed to our newsletter.");
        }
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Successfully subscribed to our newsletter!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });
};
