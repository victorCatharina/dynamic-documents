export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password: string;
}
