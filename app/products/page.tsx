/**
 * @file app/products/page.tsx
 * @description 상품 목록 페이지
 *
 * Grid 레이아웃으로 상품 목록을 표시하는 Server Component
 * - Supabase에서 활성화된 상품 조회
 * - 반응형 Grid 레이아웃 (모바일 1열, 태블릿 2열, 데스크톱 3열, 큰 화면 4열)
 * - 빈 상태 UI 처리
 */

import { getProducts } from "@/lib/supabase/products";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          {/* 헤더 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              상품 목록
            </h1>
            <p className="text-white/70">
              {products.length}개의 상품이 있습니다
            </p>
          </div>

          {/* 상품 그리드 */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* 빈 상태 */
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-lg text-white/70">상품이 없습니다</p>
              <p className="text-sm text-white/50">
                곧 새로운 상품이 추가될 예정입니다
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

