import { PostsSubscriptionReponse, TopicsSubcriptionResponse } from "@/types/subscription.types";
import { useEffect, useState } from "react";
import { fetchWithTokenRefresh } from "@/lib/utils/tokenRefresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export default function useFetchSubscriptionData() {
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

                // Use fetchWithTokenRefresh to automatically refresh the token
                const res = await fetchWithTokenRefresh(
                    `${BASE_URL}/api/subscriptions/current-user/latest-analyzed`,
                    {
                        headers,
                        cache: "no-store",
                    }
                );

                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

                const json = await res.json();
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