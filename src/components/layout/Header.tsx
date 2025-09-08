import Link from "next/link"

export default function Header() {
    return(
        <div className="flex items-center justify-between px-10 border-black/50 border-b h-[60px]">
            <div className="text-xl font-bold">Reddit Analyzer</div>
            <ul className="flex items-center gap-6">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    Sign in
                </li>
            </ul>
        </div>
    )
}