/**
 * @file CartSummary.tsx
 * @description 장바구니 요약 컴포넌트
 *
 * 장바구니의 총 금액을 계산하고 표시하는 컴포넌트
 */

import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/utils/formatPrice";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const total = items.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold text-white">주문 요약</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-white/70">
          <span>상품 개수</span>
          <span>{items.length}개</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>총 수량</span>
          <span>
            {items.reduce((sum, item) => sum + item.quantity, 0)}개
          </span>
        </div>
      </div>
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-white">총 금액</span>
          <span className="text-2xl font-bold text-pink-400">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

