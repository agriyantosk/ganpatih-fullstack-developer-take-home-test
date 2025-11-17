"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { Menu, X, Plus, LogOut } from "lucide-react";
import { ProtectedLayout } from "@/components/organisms/ProtectedLayout";
import { FeedList } from "@/components/organisms/FeedList";
import { Button } from "@/components/atoms/Button";
import { PostComposer } from "@/components/molecules/PostComposer";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useInfiniteFeed } from "@/hooks/useInfiniteFeed";
import { FeedPost } from "@/lib/types";

export default function FeedPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth({ requireAuth: true });
  const { user: profile } = useCurrentUser();
  const logout = useAuthStore((state) => state.logout);
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const {
    posts,
    insertPostAt,
    resetInsertedPosts,
    updateFollowState,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFeedLoading,
    refetch,
  } = useInfiniteFeed();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    router.replace("/");
  };

  const handlePostCreated = (payload: Omit<FeedPost, "user">) => {
    if (!user) return;

    const existingMeta = posts.find((post) => post.user.id === user.id)
      ?.user ?? {
      id: user.id,
      username: user.username,
      is_following: false,
      follower_count: 0,
      following_count: 0,
      post_count: 0,
    };

    const hydratedPost: FeedPost = {
      ...payload,
      user: {
        ...existingMeta,
        post_count: existingMeta.post_count + 1,
      },
    };

    const targetIndex = currentIndex;
    insertPostAt(targetIndex, hydratedPost);
    setCurrentIndex(targetIndex);
    setScrollDirection(null);
  };

  const handleFollowStateChange = (userId: string, nextState: boolean) => {
    updateFollowState(userId, nextState);
  };

  const isInitialLoading = isFeedLoading && posts.length === 0;
  const maxIndex = posts.length;
  const safeIndex = Math.min(currentIndex, maxIndex);

  return (
    <ProtectedLayout>
      <div className="flex min-h-screen flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="text-sm uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {profile ? (
              <>
                Hello, <span className="font-semibold">{profile.username}</span>{" "}
                👋
              </>
            ) : (
              "Welcome 👋"
            )}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              className="hidden gap-2 sm:inline-flex text-red-400 hover:text-red-200 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <div className="relative sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[var(--color-muted)] p-2 shadow-xl">
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="mx-auto mb-4 flex w-full max-w-2xl justify-center">
            <Button
              className="w-full max-w-[200px] gap-2 sm:w-auto sm:min-w-[200px] cursor-pointer"
              onClick={() => setComposerOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </div>

          <FeedList
            posts={posts}
            currentIndex={safeIndex}
            onChangeIndex={(next) => {
              const target = Math.min(Math.max(next, 0), maxIndex);
              if (target > currentIndex) {
                setScrollDirection("down");
              } else if (target < currentIndex) {
                setScrollDirection("up");
              } else {
                setScrollDirection(null);
              }
              setCurrentIndex(target);
            }}
            onFollowStateChange={handleFollowStateChange}
            currentUserId={user?.id}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isInitialLoading={isInitialLoading || isLoading}
            direction={scrollDirection}
            onRefresh={async () => {
              await refetch();
              setCurrentIndex(0);
              setScrollDirection(null);
              resetInsertedPosts();
              toast.success("Feed refreshed");
            }}
          />
        </main>
      </div>

      <Dialog.Root open={isComposerOpen} onOpenChange={setComposerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[var(--color-background)] p-6 shadow-2xl focus:outline-none">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-[var(--color-foreground)]">
                Create post
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-sm text-[var(--color-muted-foreground)] hover:text-white">
                  Close
                </button>
              </Dialog.Close>
            </div>

            {user && (
              <PostComposer
                currentUsername={user.username}
                onPostCreated={handlePostCreated}
                onClose={() => setComposerOpen(false)}
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ProtectedLayout>
  );
}
