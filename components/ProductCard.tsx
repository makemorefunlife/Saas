/**
 * @file ProductCard.tsx
 * @description 상품 카드 컴포넌트
 *
 * 상품 정보를 카드 형태로 표시하는 컴포넌트
 * - 상품 이미지 (Next.js Image)
 * - 상품명, 가격, 카테고리 표시
 * - 호버 효과
 * - 클릭 시 상품 상세 페이지로 이동
 * - 장바구니 추가 버튼
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";
import { addToCart } from "@/lib/supabase/cart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(user.id, product.id, 1);
      router.refresh();
      alert("장바구니에 추가되었습니다.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("장바구니 추가에 실패했습니다.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group flex flex-col rounded-lg border border-white/10 bg-white/5 transition-all hover:border-pink-400/50 hover:bg-white/10">
      <Link href={`/products/${product.id}`} className="flex flex-col">
        {/* 상품 이미지 */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-white/5">
          <Image
            src="/placeholder-product.png"
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={(e) => {
              // 이미지 로드 실패 시 placeholder 배경만 표시
              e.currentTarget.style.display = "none";
            }}
          />
          {/* 이미지 로드 실패 시 표시할 플레이스홀더 */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
            <span className="text-4xl text-white/20">📦</span>
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="flex flex-col gap-3 p-4 md:p-6">
          {/* 카테고리 */}
          {product.category && (
            <span className="text-xs text-white/60 uppercase">
              {product.category}
            </span>
          )}

          {/* 상품명 */}
          <h3 className="text-lg font-semibold text-white line-clamp-2">
            {product.name}
          </h3>

          {/* 가격 */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-pink-400">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* 재고 상태 (선택사항) */}
          {product.stock_quantity === 0 && (
            <span className="text-sm text-white/50">품절</span>
          )}
        </div>
      </Link>

      {/* 장바구니 추가 버튼 */}
      <div className="p-4 md:p-6 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock_quantity === 0 || !isSignedIn}
          className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
          variant="outline"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAdding
            ? "추가 중..."
            : product.stock_quantity === 0
            ? "품절"
            : "장바구니 추가"}
        </Button>
      </div>
    </div>
  );
}

