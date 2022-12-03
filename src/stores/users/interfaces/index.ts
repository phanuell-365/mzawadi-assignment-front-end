export interface CreateUser {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserObject {
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface UpdateUser {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
}
