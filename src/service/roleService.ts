import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetRolesResponse, GetRoleResponse, RoleDTO, UpdateRoleResponse, CreateRoleResponse } from "../types/role.type";
import { type ApiResponse } from "../types/type";

export const roleService = {
  getOwnRole: (): Promise<GetRoleResponse> => {
    return apiAxios<GetRoleResponse>("roles/me", {
      method: HttpMethod.GET,
    })
  },

  getRoles: (): Promise<GetRolesResponse> => {
    return apiAxios<GetRolesResponse>("roles", {
      method: HttpMethod.GET,
    })
  },
  
  createRole: (data : RoleDTO): Promise<CreateRoleResponse> => {
    return apiAxios<CreateRoleResponse>("roles", {
      method: HttpMethod.POST,
      data
    })
  },

  getRoleById: (id : string): Promise<GetRoleResponse> => {
    return apiAxios<GetRoleResponse>(`roles/${id}`, {
      method: HttpMethod.GET,
    })
  },

  updateRole: (id: string, data: RoleDTO) : Promise<UpdateRoleResponse> => {
    return apiAxios<UpdateRoleResponse>(`roles/${id}`, {
      method: HttpMethod.PUT,
      data
    })
  },

  deleteRole: (id : string) : Promise<ApiResponse> => {
    return apiAxios<ApiResponse>(`roles/${id}`, {
      method: HttpMethod.DELETE
    })
  }

};