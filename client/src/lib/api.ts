import axios from "axios";
import { apiClient, API_BASE_URL } from "@/lib/axios";
import { ApiResponse, AuthTokens, FeedPost, FeedResponse } from "@/lib/types";

type Credentials = {
  username: string;
  password: string;
};

const endpoints = {
  register: "/register",
  login: "/login",
  refresh: "/refresh-token",
  posts: "/posts",
  follow: (userId: string) => `/follow/${userId}`,
  feed: "/feed",
} as const;

function unwrap<T>(response: { data: ApiResponse<T> }) {
  return response.data.data;
}

export const api = {
  register: async (payload: Credentials) => {
    return unwrap<{ id: string; username: string }>(
      await apiClient.post(endpoints.register, payload)
    );
  },
  login: async (payload: Credentials) => {
    return unwrap<AuthTokens>(await apiClient.post(endpoints.login, payload));
  },
  refreshSession: async (refreshToken: string) => {
    const response = await axios.post<ApiResponse<AuthTokens>>(
      `${API_BASE_URL}${endpoints.refresh}`,
      {
        refreshToken,
      }
    );
    return response.data.data;
  },
  createPost: async (content: string) => {
    return unwrap<Omit<FeedPost, "user">>(
      await apiClient.post(endpoints.posts, {
        content,
      })
    );
  },
  fetchCurrentUser: async () => {
    const response = await apiClient.get("/me");
    return response.data.data;
  },
  followUser: async (userId: string) => {
    return unwrap<{ message: string }>(await apiClient.post(endpoints.follow(userId)));
  },
  unfollowUser: async (userId: string) => {
    return unwrap<{ message: string }>(await apiClient.delete(endpoints.follow(userId)));
  },
  fetchFeed: async ({ page, limit }: { page: number; limit: number }) => {
    return unwrap<FeedResponse>(
      await apiClient.get(endpoints.feed, {
        params: { page, limit },
      })
    );
  },
};
