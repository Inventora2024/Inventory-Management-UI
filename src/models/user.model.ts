export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  role: string;
}

export interface UserSafeData {
  name: string;
  email: string;
  contact: string;
  address: string;
  role: string;
}
