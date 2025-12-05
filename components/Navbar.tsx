"use client";

import Link from "next/link";
import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CartIcon from "@/components/CartIcon";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-7xl mx-auto border-b border-white/10">
      <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        My Korean Name
      </Link>
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-sm text-white/70">
          #MyKoreanName
        </div>
        <SignedIn>
          <CartIcon />
        </SignedIn>
        <SignedOut>
          <SignInButton 
            mode="modal"
            appearance={{
              elements: {
                rootBox: "mx-auto",
                modalContent: "bg-black border-white/20",
                card: "bg-black border-white/20",
                headerTitle: "text-white",
                headerSubtitle: "text-white/70",
                socialButtonsBlockButton: "bg-white/5 border-white/20 text-white hover:bg-white/10",
                socialButtonsBlockButtonText: "text-white",
                formButtonPrimary: "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 hover:from-pink-600 hover:via-purple-600 hover:to-pink-600",
              },
            }}
          >
            <Button 
              variant="outline" 
              className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
            >
              Sign in with Google
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
