"use client";

import { useInfiniteQuery, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import { FEED_PAGE_SIZE } from "@/config/theme";
import { FeedPost, FeedResponse } from "@/lib/types";

const FEED_QUERY_KEY = ["feed"];

export function useInfiniteFeed() {
  const queryClient = useQueryClient();
  const [insertions, setInsertions] = useState<Array<{ index: number; post: FeedPost }>>([]);

  const queryResult = useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return api.fetchFeed({
        page: pageParam,
        limit: FEED_PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.posts.length < FEED_PAGE_SIZE) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  });

  const posts = useMemo(() => {
    const base = queryResult.data?.pages.flatMap((page) => page.posts) ?? [];
    if (!insertions.length) return base;

    const merged = [...base];
    insertions
      .slice()
      .sort((a, b) => a.index - b.index)
      .forEach(({ index, post }) => {
        const clamped = Math.max(0, Math.min(index, merged.length));
        merged.splice(clamped, 0, post);
      });
    return merged;
  }, [queryResult.data, insertions]);

  const insertPostAt = (index: number, post: FeedPost) => {
    setInsertions((prev) => [...prev, { index, post }]);
  };

  const resetInsertedPosts = () => setInsertions([]);

  const updateFollowState = (userId: string, isFollowing: boolean) => {
    queryClient.setQueryData<InfiniteData<FeedResponse>>(FEED_QUERY_KEY, (existing) => {
      if (!existing) return existing;
      return {
        ...existing,
        pages: existing.pages.map((page) => ({
          ...page,
          posts: page.posts.map((post) => {
            if (post.user.id === userId) {
              return {
                ...post,
                user: {
                  ...post.user,
                  is_following: isFollowing,
                  follower_count: Math.max(
                    0,
                    post.user.follower_count + (isFollowing ? 1 : -1)
                  ),
                },
              };
            }
            return post;
          }),
        })),
      };
    });
  };

  return {
    ...queryResult,
    posts,
    insertPostAt,
    resetInsertedPosts,
    updateFollowState,
  };
}
