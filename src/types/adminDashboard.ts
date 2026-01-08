export interface AdminStats {
  users: number;
  admins: number;
  escrows: number;
  products: number;
  tickets: number;
}

export interface DashboardData {
  escrow: number;
  products: number;
  tickets: number;
  liked: number;
  wish_list: number;
  wallet: string;
  admin: AdminStats;
}

export interface SalesDataPoint {
  date: string;
  sales: number;
  order: number;
}

export interface ChannelData {
  name: string;
  value: number;
  color: string;
}

export interface RecentProduct {
  id: number;
  Icon: React.ComponentType;
  name: string;
  status: 'Accepted' | 'Pending' | 'Rejected';
  price: string;
}

export interface ActivityData {
  label: string;
  value: number;
  subtitle: string;
  color?: string;
}

export interface ReviewData {
  name: string;
  rating: number;
  comment: string;
  initials: string;
}