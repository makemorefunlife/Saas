/**
 * @file orders.ts
 * @description 주문 데이터 페칭 함수
 *
 * Supabase에서 주문 데이터를 조회하는 함수들
 * Server Component에서 사용할 수 있도록 구현
 */

import { getServiceRoleClient } from "./service-role";
import type { Order, OrderItem } from "@/types/order";

/**
 * 주문 생성 (서비스 역할 클라이언트 사용)
 * @param orderData - 주문 데이터
 * @returns 생성된 주문 ID
 */
export async function createOrder(orderData: {
  clerk_id: string;
  total_amount: number;
  shipping_address: {
    name: string;
    phone: string;
  };
  order_note?: string;
}): Promise<string> {
  const supabase = getServiceRoleClient();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      clerk_id: orderData.clerk_id,
      total_amount: orderData.total_amount,
      status: "pending",
      shipping_address: orderData.shipping_address,
      order_note: orderData.order_note || null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }

  return data.id;
}

/**
 * 주문 상세 아이템 생성
 * @param orderId - 주문 ID
 * @param items - 주문 상세 아이템 배열
 */
export async function createOrderItems(
  orderId: string,
  items: Array<{
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }>
): Promise<void> {
  const supabase = getServiceRoleClient();

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error } = await supabase.from("order_items").insert(orderItems);

  if (error) {
    console.error("Error creating order items:", error);
    throw new Error("Failed to create order items");
  }
}

/**
 * 사용자의 주문 목록 조회
 * @param clerkId - Clerk 사용자 ID
 * @returns 주문 배열
 */
export async function getOrders(clerkId: string): Promise<Order[]> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("clerk_id", clerkId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }

  return (data as Order[]) || [];
}

/**
 * 주문 상세 조회 (주문 아이템 포함)
 * @param orderId - 주문 ID
 * @param clerkId - Clerk 사용자 ID (권한 확인용)
 * @returns 주문 정보 및 주문 아이템 배열
 */
export async function getOrderWithItems(
  orderId: string,
  clerkId: string
): Promise<{ order: Order; items: OrderItem[] }> {
  const { createClient } = await import("./server");
  const supabase = await createClient();

  // 주문 조회
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("clerk_id", clerkId)
    .single();

  if (orderError || !orderData) {
    console.error("Error fetching order:", orderError);
    throw new Error("Order not found");
  }

  // 주문 아이템 조회
  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    throw new Error("Failed to fetch order items");
  }

  return {
    order: orderData as Order,
    items: (itemsData as OrderItem[]) || [],
  };
}

