"use client";

import { Card } from "@/components/atoms/Card";
import { FollowButton } from "@/components/molecules/FollowButton";
import { formatTimeAgo } from "@/lib/timeago";
import { FeedPost } from "@/lib/types";

type PostCardProps = {
  post: FeedPost;
  isOwnPost: boolean;
  onFollowStateChange: (userId: string, nextState: boolean) => void;
};

export function PostCard({
  post,
  isOwnPost,
  onFollowStateChange,
}: PostCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between bg-white/5 p-8">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-[var(--color-muted-foreground)]">
            @{post.user.username}
          </p>
          <p className="text-lg font-semibold text-[var(--color-foreground)]">
            {formatTimeAgo(post.created_at)}
          </p>
        </div>
        {!isOwnPost && (
          <FollowButton
            userId={post.user.id}
            isFollowing={post.user.is_following}
            onToggle={(nextState) =>
              onFollowStateChange(post.user.id, nextState)
            }
          />
        )}
      </header>

      <main className="flex-1">
        <p className="text-balance text-2xl font-semibold leading-relaxed text-[var(--color-foreground)]">
          {post.content}
        </p>
      </main>
    </Card>
  );
}
