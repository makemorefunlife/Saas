/**
 * @file app/cart/page.tsx
 * @description 장바구니 페이지
 *
 * 사용자의 장바구니 아이템을 표시하고 관리하는 페이지
 */

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCartItems } from "@/lib/supabase/cart";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default async function CartPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const cartItems = await getCartItems(userId);

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          {/* 헤더 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              장바구니
            </h1>
            <p className="text-white/70">
              {cartItems.length}개의 상품이 담겨 있습니다
            </p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* 장바구니 아이템 목록 */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* 주문 요약 */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <CartSummary items={cartItems} />
                  <Link href="/checkout" className="block mt-4">
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50"
                    >
                      주문하기
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* 빈 장바구니 */
            <div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-white/10 bg-white/5 p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-white/30" />
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold text-white">
                  장바구니가 비어있습니다
                </p>
                <p className="text-white/70">
                  상품을 추가하여 쇼핑을 시작하세요
                </p>
              </div>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                >
                  상품 보러가기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

