/**
 * @file CartItem.tsx
 * @description 장바구니 아이템 컴포넌트
 *
 * 장바구니 페이지에서 개별 상품을 표시하는 컴포넌트
 * 수량 변경 및 삭제 기능 포함
 */

"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/types/cart";
import { formatPrice } from "@/lib/utils/formatPrice";
import { updateCartItem, removeFromCart } from "@/lib/supabase/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CartItemProps {
  item: CartItem;
  onUpdate?: () => void;
}

export default function CartItemComponent({ item, onUpdate }: CartItemProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!item.product) {
    return null;
  }

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }

    setIsUpdating(true);
    try {
      await updateCartItem(item.id, newQuantity);
      onUpdate?.();
      router.refresh();
    } catch (error) {
      console.error("Error updating cart item:", error);
      alert("수량 변경에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("장바구니에서 이 상품을 삭제하시겠습니까?")) {
      return;
    }

    setIsRemoving(true);
    try {
      await removeFromCart(item.id);
      onUpdate?.();
      router.refresh();
    } catch (error) {
      console.error("Error removing cart item:", error);
      alert("상품 삭제에 실패했습니다.");
    } finally {
      setIsRemoving(false);
    }
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/5 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* 상품 이미지 */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white/5 md:w-24 md:flex-shrink-0">
          <Image
            src="/placeholder-product.png"
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="96px"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
            <span className="text-2xl text-white/20">📦</span>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg font-semibold text-white">
            {item.product.name}
          </h3>
          {item.product.category && (
            <span className="text-xs text-white/60 uppercase">
              {item.product.category}
            </span>
          )}
          <div className="text-xl font-bold text-pink-400">
            {formatPrice(item.product.price)}
          </div>
        </div>

        {/* 수량 조절 및 삭제 */}
        <div className="flex flex-col gap-4 md:items-end">
          {/* 수량 조절 */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-8 w-8"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center text-white font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white h-8 w-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* 소계 및 삭제 */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-white/60">소계</div>
              <div className="text-xl font-bold text-pink-400">
                {formatPrice(subtotal)}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRemove}
              disabled={isRemoving}
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

