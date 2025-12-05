/**
 * @file order.ts
 * @description Order 타입 정의
 *
 * Supabase orders 및 order_items 테이블 스키마를 기반으로 한 TypeScript 타입 정의
 */

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  name: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress?: string;
}

export interface Order {
  id: string;
  clerk_id: string;
  total_amount: number;
  status: OrderStatus;
  shipping_address: ShippingAddress;
  order_note?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  created_at: string;
}

