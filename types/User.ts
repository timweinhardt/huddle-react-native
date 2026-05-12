import { UserMembership } from "@/types/Membership";

export interface GetUsersByLocationId {
  location_id: string;
  users: User[];
}

export interface User {
  id: string;
  avatar_url: string | null;
  email: string;
  first_name: string;
  last_name: string;
  memberships: UserMembership[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_confirmed: boolean;
}
