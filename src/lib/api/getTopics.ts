import { Topic } from "@/types/topic.types"

export async function getTopics(): Promise<Topic[]> {
    const res = await fetch("http://localhost:3000/api/trending", {
        cache: "no-store"
    });
    
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json()
    return data.topics
}