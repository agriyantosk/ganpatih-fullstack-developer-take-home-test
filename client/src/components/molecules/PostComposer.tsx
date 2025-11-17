"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TextArea } from "@/components/atoms/TextArea";
import { Button } from "@/components/atoms/Button";
import { MAX_POST_LENGTH } from "@/config/theme";
import { api } from "@/lib/api";
import { FeedPost } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";

type PostComposerProps = {
  currentUsername?: string;
  onPostCreated: (post: Omit<FeedPost, "user">) => void;
  onClose?: () => void;
};

export function PostComposer({
  currentUsername,
  onPostCreated,
  onClose,
}: PostComposerProps) {
  const [content, setContent] = useState("");

  const mutation = useMutation({
    mutationFn: (body: string) => api.createPost(body),
    onSuccess: (payload, inputContent) => {
      onPostCreated({
        ...payload,
        content: inputContent,
      });
      toast.success("Post created!");
      setContent("");
      onClose?.();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Unable to create post"));
    },
  });

  const remaining = MAX_POST_LENGTH - content.length;
  const isInvalid = !content.trim() || content.length > MAX_POST_LENGTH;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isInvalid || mutation.isPending) {
      if (content.length > MAX_POST_LENGTH) {
        toast.error("Post must be 200 characters or less.");
      }
      return;
    }
    mutation.mutate(content.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-foreground)]">
          Share what&apos;s on your mind
        </label>
        <TextArea
          rows={5}
          placeholder="Type your update..."
          value={content}
          maxLength={MAX_POST_LENGTH + 1}
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
          <span>{currentUsername ? `@${currentUsername}` : "You"}</span>
          <span className={remaining < 0 ? "text-red-400" : undefined}>
            {remaining} / 200
          </span>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isInvalid || mutation.isPending}
        className="w-full"
      >
        {mutation.isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
