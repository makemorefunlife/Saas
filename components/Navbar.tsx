"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-7xl mx-auto border-b border-white/10">
      <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        My Korean Name
      </Link>
      <div className="text-sm text-white/70">
        #MyKoreanName
      </div>
    </header>
  );
};

export default Navbar;
