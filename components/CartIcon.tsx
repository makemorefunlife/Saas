/**
 * @file CartIcon.tsx
 * @description 장바구니 아이콘 컴포넌트
 *
 * Navbar에 표시되는 장바구니 아이콘
 * 장바구니 아이템 개수를 표시합니다.
 */

"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartItems } from "@/lib/supabase/cart";

export default function CartIcon() {
  const { user, isSignedIn } = useUser();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (!isSignedIn || !user) {
      setItemCount(0);
      return;
    }

    async function fetchCartCount() {
      try {
        const items = await getCartItems(user.id);
        const totalQuantity = items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setItemCount(totalQuantity);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    }

    fetchCartCount();

    // 주기적으로 장바구니 개수 업데이트 (5초마다)
    const interval = setInterval(fetchCartCount, 5000);

    return () => clearInterval(interval);
  }, [isSignedIn, user]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
    >
      <ShoppingCart className="w-5 h-5 text-white" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-pink-500 text-white text-xs font-bold">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

