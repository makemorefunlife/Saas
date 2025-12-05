/**
 * @file cart.ts
 * @description Cart 타입 정의
 *
 * Supabase cart_items 테이블 스키마를 기반으로 한 TypeScript 타입 정의
 */

import type { Product } from "./product";

export interface CartItem {
  id: string;
  clerk_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product; // JOIN된 상품 정보
}

