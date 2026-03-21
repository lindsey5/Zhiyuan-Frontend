import { apiAxios, HttpMethod } from "../api/apiAxios";
import { PERMISSIONS } from "../config/permission";
import type { OwnPermission, Role } from "../types/role.type";

export interface RoleCreateDTO {
    name: string,
    description: string,
    permissions: typeof PERMISSIONS[keyof typeof PERMISSIONS]
}

export const roleService = {
  getOwnPermissions: (): Promise<OwnPermission> =>
    apiAxios<OwnPermission>("roles/permissions/me", {
      method: HttpMethod.GET,
    }),

  getRoles: (): Promise<Role[]> =>
    apiAxios<Role[]>("roles", {
      method: HttpMethod.GET,
    }),
  
  createRole: (data : RoleCreateDTO): Promise<Role> =>
    apiAxios<Role>("roles", {
      method: HttpMethod.POST,
      data
    })
};