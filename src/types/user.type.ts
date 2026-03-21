
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
}

export interface UserResponse {
  user: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role_id: string;
  }
}

export interface UpdateUserPayload {
  firstname: string;
  lastname: string;
  email: string
}

/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/