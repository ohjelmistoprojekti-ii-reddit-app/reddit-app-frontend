"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export default function UnsubscribeButton() {
    const[loading, setLoading] = useState(false);

    const router = useRouter();

    const handleUnsubscribe = async() => {
        setLoading(true);

        const token = localStorage.getItem("access_token");

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        try {
            const res = await fetch(`${BASE_URL}/api/subscriptions/current-user/deactivate`, {
                method: "PATCH",
                headers
            })

            if (!res.ok) throw new Error("Failed to subscribe to subreddit");

            toast.success("Successfully unsubscribed");

        } catch (error) {
            toast.error("Error while unsubscribing");
        } finally {
            setLoading(false);
            router.replace("/subscribe");
        }
    }

    return(
        <Button
            onClick={handleUnsubscribe}
            disabled={loading}
            variant="secondary"
        >
            {loading? "Unsubscribing" : "Unsubscribe"}
        </Button>
    )
}