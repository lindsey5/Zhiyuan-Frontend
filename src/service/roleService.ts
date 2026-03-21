import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { PERMISSIONS } from "../config/permission";
import { useAuthStore } from "../lib/store/authStore";
import type { GetRolesResponse, OwnPermissionResponse, Role } from "../types/role.type";

export interface RoleCreateDTO {
    name: string,
    description: string,
    permissions: typeof PERMISSIONS[keyof typeof PERMISSIONS]
}

export const roleService = {
  getOwnPermissions: (): Promise<OwnPermissionResponse> => {
    const { accessToken } = useAuthStore.getState();

    return apiAxios<OwnPermissionResponse>("roles/permissions/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
    })
  },

  getRoles: (): Promise<GetRolesResponse> => {
    const { accessToken } = useAuthStore.getState();

    return apiAxios<GetRolesResponse>("roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
    })
  },
  
  createRole: (data : RoleCreateDTO): Promise<Role> => {
    const { accessToken } = useAuthStore.getState();

    return apiAxios<Role>("roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.POST,
      data
    })
  }

};