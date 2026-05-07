import { postService } from "@/api/services/postService";
import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";

export const usePosts = (locationId: string) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", locationId],
    queryFn: () => postService.getPostsByLocationId(locationId),
    enabled: !!locationId,
    placeholderData: (previousData) => previousData,
  });
};
