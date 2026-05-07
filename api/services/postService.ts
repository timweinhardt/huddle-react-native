import { Post, PostResponse } from "@/types/Post";
import apiClient from "../client";

export const postService = {
  getPostsByLocationId: async (location_id: string): Promise<Post[]> => {
    const response = await apiClient.get<PostResponse>(
      `/posts?location_id=${location_id}`,
    );
    return response.data.posts;
  },
};
