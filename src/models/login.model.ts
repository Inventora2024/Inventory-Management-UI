export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  userId: number;
  name: string;
  email: string;
  role: string;
  token: string;
}
