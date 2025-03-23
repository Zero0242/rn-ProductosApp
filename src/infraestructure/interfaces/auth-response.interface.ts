export interface AuthResponse {
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  roles: string[];
  token: string;
}
