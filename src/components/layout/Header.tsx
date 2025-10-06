import Link from "next/link"

export default function Header() {
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
            </ul>
          </nav>

          <div className="justify-self-end">
            <Link
              href="/signin"
              className="inline-flex items-center rounded-2xl px-5 py-2.5 text-white text-base font-semibold
                         bg-gradient-to-r from-orange-500 to-rose-500 shadow-md hover:shadow-lg
                         transition-shadow focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
