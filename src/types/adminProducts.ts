export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  banner: string | null;
}

export interface Business {
  logo: string;
  name: string;
  description: string;
  rating: number;
}

export interface Social {
  twitter: string | null;
  facebook: string | null;
  instagram: string | null;
}

export interface Review {
  // Define your review structure here if you have it
  // For now, we'll use any since the API shows empty arrays
}

export interface Product {
  id: number;
  category_id: number;
  old_id: number | null;
  user_id: number;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  state: string;
  local: string;
  nearest: string;
  plan_id: number | null;
  price: number;
  use_escrow: number;
  status: 'draft' | 'publish' | 'trash' | 'pending';
  images: string[];
  price_range: any | null;
  meta: any | null;
  properties: any | null;
  created_at: string;
  updated_at: string;
  views: number;
  user: User;
  social: Social | null;
  business: Business;
  purchased_ad: boolean;
  thumbnail: string;
  keyword: string;
  address: string;
  phone: string;
  chat_id: number;
  reviews: Review[]; // This is an array in the API
  subscription: any | null;
  icon: string;
  sub: string;
}

export interface ProductsResponse {
  current_page: number;
  data: Product[];
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ProductsParams {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  status?: Product['status'];
  category_id?: number;
}