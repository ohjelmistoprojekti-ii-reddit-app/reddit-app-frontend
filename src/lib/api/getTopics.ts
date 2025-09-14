import { RedditTopic } from "@/types/topic.types"

export async function getTopics(subredditName: string, postType: string, numberOfPosts: number): Promise<RedditTopic[]> {
    console.log('fetching...')
    
    const res = await fetch(`http://127.0.0.1:5000/posts/${subredditName}/${postType}/` + numberOfPosts.toString(), {
        cache: "no-store"
    });

    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json()

    console.log('fetched')
    console.log(data)

    return data
}