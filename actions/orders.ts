/**
 * @file orders.ts
 * @description 주문 생성 Server Action
 *
 * 주문 생성 시 다음을 수행합니다:
 * 1. 장바구니 아이템 조회
 * 2. 상품 가격 재확인 (변동 방지)
 * 3. 총 금액 계산 및 검증
 * 4. 트랜잭션 처리 (orders + order_items)
 * 5. 장바구니 비우기
 */

"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCartItems, clearCart } from "@/lib/supabase/cart";
import { getProducts } from "@/lib/supabase/products";
import { createOrder, createOrderItems } from "@/lib/supabase/orders";
import type { ShippingAddress } from "@/types/order";

interface CreateOrderInput {
  shippingAddress: ShippingAddress;
  orderNote?: string;
}

export async function createOrderAction(input: CreateOrderInput) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  try {
    // 1. 장바구니 아이템 조회
    const cartItems = await getCartItems(userId);

    if (cartItems.length === 0) {
      return {
        success: false,
        error: "장바구니가 비어있습니다.",
      };
    }

    // 2. 상품 가격 재확인 (변동 방지)
    const productIds = cartItems.map((item) => item.product_id);
    const products = await getProducts();
    const productMap = new Map(
      products.map((product) => [product.id, product])
    );

    // 3. 총 금액 계산 및 검증
    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cartItems) {
      const product = productMap.get(cartItem.product_id);

      if (!product) {
        return {
          success: false,
          error: `상품을 찾을 수 없습니다: ${cartItem.product_id}`,
        };
      }

      if (!product.is_active) {
        return {
          success: false,
          error: `판매 중지된 상품이 있습니다: ${product.name}`,
        };
      }

      if (product.stock_quantity < cartItem.quantity) {
        return {
          success: false,
          error: `재고가 부족합니다: ${product.name}`,
        };
      }

      const itemTotal = product.price * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        quantity: cartItem.quantity,
        price: product.price,
      });
    }

    // 4. 주문 생성
    const orderId = await createOrder({
      clerk_id: userId,
      total_amount: totalAmount,
      shipping_address: {
        name: input.shippingAddress.name,
        phone: input.shippingAddress.phone,
        postcode: input.shippingAddress.postcode,
        address: input.shippingAddress.address,
        detailAddress: input.shippingAddress.detailAddress,
      },
      order_note: input.orderNote,
    });

    // 5. 주문 상세 아이템 저장
    await createOrderItems(orderId, orderItems);

    // 6. 장바구니 비우기
    await clearCart(userId);

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "주문 생성에 실패했습니다.",
    };
  }
}

