//this is temporary, remove this type if it's not needed
export interface Role {
  id: string;
  name: string;
  description?: string;
}

//this is temporary, remove this type if it's not needed
export interface Department {
  id: string;
  name: string;
}

//This User type is temporary. This should be change base on the User table
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  is_active: boolean;
  department_id: string;
  role_id: string;

  role?: Role; 
  department?: Department;

  created_at?: string;
  updated_at?: string;
}

/*
*  THIS TYPES SHOULD BE UPDATED ACCORDING TO THE 
*  USER TABLE STRUCTURE
*/