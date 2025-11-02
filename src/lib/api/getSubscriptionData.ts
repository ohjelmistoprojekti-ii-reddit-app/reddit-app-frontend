import { PostsSubscriptionReponse, TopicsSubcriptionResponse } from "@/types/subscription.types";
import { useEffect, useState } from "react";

export default function getSubscriptionData() {

    const [data, setData] = useState<TopicsSubcriptionResponse | PostsSubscriptionReponse| null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    async function fetchData() {
        try {
            const token = localStorage.getItem("access_token");

            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            const res = await fetch(`http://127.0.0.1:5000/subscriptions/current-user/latest-analyzed`, {
                headers,
                cache: "no-store",
            });

        
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

            const json = await res.json();
            console.log(json);
            setData(json);
        } catch (err) {
                setError((err as Error).message);
        } finally {
                setLoading(false);
        }
    }
    fetchData();
    }, []);

    return { data, error, loading }
    
}