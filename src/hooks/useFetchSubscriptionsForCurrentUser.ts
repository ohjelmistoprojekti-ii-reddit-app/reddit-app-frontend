import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

type UserSubscription = {
    subreddit: String
    analysis_type: String
    active: Boolean
}

export default function useFetchSubscriptionsForCurrentUser() {
    const [data, setData] = useState<UserSubscription[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
        useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem("access_token");

                const headers: HeadersInit = {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                };

                const res = await fetch(`${BASE_URL}/api/subscriptions/current-user`, {
                    headers,
                    cache: "no-store",
                });

                if (res.status === 404) setNotFound(true);

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

    return { data, error, loading, notFound };
}