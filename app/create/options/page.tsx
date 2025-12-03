"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";

// 임시 데이터 (나중에 AI로 생성)
const generateOptions = (name: string, keyword: string) => {
  const nameLower = name.toLowerCase();
  
  return [
    {
      id: "a",
      type: "Hanja (Traditional)",
      koreanName: "마채라",
      meaning: "Polished silk - refined and elegant",
      description: "Based on sound similarity with deep traditional meaning",
    },
    {
      id: "b",
      type: "Trendy (Modern)",
      koreanName: "채원",
      meaning: "Elegant and refined",
      description: "Contemporary Korean name style",
    },
    {
      id: "c",
      type: "Pure Korean",
      koreanName: "마루",
      meaning: "Summit, peak",
      description: "Pure Korean word with natural imagery",
    },
  ];
};

export default function OptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const keyword = searchParams.get("keyword") || "";
  
  const [options, setOptions] = useState<ReturnType<typeof generateOptions>>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로딩 애니메이션 (10-15초)
    const timer = setTimeout(() => {
      const generatedOptions = generateOptions(name, keyword);
      setOptions(generatedOptions);
      setIsLoading(false);
    }, 2000); // 개발용으로 2초, 실제로는 10-15초

    return () => clearTimeout(timer);
  }, [name, keyword]);

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (selectedOption) {
      router.push(`/create/result?name=${encodeURIComponent(name)}&option=${selectedOption}`);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="relative">
            <Sparkles className="w-16 h-16 text-pink-400 mx-auto animate-pulse" />
            <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Carving your destiny...
            </h2>
            <p className="text-white/70">
              AI is creating your Korean name options
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Choose Your Korean Name
          </h1>
          <p className="text-white/70">
            Select the name that resonates with you
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`w-full p-6 rounded-lg border-2 text-left transition-all ${
                selectedOption === option.id
                  ? "border-pink-400 bg-pink-400/10 shadow-lg shadow-pink-400/20"
                  : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-pink-400 bg-pink-400/10 px-3 py-1 rounded-full">
                      Option {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-xs text-white/60">{option.type}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {option.koreanName}
                  </h3>
                  <p className="text-white/90 font-medium mb-1">
                    {option.meaning}
                  </p>
                  <p className="text-sm text-white/60">
                    {option.description}
                  </p>
                </div>
                {selectedOption === option.id && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedOption}
          size="lg"
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with Selected Name
        </Button>
      </div>
    </main>
  );
}

