"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight } from "lucide-react";

const KEYWORDS = [
  { id: "elegant", label: "Elegant", emoji: "✨" },
  { id: "strong", label: "Strong", emoji: "💪" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "peaceful", label: "Peaceful", emoji: "🕊️" },
  { id: "adventurous", label: "Adventurous", emoji: "🏔️" },
];

export default function CreatePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !selectedKeyword) {
      return;
    }

    setIsGenerating(true);
    
    // 이름 생성 로직 (나중에 AI 연동)
    // 일단 옵션 선택 페이지로 이동
    setTimeout(() => {
      router.push(`/create/options?name=${encodeURIComponent(name)}&keyword=${selectedKeyword}`);
    }, 500);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Create Your Korean Name
              </h1>
              <p className="text-white/70">
                Enter your name and choose a keyword that represents you
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* 이름 입력 */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/90">
              Your Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Marchella"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-pink-400 focus:ring-pink-400/50"
              required
            />
          </div>

          {/* 키워드 선택 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/90 block">
              Choose a Keyword
            </label>
            <div className="grid grid-cols-2 gap-3">
              {KEYWORDS.map((keyword) => (
                <button
                  key={keyword.id}
                  type="button"
                  onClick={() => setSelectedKeyword(keyword.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedKeyword === keyword.id
                      ? "border-pink-400 bg-pink-400/10 shadow-lg shadow-pink-400/20"
                      : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-2xl">{keyword.emoji}</div>
                    <div className="text-sm font-medium text-white">
                      {keyword.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            disabled={!name.trim() || !selectedKeyword || isGenerating}
            size="lg"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                Generate Options
                <ArrowRight className="w-5 h-5" />
              </>
            )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

