import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsFavorite, useToggleFavorite } from "@/hooks/useFavorites";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  artworkId: string;
  variant?: "default" | "ghost";
}

export const FavoriteButton = ({ artworkId, variant = "ghost" }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: isFavorite } = useIsFavorite(user?.id, artworkId);
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/auth");
      return;
    }

    toggleFavorite({
      userId: user.id,
      artworkId,
      isFavorite: !!isFavorite,
    });
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      className="relative"
    >
      <Heart
        className={`h-5 w-5 transition-all ${
          isFavorite ? "fill-red-500 text-red-500" : ""
        }`}
      />
    </Button>
  );
};
