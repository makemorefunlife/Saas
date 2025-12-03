"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Share2, Palette, Sticker, Image as ImageIcon } from "lucide-react";

// 결과 데이터 (URL 파라미터에서 가져옴)
const getResult = (
  koreanName: string,
  meaning: string,
  type: string
) => {
  return {
    koreanName: koreanName || "채원",
    meaning: meaning || "Elegant and refined",
    type: type || "Trendy (Modern)",
  };
};

const getDesignTypeInfo = (designType: string) => {
  const types: Record<string, { name: string; icon: any; description: string }> = {
    tattoo: {
      name: "Tattoo Design",
      icon: Palette,
      description: "Fine line tattoo flash sheet",
    },
    sticker: {
      name: "Sticker",
      icon: Sticker,
      description: "Cute and colorful sticker",
    },
    wallpaper: {
      name: "Wallpaper",
      icon: ImageIcon,
      description: "Cyberpunk neon sign wallpaper",
    },
  };

  return types[designType] || types.tattoo;
};

function ResultContent() {
  const searchParams = useSearchParams();
  const koreanName = searchParams.get("koreanName") || "";
  const meaning = searchParams.get("meaning") || "";
  const type = searchParams.get("type") || "";
  const designType = searchParams.get("designType") || "tattoo";
  
  const result = getResult(koreanName, meaning, type);
  const designInfo = getDesignTypeInfo(designType);
  const DesignIcon = designInfo.icon;

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Your Korean Name Design
            </h1>
            
            {/* 디자인 타입 표시 */}
            <div className="flex items-center justify-center gap-2 text-pink-400">
              <DesignIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{designInfo.name}</span>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                <div className="text-6xl md:text-7xl font-bold text-white">
                  {result.koreanName}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl text-white/90">{result.meaning}</p>
                  <p className="text-sm text-white/60">{result.type}</p>
                  <p className="text-xs text-white/50 italic">{designInfo.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50"
            >
              <Download className="w-5 h-5" />
              Download {designInfo.name}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              <Share2 className="w-5 h-5" />
              Share on Instagram
            </Button>
          </div>

          <div className="text-sm text-white/60">
            <p>#{result.koreanName} #MyKoreanName #{designType}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}

