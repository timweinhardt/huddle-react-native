export enum Role {
  TEAM_MEMBER = "TEAM_MEMBER",
  TEAM_LEADER = "TEAM_LEADER",
  DIRECTOR = "DIRECTOR",
  OPERATOR = "OPERATOR",
  ADMIN = "ADMIN",
}

export interface UserMembership {
  location_id: string;
  roles: Role[];
}
