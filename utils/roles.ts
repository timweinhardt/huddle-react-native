import { Role, RolePriority } from "@/types/Membership";

export function getHighestRole(roles: Role[]): Role | undefined {
  if (!roles || roles.length === 0) return undefined;

  return roles.reduce((highest, current) => {
    return RolePriority[current] > RolePriority[highest] ? current : highest;
  });
}
