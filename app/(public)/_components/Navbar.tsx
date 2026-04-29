"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Desktop & tablet navbar (md and up) */}
      <div className="fixed left-[50%] top-0 z-50 hidden h-[70px] w-full -translate-x-[50%] items-center justify-between px-4 text-white backdrop-blur-3xl md:flex md:px-6 lg:px-10">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
            <Sparkles className="h-5 w-5 text-[#F6C177]" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Impact Draw</p>
            <p className="text-xs text-white/45">Golf × Charity × Prize Pool</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8 text-sm text-white/70">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#charities" className="transition hover:text-white">
            Charities
          </a>
          <a href="#pricing" className="transition hover:text-white">
            Pricing
          </a>
          <a href="#results" className="transition hover:text-white">
            Results
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/8 hover:text-white"
          >
            Log in
          </Button>
          <Button className="rounded-full bg-white px-5 text-black hover:bg-white/90">
            Start your journey
          </Button>
        </div>
      </div>

      {/* Mobile navbar (below md) */}
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-3 text-white backdrop-blur-3xl md:hidden">
        {/* Logo (simplified for mobile) */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/8">
            <Sparkles className="h-4 w-4 text-[#F6C177]" />
          </div>
          <p className="text-sm font-semibold leading-tight">Impact Draw</p>
        </div>

        {/* Hamburger button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="relative z-50 flex flex-col items-center justify-center"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu (slide-down / overlay) - no framer-motion, just CSS conditional rendering */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu panel */}
          <div className="absolute right-4 top-20 w-[calc(100vw-2rem)] max-w-[320px] rounded-2xl border border-white/10 bg-[#1a1a1a]/98 p-4 shadow-xl backdrop-blur-3xl">
            <ul className="space-y-2">
              <li>
                <a
                  href="#how-it-works"
                  onClick={closeMobileMenu}
                  className="block py-2 text-base font-medium text-white/70 transition hover:text-white"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#charities"
                  onClick={closeMobileMenu}
                  className="block py-2 text-base font-medium text-white/70 transition hover:text-white"
                >
                  Charities
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={closeMobileMenu}
                  className="block py-2 text-base font-medium text-white/70 transition hover:text-white"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#results"
                  onClick={closeMobileMenu}
                  className="block py-2 text-base font-medium text-white/70 transition hover:text-white"
                >
                  Results
                </a>
              </li>
            </ul>

            <div className="my-3 h-px w-full bg-white/10" />

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                className="w-full justify-center text-white hover:bg-white/8 hover:text-white"
                onClick={closeMobileMenu}
              >
                Log in
              </Button>
              <Button
                className="w-full justify-center rounded-full bg-white px-5 text-black hover:bg-white/90"
                onClick={closeMobileMenu}
              >
                Start your journey
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
