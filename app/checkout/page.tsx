/**
 * @file app/checkout/page.tsx
 * @description 주문 페이지
 *
 * 장바구니 아이템을 확인하고 배송지 정보를 입력하여 주문을 생성하는 페이지
 */

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCartItems } from "@/lib/supabase/cart";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import CheckoutForm from "@/components/CheckoutForm";
import { formatPrice } from "@/lib/utils/formatPrice";

export default async function CheckoutPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const cartItems = await getCartItems(userId);

  if (cartItems.length === 0) {
    redirect("/cart");
  }

  const totalAmount = cartItems.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          {/* 헤더 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              주문하기
            </h1>
            <p className="text-white/70">
              배송지 정보를 입력하고 주문을 완료하세요
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 주문 폼 */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <CheckoutForm totalAmount={totalAmount} />
              </div>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 flex flex-col gap-4">
                <CartSummary items={cartItems} />
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">
                      총 결제금액
                    </span>
                    <span className="text-2xl font-bold text-pink-400">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

