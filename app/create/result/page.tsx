"use client";

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

export default function ResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Korean Name Design
          </h1>
          
          {/* 디자인 타입 표시 */}
          <div className="mb-4 flex items-center justify-center gap-2 text-pink-400">
            <DesignIcon className="w-5 h-5" />
            <span className="text-sm font-medium">{designInfo.name}</span>
          </div>

          <div className="bg-white/5 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-6xl md:text-7xl font-bold text-white mb-4">
              {result.koreanName}
            </div>
            <p className="text-xl text-white/90 mb-2">{result.meaning}</p>
            <p className="text-sm text-white/60 mb-4">{result.type}</p>
            <p className="text-xs text-white/50 italic">{designInfo.description}</p>
          </div>
        </div>

        <div className="space-y-4">
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

        <div className="mt-8 text-sm text-white/60">
          <p>#{result.koreanName} #MyKoreanName #{designType}</p>
        </div>
      </div>
    </main>
  );
}

