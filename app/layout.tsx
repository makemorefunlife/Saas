import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
// Clerk 한국어 로컬라이제이션 (ko-KR)
// 기본 한국어 로컬라이제이션 사용
// 커스텀 로컬라이제이션이 필요하면 @/lib/clerk/localization에서 import
// @see https://clerk.com/docs/guides/customizing-clerk/localization
import { koKR } from "@clerk/localizations";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/Navbar";
import { SyncUserProvider } from "@/components/providers/sync-user-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS 템플릿",
  description: "Next.js + Clerk + Supabase 보일러플레이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={koKR}>
      {/* 
        한국어 로컬라이제이션 적용
        - Clerk 컴포넌트의 모든 텍스트가 한국어로 표시됩니다
        - 로그인, 회원가입, 프로필 등 모든 UI가 한국어로 번역됩니다
        - 참고: Clerk Account Portal은 여전히 영어로 표시됩니다
        @see https://clerk.com/docs/guides/customizing-clerk/localization
      */}
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SyncUserProvider>
            <Navbar />
            {children}
          </SyncUserProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
