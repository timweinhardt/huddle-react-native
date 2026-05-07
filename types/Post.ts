export interface PostResponse {
  posts: Post[];
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
