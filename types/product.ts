/**
 * @file product.ts
 * @description Product 타입 정의
 *
 * Supabase products 테이블 스키마를 기반으로 한 TypeScript 타입 정의
 */

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

