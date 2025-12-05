/**
 * @file app/checkout/success/page.tsx
 * @description 주문 완료 페이지
 *
 * 주문이 성공적으로 완료되었음을 표시하는 페이지
 */

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOrderWithItems } from "@/lib/supabase/orders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatPrice";

interface SuccessPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { orderId } = await searchParams;

  if (!orderId) {
    redirect("/");
  }

  let order;
  let items;

  try {
    const result = await getOrderWithItems(orderId, userId);
    order = result.order;
    items = result.items;
  } catch (error) {
    console.error("Error fetching order:", error);
    redirect("/");
  }

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 py-8 md:py-16">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col gap-8">
          {/* 성공 메시지 */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                주문이 완료되었습니다
              </h1>
              <p className="text-white/70">
                주문번호: {order.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>

          {/* 주문 정보 요약 */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">
                  주문 정보
                </h2>
                <div className="flex flex-col gap-2 text-white/70">
                  <div className="flex justify-between">
                    <span>주문 상태</span>
                    <span className="text-white">
                      {order.status === "pending" ? "대기중" : order.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 결제금액</span>
                    <span className="text-pink-400 font-bold">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>

              {items.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold text-white mb-3">
                    주문 상품
                  </h3>
                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-white/70"
                      >
                        <span>
                          {item.product_name} x {item.quantity}
                        </span>
                        <span className="text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col gap-3">
            <Link href="/orders" className="w-full">
              <Button
                size="lg"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50"
              >
                주문 내역 보기
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg font-semibold border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                쇼핑 계속하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

