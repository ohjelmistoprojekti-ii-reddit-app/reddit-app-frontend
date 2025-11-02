"use client"

// Dialog loading spinner animated dots were produced with the help of ChatGPT

import { useEffect, useState } from "react"

export default function Loader() {
    const [dots, setDots] = useState(".")
    
        useEffect(() => {
            const interval = setInterval(() => {
            setDots((prev) => (prev.length === 3 ? "." : prev + "."))
            }, 500)
            return () => clearInterval(interval)
        }, [])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            <div className="relative animate-spin ease-linear rounded-full border-8 border-primary/30 border-t-primary h-32 w-32 mb-6 z-10"></div>
            <h2 className="text-center text-xl font-semibold text-primary z-10"> Loading{dots}</h2>
        </div>
    )
}



