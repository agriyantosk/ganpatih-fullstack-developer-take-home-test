export type AuthTokens = {
  token: string;
  refreshToken: string;
};

export type AuthUser = {
  id: string;
  username: string;
};

export type ApiResponse<T> = {
  status: "success" | "error";
  data: T;
  message?: string;
};

export type PostUser = {
  id: string;
  username: string;
  is_following: boolean;
  follower_count: number;
  following_count: number;
  post_count: number;
};

export type FeedPost = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: PostUser;
};

export type FeedResponse = {
  page: number;
  total: number;
  posts: FeedPost[];
};
