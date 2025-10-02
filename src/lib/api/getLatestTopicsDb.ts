import { RedditTopic } from "@/types/topic.types"

export async function getLatestTopicsDb(subredditName: string): Promise<RedditTopic[]> {
    console.log('fetching...')
    
    const res = await fetch(`http://127.0.0.1:5000/posts/latest/${subredditName}`, {
        cache: "no-store"
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json()

    console.log('fetched')
    console.log(data)

    return data
}