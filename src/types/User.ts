export interface LoginType {
  username: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  status?: string;
  code?: number;
  message?: string;
  data?: any;
}