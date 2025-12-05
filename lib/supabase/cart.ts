/**
 * @file cart.ts
 * @description 장바구니 데이터 페칭 함수
 *
 * Supabase에서 장바구니 데이터를 조회하고 조작하는 함수들
 * Client Component에서 사용할 수 있도록 구현
 */

import { useClerkSupabaseClient } from "@/hooks/use-sync-user";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

/**
 * 사용자의 장바구니 아이템 조회 (상품 정보 포함)
 * @param clerkId - Clerk 사용자 ID
 * @returns 장바구니 아이템 배열 (상품 정보 포함)
 */
export async function getCartItems(clerkId: string): Promise<CartItem[]> {
  // Server Component에서 사용할 수 있도록 server 클라이언트 사용
  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      product:products(*)
    `
    )
    .eq("clerk_id", clerkId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items");
  }

  // 상품 정보를 포함한 CartItem 배열 반환
  return (
    data?.map((item) => ({
      ...item,
      product: item.product as Product,
    })) || []
  );
}

/**
 * 장바구니에 상품 추가
 * @param clerkId - Clerk 사용자 ID
 * @param productId - 상품 ID
 * @param quantity - 수량 (기본값: 1)
 */
export async function addToCart(
  clerkId: string,
  productId: string,
  quantity: number = 1
): Promise<void> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  // 기존 장바구니 아이템 확인
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("clerk_id", clerkId)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // 기존 아이템이 있으면 수량 업데이트
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);

    if (error) {
      console.error("Error updating cart item:", error);
      throw new Error("Failed to update cart item");
    }
  } else {
    // 새 아이템 추가
    const { error } = await supabase.from("cart_items").insert({
      clerk_id: clerkId,
      product_id: productId,
      quantity,
    });

    if (error) {
      console.error("Error adding to cart:", error);
      throw new Error("Failed to add to cart");
    }
  }
}

/**
 * 장바구니 아이템 수량 변경
 * @param cartItemId - 장바구니 아이템 ID
 * @param quantity - 새로운 수량
 */
export async function updateCartItem(
  cartItemId: string,
  quantity: number
): Promise<void> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  if (quantity <= 0) {
    // 수량이 0 이하면 삭제
    await removeFromCart(cartItemId);
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);

  if (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item");
  }
}

/**
 * 장바구니에서 상품 삭제
 * @param cartItemId - 장바구니 아이템 ID
 */
export async function removeFromCart(cartItemId: string): Promise<void> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId);

  if (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove from cart");
  }
}

/**
 * 사용자의 전체 장바구니 비우기
 * @param clerkId - Clerk 사용자 ID
 */
export async function clearCart(clerkId: string): Promise<void> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("clerk_id", clerkId);

  if (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}

