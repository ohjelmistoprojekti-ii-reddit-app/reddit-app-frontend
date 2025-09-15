'use client';

import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <svg
          viewBox="0 0 400 140"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mx-auto mb-6 w-[320px] h-[112px] md:w-[400px] md:h-[140px]"
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontFamily="system-ui"
            fontWeight="800"
            fontSize="110"
            fill="black"
          >
            404
          </text>
        </svg>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Oops, page no found</h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Check addres or go back to previous page.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => (typeof window !== 'undefined' ? window.history.back() : null)}
              className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
            >
              Back
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 active:scale-[0.99]"
            >
              Home
            </Link>
          </div>
      </div>
    </main>
  );
}