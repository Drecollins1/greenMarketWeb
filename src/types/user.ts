export type UserType = 'user' | 'admin' | 'business'; // Add other possible types as needed

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  avatar: string | null;
  banner: string | null;
  business: string | null; // You might want to create a specific Business interface
  settings: string | null; // You might want to create a specific Settings interface
  socials: string | null; // You might want to create a specific Socials interface
  tags: string[] | null;
  fcm_token: string | null;
  email_verified_at: string | null;
  provider_name: string | null;
  provider_id: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_admin: boolean;
  product_count: number;
}

export interface UsersResponse {
  current_page: number;
  data: User[];
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface UsersParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  type?: UserType;
  // Add other filter parameters as needed
}