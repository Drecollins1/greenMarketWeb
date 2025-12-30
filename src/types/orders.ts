// types/orders.ts
export interface GetOrdersRequest {
  page?: number;
  per_page?: number;
  status?: string;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface GetOrdersResponse {
  current_page: number;
  data: Order[];
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

interface Order {
  id?:               number;
    userID?:           number;
    reference?:        string;
    quantity?:         number;
    status?:           string;
    meta?:             null;
    paymentLink?:      string;
    platform?:         string;
    narration?:        null;
    type?:             string;
    channel?:          string;
    amount?:           string;
    amountPaid?:       number;
    transactableType?: string;
    transactableID?:   number;
    paidAt?:           Date;
    deletedAt?:        null;
    createdAt?:        Date;
    created_at?:       string;
    updatedAt?:        Date;
    transactable?:     Transactable;
    user?:             User;
    description?:      string;
    date?:             Date;
    project?:          null;
    product?:          Product;
}

export interface Transactable {
    id?:              number;
    buyerID?:         number;
    sellerID?:        number;
    status?:          string;
    productID?:       string;
    description?:     string;
    amount?:          string;
    reference?:       string;
    isPaid?:          boolean;
    paidAt?:          Date;
    accountName?:     null;
    accountNumber?:   null;
    bankCode?:        null;
    bankName?:        null;
    isPaidOut?:       boolean;
    payOutRequested?: number;
    paidOutAt?:       null;
    createdAt?:       Date;
    updatedAt?:       Date;
    initiator?:       null;
    statusReason?:    null;
    chatMessageID?:   null;
    payable?:         number;
    charge?:          number;
    images?:          any[];
}

export interface Product {
    id?:          number;
    categoryID?:  number;
    userID?:      number;
    title?:       string;
    slug?:        string;
    tags?:        string;
    description?: string;
    state?:       string;
    local?:       string;
    nearest?:     string;
    price?:       number;
    useEscrow?:   number;
    status?:      string;
    images?:      string;
    createdAt?:   Date;
    updatedAt?:   Date;
    views?:       number;
}

export interface User {
    id?:              number;
    name?:            string;
    email?:           string;
    phone?:           string;
    type?:            string;
    avatar?:          string;
    banner?:          string;
    business?:        null;
    settings?:        null;
    socials?:         null;
    tags?:            null;
    fcmToken?:        null;
    emailVerifiedAt?: null;
    providerName?:    null;
    providerID?:      null;
    rememberToken?:   null;
    createdAt?:       Date;
    updatedAt?:       Date;
    deletedAt?:       null;
}