"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Palette, Sticker, Image as ImageIcon, ArrowRight } from "lucide-react";

const DESIGN_TYPES = [
  {
    id: "tattoo",
    name: "Tattoo Design",
    description: "Fine line tattoo flash sheet style",
    emoji: "🎨",
    icon: Palette,
    preview: "Minimalist tattoo design",
  },
  {
    id: "sticker",
    name: "Sticker",
    description: "Cute and colorful sticker design",
    emoji: "✨",
    icon: Sticker,
    preview: "Playful sticker style",
  },
  {
    id: "wallpaper",
    name: "Wallpaper",
    description: "Cyberpunk neon sign wallpaper",
    emoji: "🌃",
    icon: ImageIcon,
    preview: "Neon sign background",
  },
];

function DesignTypeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const optionId = searchParams.get("option") || "";
  const koreanName = searchParams.get("koreanName") || "";

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    if (selectedType) {
      const meaning = searchParams.get("meaning") || "";
      const type = searchParams.get("type") || "";
      router.push(
        `/create/result?name=${encodeURIComponent(name)}&option=${optionId}&koreanName=${encodeURIComponent(koreanName)}&meaning=${encodeURIComponent(meaning)}&type=${encodeURIComponent(type)}&designType=${selectedType}`
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Choose Your Design Style
          </h1>
          <p className="text-white/70">
            Select how you want to display your Korean name
          </p>
        </div>

        {/* 선택한 이름 미리보기 */}
        {koreanName && (
          <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
            <p className="text-sm text-white/60 mb-1">Your Korean Name</p>
            <p className="text-2xl font-bold text-white">{koreanName}</p>
          </div>
        )}

        {/* 디자인 타입 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {DESIGN_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedType === type.id
                    ? "border-pink-400 bg-pink-400/10 shadow-lg shadow-pink-400/20"
                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="text-4xl">{type.emoji}</div>
                  <Icon className="w-8 h-8 text-pink-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {type.name}
                    </h3>
                    <p className="text-sm text-white/70">{type.description}</p>
                  </div>
                  {selectedType === type.id && (
                    <div className="mt-2">
                      <div className="w-6 h-6 rounded-full bg-pink-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue 버튼 */}
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with Selected Design
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </main>
  );
}

export default function DesignTypePage() {
  return (
    <Suspense fallback={
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      </main>
    }>
      <DesignTypeContent />
    </Suspense>
  );
}

