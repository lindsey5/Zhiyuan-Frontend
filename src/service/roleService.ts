import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { PERMISSIONS } from "../config/permission";
import { useAuthStore } from "../lib/store/authStore";
import type { GetRolesResponse, GetRoleResponse, Role } from "../types/role.type";

export interface RoleCreateDTO {
    name: string,
    description: string,
    permissions: typeof PERMISSIONS[keyof typeof PERMISSIONS]
}

export const roleService = {
  getOwnRole: (accessToken : string): Promise<GetRoleResponse> => {
    return apiAxios<GetRoleResponse>("roles/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
    })
  },

  getRoles: (accessToken : string): Promise<GetRolesResponse> => {

    return apiAxios<GetRolesResponse>("roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
    })
  },
  
  createRole: (data : RoleCreateDTO, accessToken : string): Promise<Role> => {

    return apiAxios<Role>("roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.POST,
      data
    })
  }

};