/**
 * @file products.ts
 * @description 상품 데이터 페칭 함수
 *
 * Supabase에서 상품 데이터를 조회하는 함수들
 * Server Component에서 사용할 수 있도록 구현
 */

import { createClient } from "./server";
import type { Product } from "@/types/product";

/**
 * 활성화된 모든 상품 조회
 * @param params - 선택적 파라미터 (카테고리, limit, offset)
 * @returns 상품 배열
 */
export async function getProducts(params?: {
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (params?.category) {
    query = query.eq("category", params.category);
  }

  if (params?.limit) {
    query = query.limit(params.limit);
  }

  if (params?.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 20) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }

  return (data as Product[]) || [];
}

/**
 * 인기 상품 조회 (홈 페이지용)
 * 최신 상품 중 활성화된 상품 4개를 반환
 * @returns 상품 배열 (최대 4개)
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ limit: 4 });
}

