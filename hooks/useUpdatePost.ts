import { postService } from "@/api/services/postService";
import { UpdatePostRequest } from "@/types/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdatePostParams = {
  postId: string;
  payload: UpdatePostRequest;
};

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, payload }: UpdatePostParams) =>
      postService.updatePost(postId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["post", variables.postId],
      });
    },
  });
}
