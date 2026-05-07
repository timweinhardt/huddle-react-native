import { postService } from "@/api/services/postService";
import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";

export const usePost = (postId: string) => {
  return useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => postService.getPostById(postId),
    enabled: !!postId,
    placeholderData: (previousData) => previousData,
    refetchOnMount: true,
  });
};
