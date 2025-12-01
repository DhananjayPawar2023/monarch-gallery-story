import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsFollowing, useToggleFollow } from "@/hooks/useArtistFollows";
import { useNavigate } from "react-router-dom";

interface FollowArtistProps {
  artistId: string;
  artistName: string;
}

export const FollowArtist = ({ artistId, artistName }: FollowArtistProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: isFollowing } = useIsFollowing(user?.id, artistId);
  const { mutate: toggleFollow, isPending } = useToggleFollow();

  const handleFollow = () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    toggleFollow({
      userId: user.id,
      artistId,
      isFollowing: isFollowing || false,
    });
  };

  return (
    <Button
      onClick={handleFollow}
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      disabled={isPending}
    >
      {isFollowing ? (
        <>
          <UserCheck className="w-4 h-4 mr-2" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          Follow {artistName}
        </>
      )}
    </Button>
  );
};