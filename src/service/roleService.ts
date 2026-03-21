import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import { PERMISSIONS } from "../config/permission";
import { useAuthStore } from "../lib/store/authStore";
import type { OwnPermission, Role } from "../types/role.type";

export interface RoleCreateDTO {
    name: string,
    description: string,
    permissions: typeof PERMISSIONS[keyof typeof PERMISSIONS]
}

export const roleService = {
  getOwnPermissions: (): Promise<OwnPermission> => {
    const { accessToken } = useAuthStore.getState();

    return apiAxios<OwnPermission>("roles/permissions/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.GET,
    })
  },

  getRoles: (): Promise<Role[]> => {
    const { accessToken } = useAuthStore.getState();

    return apiAxios<Role[]>("roles", {
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