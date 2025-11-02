"use client"

import SubscriptionSection from "@/components/subscription/SubscriptionSection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/subscription/Loader";

export default function SubscriptionPage() {

    const [isAuthenticated, setIsAuthenticated] = useState<Boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        
        if(!token) {
            router.replace("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router])

    if(isAuthenticated === null) return <Loader />

    return <SubscriptionSection />
}