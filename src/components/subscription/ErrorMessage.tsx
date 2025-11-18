import Link from "next/link";

export default function ErrorMessage({ msg }: { msg: string | null}) {
    return(
        <main className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Something went wrong!
                </h1>
                <p className="mt-3 text-gray-600">
                    Error: {msg}
                </p>
                <div className="mt-8 flex items-center justify-center flex-wrap gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}