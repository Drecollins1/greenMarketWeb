// Basic user type (common for buyer/seller)
export interface UserData {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  avatar: string | null;
}

// Product type from offer response
export interface ProductData {
  id: string | number;
  title: string;
  price: number;
  currency: string | null;
  images: string[];
  description: string;
}

// Transaction type
export interface TransactionData {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  is_paid: boolean;
  charge: number;
  payment_link: string;
}

// Individual offer data
export interface OrdersData {
  id: number;
  buyer_id: number;
  seller_id: number;
  status: string;
  product_id: string;
  description: string;
  amount: number;
  reference: string;
  is_paid: boolean;
  paid_at: string | null;
  account_name: string | null;
  account_number: string | null;
  bank_code: string | null;
  bank_name: string | null;
  is_paid_out: boolean;
  pay_out_requested: number;
  paid_out_at: string | null;
  created_at: string;
  updated_at: string;
  initiator: string | null;
  status_reason: string | null;
  chat_message_id: string | null;
  payable: number;
  charge: number;
  images: string[];
  user_type: string;
  payment_link: string;
  user_id: number;
  escrow_charge?: number;
  
  // Nested objects
//   product: ProductData;
//   seller: UserData;
//   buyer: UserData;
//   transaction: TransactionData | null;
}

// API Response type for offers
export interface GetOrdersResponse {
  current_page: number;
  data: OrdersData[];
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Request parameters for filtering offers (optional, based on your needs)
export interface GetOrdersRequest {
  page?: number;
  limit?: number;
  status?: string;
  user_type?: 'buyer' | 'seller';
  product_id?: string;
}