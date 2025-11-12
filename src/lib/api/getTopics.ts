import { RedditTopic } from "@/types/topic.types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export async function getTopics(subredditName: string): Promise<RedditTopic[]> {
    console.log('fetching...')
    
    const res = await fetch(`${BASE_URL}/api/live-data/topics/${subredditName}`, {
        cache: "no-store"
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json()

    console.log('fetched')
    console.log(data)

    return data
}