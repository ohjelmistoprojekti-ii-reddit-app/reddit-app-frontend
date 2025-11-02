"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [isAuthed, setIsAuthed] = useState(false);
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

  function handleSignOut() {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    } catch {}
    setIsAuthed(false);
    router.push("/");
  }

  return (
    <header className="bg-white border-b border-border/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[64px]">
          <Link href="/" className="font-extrabold text-2xl leading-none">
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Reddit Analyzer
            </span>
          </Link>

          <nav className="justify-self-center">
            <ul className="flex items-center gap-12 text-lg text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="hover:text-foreground transition-colors"
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="hover:text-foreground transition-colors"
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
                  className="text-base font-medium hover:underline"
                  title="Go to your account"
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center rounded-2xl px-5 py-2.5 text-white text-base font-semibold
                             bg-gradient-to-r from-rose-500 to-orange-500 shadow-md hover:shadow-lg
                             transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center rounded-2xl px-5 py-2.5 text-white text-base font-semibold
                           bg-gradient-to-r from-orange-500 to-rose-500 shadow-md hover:shadow-lg
                           transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

