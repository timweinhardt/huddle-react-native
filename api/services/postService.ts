import apiClient from "@/api/client";
import {
  CreatePostRequest,
  GetPostsByLocationIdResponse,
  Post,
} from "@/types/Post";

export const postService = {
  getPostById: async (postId: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${postId}`);
    return response.data;
  },
  getPostsByLocationId: async (locationId: string): Promise<Post[]> => {
    const response = await apiClient.get<GetPostsByLocationIdResponse>(
      `/posts?location_id=${locationId}`,
    );
    return response.data.posts.reverse();
  },
  createPost: async (payload: CreatePostRequest): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts", payload);
    return response.data;
  },
  deletePost: async (postId: string): Promise<Post> => {
    const response = await apiClient.delete<Post>(`/posts/${postId}`);
    return response.data;
  },
};
