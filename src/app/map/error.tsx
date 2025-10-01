'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function mapError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const router = useRouter();

    useEffect(() => {
        }, [error]);


    return (
        <main className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Something went wrong!
                </h1>
                <p className="mt-3 text-gray-600">
                Sorry! An unexpected error has occurred. Please try again later.
                </p>
                <div className="mt-8 flex items-center justify-center flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 active:scale-[0.99]"
                    >
                        Try again
                    </button>
                    <Link
                        href="/map"
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
                    >
                        Back to World Map
                    </Link>
                </div>
            </div>
        </main>
    );
}