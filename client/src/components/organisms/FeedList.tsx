"use client";

import { useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FeedPost } from "@/lib/types";
import { PostCard } from "@/components/molecules/PostCard";
import { Button } from "@/components/atoms/Button";
import { Spinner } from "@/components/atoms/Spinner";
import { RefreshButton } from "@/components/atoms/RefreshButton";

type FeedListProps = {
  posts: FeedPost[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onFollowStateChange: (userId: string, nextState: boolean) => void;
  currentUserId?: string;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isInitialLoading: boolean;
  direction?: "up" | "down" | null;
  onRefresh: () => Promise<void> | void;
};

export function FeedList({
  posts,
  currentIndex,
  onChangeIndex,
  onFollowStateChange,
  currentUserId,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isInitialLoading,
  direction,
  onRefresh,
}: FeedListProps) {
  const isAtEnd = currentIndex >= posts.length;
  const currentPost = isAtEnd ? null : posts[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < posts.length;
  useEffect(() => {
    if (
      posts.length &&
      hasNextPage &&
      !isFetchingNextPage &&
      posts.length - currentIndex <= 5
    ) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    posts.length,
  ]);

  const animationClass =
    direction === "down"
      ? "animate-slide-up"
      : direction === "up"
      ? "animate-slide-down"
      : "";

  if (isInitialLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center gap-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-end">
            <RefreshButton onRefresh={onRefresh} />
          </div>
          <div className="flex w-full items-stretch gap-2">
            <div
              className={`flex-1 ${animationClass}`}
              key={currentPost?.id ?? "end-of-feed"}
            >
              {isAtEnd ? (
                <EndOfFeedCard onRefresh={onRefresh} />
              ) : (
                currentPost && (
                  <PostCard
                    post={currentPost}
                    isOwnPost={currentPost.user.id === currentUserId}
                    onFollowStateChange={onFollowStateChange}
                  />
                )
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  onChangeIndex(canGoPrev ? currentIndex - 1 : currentIndex)
                }
                disabled={!canGoPrev}
                className="rounded-full border border-white/10 bg-black/40 cursor-pointer"
              >
                <ChevronUp />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (canGoNext) {
                    onChangeIndex(currentIndex + 1);
                  } else if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
                disabled={!canGoNext && !hasNextPage}
                className="rounded-full border border-white/10 bg-black/40 cursor-pointer"
              >
                <ChevronDown />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isFetchingNextPage && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs text-white">
          <Spinner size={16} />
          Loading more posts...
        </div>
      )}
    </div>
  );
}

function EndOfFeedCard({ onRefresh }: { onRefresh: () => Promise<void> | void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
      <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">
        You&apos;re up to date
      </h3>
      <p className="text-sm text-[var(--color-muted-foreground)]">
        You’ve reached the end of the feed. Refresh to check for new posts.
      </p>
      <RefreshButton onRefresh={onRefresh} />
    </div>
  );
}
