"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Ai Create
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-200 transition">
              หน้าแรก
            </Link>
            <Link href="/services" className="hover:text-blue-200 transition">
              บริการ
            </Link>
            <Link href="/portfolio" className="hover:text-blue-200 transition">
              ผลงาน
            </Link>
            <Link href="/blog" className="hover:text-blue-200 transition">
              บทความ
            </Link>
            <Link href="/faq" className="hover:text-blue-200 transition">
              FAQ
            </Link>
            <Link
              href="/cart"
              className="relative bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
            >
              ตะกร้า
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              หน้าแรก
            </Link>
            <Link href="/services" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              บริการ
            </Link>
            <Link href="/portfolio" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              ผลงาน
            </Link>
            <Link href="/blog" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              บทความ
            </Link>
            <Link href="/faq" className="block py-2 hover:text-blue-200" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
