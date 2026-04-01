import { apiAxios, HttpMethod } from "../lib/api/apiAxios";
import type { GetRolesResponse, GetRoleResponse, RoleDTO, UpdateRoleResponse, CreateRoleResponse } from "../types/role.type";
import { type ApiResponse } from "../types/type";

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
  
  createRole: (data : RoleDTO, accessToken : string): Promise<CreateRoleResponse> => {
    return apiAxios<CreateRoleResponse>("roles", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.POST,
      data
    })
  },

  getRoleById: (id : number, accessToken : string): Promise<GetRoleResponse> => {
    return apiAxios<GetRoleResponse>(`roles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }, 
      method: HttpMethod.GET,
    })
  },

  updateRole: (id: number, data: RoleDTO, accessToken: string) : Promise<UpdateRoleResponse> => {
    return apiAxios<UpdateRoleResponse>(`roles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.PUT,
      data
    })
  },

  deleteRole: (id : number, accessToken : string) : Promise<ApiResponse> => {
    return apiAxios<ApiResponse>(`roles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: HttpMethod.DELETE
    })
  }

};