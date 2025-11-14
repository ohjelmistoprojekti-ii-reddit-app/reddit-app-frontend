"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function check() {
      try {
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("access_token")
            : null;
        setIsAuthed(!!token);
      } catch {}
    }
    check();

    function onStorage(e: StorageEvent) {
      if (e.key === "access_token" || e.key === "refresh_token") check();
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  function handleSignOut() {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } catch {}
    setIsAuthed(false);
    setMobileMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="bg-white border-b border-border/60 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center h-[64px]">
          <Link href="/" className="font-extrabold text-2xl leading-none">
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Reddit Analyzer
            </span>
          </Link>

          <nav className="justify-self-center">
            <ul className="flex items-center gap-8 lg:gap-12 text-base lg:text-lg text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className={`hover:text-foreground transition-colors ${
                    pathname === "/" ? "text-foreground font-medium" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className={`hover:text-foreground transition-colors ${
                    pathname === "/map" ? "text-foreground font-medium" : ""
                  }`}
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className={`hover:text-foreground transition-colors ${
                    pathname === "/subscription" ? "text-foreground font-medium" : ""
                  }`}
                >
                  Subscription
                </Link>
              </li>
            </ul>
          </nav>

          <div className="justify-self-end">
            {isAuthed ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm lg:text-base font-medium hover:underline"
                  title="Go to your account"
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center rounded-2xl px-4 lg:px-5 py-2 lg:py-2.5 text-white text-sm lg:text-base font-semibold
                             bg-gradient-to-r from-rose-500 to-orange-500 shadow-md hover:shadow-lg
                             transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center rounded-2xl px-4 lg:px-5 py-2 lg:py-2.5 text-white text-sm lg:text-base font-semibold
                           bg-gradient-to-r from-orange-500 to-rose-500 shadow-md hover:shadow-lg
                           transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between h-[64px]">
          <Link href="/" className="font-extrabold text-xl leading-none">
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Reddit Analyzer
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                href="/map"
                className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/map"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Map
              </Link>
              <Link
                href="/subscription"
                className={`px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                  pathname === "/subscription"
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Subscription
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                {isAuthed ? (
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/"
                      className="px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="mx-4 py-2.5 text-white text-base font-semibold rounded-2xl
                                 bg-gradient-to-r from-rose-500 to-orange-500 shadow-md
                                 transition-shadow"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="mx-4 block text-center py-2.5 text-white text-base font-semibold rounded-2xl
                               bg-gradient-to-r from-orange-500 to-rose-500 shadow-md
                               transition-shadow"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

