export interface GetPostsByLocationIdResponse {
  posts: Post[];
}

export interface CreatePostRequest {
  location_id: string;
  title: string;
  content: string;
}

export interface Post {
  id: string;
  author_id: string;
  location_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
