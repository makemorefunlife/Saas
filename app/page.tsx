import { getFeaturedProducts } from "@/lib/supabase/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4 py-8 md:py-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
        {/* My Korean Name 섹션 */}
        <section className="w-full max-w-2xl mx-auto flex flex-col gap-12 items-center text-center">
          {/* 메인 헤드라인 */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
              Get Your
              <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Korean Name Destiny
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
              AI-powered Korean name generator. Get your personalized name with meaning and beautiful designs in 1 minute.
            </p>
          </div>

          {/* 가치 제안 (3가지) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-pink-400" />
              <h3 className="font-semibold text-white">Fast</h3>
              <p className="text-sm text-white/70">1 minute to get your name</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h3 className="font-semibold text-white">Meaningful</h3>
              <p className="text-sm text-white/70">Not just letters, but destiny</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
              <Share2 className="w-8 h-8 text-pink-400" />
              <h3 className="font-semibold text-white">Shareable</h3>
              <p className="text-sm text-white/70">Instagram-ready designs</p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            <Link href="/create" className="w-full">
              <Button 
                size="lg" 
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all"
              >
                Start Your Journey →
              </Button>
            </Link>
            <p className="text-sm text-white/60">
              Scan QR code at pop-up store or start online
            </p>
          </div>

          {/* 예시 */}
          <div className="p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm w-full">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-white/70">Example:</p>
              <div className="flex items-center justify-center gap-3 text-lg">
                <span className="text-white/60">Marchella</span>
                <span className="text-white/40">→</span>
                <span className="font-bold text-pink-400">채원</span>
                <span className="text-white/60 text-sm">(Elegant & Refined)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 상품 진입 섹션 */}
        {featuredProducts.length > 0 && (
          <section className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                인기 상품
              </h2>
              <p className="text-white/70">
                지금 가장 인기 있는 상품들을 만나보세요
              </p>
            </div>

            {/* 인기 상품 그리드 */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* 모든 상품 보기 버튼 */}
            <div className="flex justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                >
                  모든 상품 보기
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
