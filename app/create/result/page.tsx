"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

// 임시 결과 데이터
const getResult = (name: string, optionId: string) => {
  const results: Record<string, any> = {
    a: {
      koreanName: "마채라",
      meaning: "Polished silk - refined and elegant",
      type: "Hanja (Traditional)",
    },
    b: {
      koreanName: "채원",
      meaning: "Elegant and refined",
      type: "Trendy (Modern)",
    },
    c: {
      koreanName: "마루",
      meaning: "Summit, peak",
      type: "Pure Korean",
    },
  };

  return results[optionId] || results.b;
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const optionId = searchParams.get("option") || "b";
  const result = getResult(name, optionId);

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Korean Name
          </h1>
          <div className="bg-white/5 border border-white/20 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-6xl md:text-7xl font-bold text-white mb-4">
              {result.koreanName}
            </div>
            <p className="text-xl text-white/90 mb-2">{result.meaning}</p>
            <p className="text-sm text-white/60">{result.type}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50"
          >
            <Download className="w-5 h-5" />
            Download Image
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
          <p>#{result.koreanName} #MyKoreanName</p>
        </div>
      </div>
    </main>
  );
}

