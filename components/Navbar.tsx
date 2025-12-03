"use client";

import { SignedOut, SignInButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-7xl mx-auto">
      <Link href="/" className="text-2xl font-bold">
        SaaS Template
      </Link>
      <div className="flex gap-4 items-center">
        {!isSignedIn && (
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/">
              <Button>로그인</Button>
            </SignInButton>
          </SignedOut>
        )}
        {isSignedIn && (
          <SignedIn>
            <UserButton />
          </SignedIn>
        )}
      </div>
    </header>
  );
};

export default Navbar;
