// types/escrow.ts

export type UserType = "buyer" | "seller";

export type EscrowStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "success"
  | "failed"
  | "disputed"
  | "abandoned"
  | "in_escrow";

export interface EscrowProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export interface EscrowUser {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  avatar: string;
}

export interface EscrowTransaction {
  id: number;
  amount: number;
  status: string;
  is_paid: boolean;
  charge: number;
  payment_link: string;
}

export interface EscrowOffer {
  id: number;
  amount: number;
  status: EscrowStatus;
  description: string;
  created_at: string;
  user_type: UserType;
  payment_link: string;

  product: EscrowProduct;
  seller: EscrowUser;
  buyer: EscrowUser;
  transaction: EscrowTransaction | null;
}

export interface GetOffersResponse {
  current_page: number;
  data: EscrowOffer[];
  last_page: number;
  total: number;
}

export interface GetOffersRequest {
  page?: number;
  status?: EscrowStatus;
}
