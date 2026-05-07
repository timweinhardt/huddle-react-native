import apiClient from "@/api/client";
import { GetPostsByLocationIdResponse, Post } from "@/types/Post";

export const postService = {
  getPostById: async (postId: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${postId}`);
    return response.data;
  },
  getPostsByLocationId: async (locationId: string): Promise<Post[]> => {
    const response = await apiClient.get<GetPostsByLocationIdResponse>(
      `/posts?location_id=${locationId}`,
    );
    return response.data.posts;
  },
};
