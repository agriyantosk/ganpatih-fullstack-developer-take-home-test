"use client";

import { Button } from "@/components/atoms/Button";
import { api } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type FollowButtonProps = {
  userId: string;
  isFollowing: boolean;
  onToggle: (nextState: boolean) => void;
  disabled?: boolean;
};

export function FollowButton({
  userId,
  isFollowing,
  onToggle,
  disabled,
}: FollowButtonProps) {
  const mutation = useMutation({
    mutationFn: (nextState: boolean) =>
      nextState ? api.followUser(userId) : api.unfollowUser(userId),
  });

  const handleClick = () => {
    if (disabled) return;
    const nextState = !isFollowing;
    onToggle(nextState);

    mutation.mutate(nextState, {
      onSuccess: () => {
        toast.success(nextState ? "Followed user." : "Unfollowed user.");
      },
      onError: (error) => {
        onToggle(!nextState); // revert
        toast.error(getErrorMessage(error, "Unable to update follow state"));
      },
    });
  };

  return (
    <Button
      type="button"
      variant={isFollowing ? "outline" : "secondary"}
      size="default"
      disabled={mutation.isPending || disabled}
      onClick={handleClick}
      className="cursor-pointer"
    >
      {mutation.isPending
        ? "Please wait..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </Button>
  );
}
