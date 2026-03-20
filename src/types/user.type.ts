
export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: {
    action: string
  } []
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id: string;
  role?: Role; 
}

/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/