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

export interface GetUsersResponse {
  success?: boolean;
  status?: string;
  message?: string;
  data?: any;
}

export interface GetUsersParams {
  limit: string;
  skip: string;
}