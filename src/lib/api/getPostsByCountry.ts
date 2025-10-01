import { CountryTopPost } from "@/types/map.types";

export async function getPostsByCountry(subredditName: string): Promise<CountryTopPost[]> {
    try {
        console.log('fetching...')
    
        const res = await fetch(`http://127.0.0.1:5000/posts/${subredditName}`, {
            cache: "no-store"
        });

        const data = await res.json()

        console.log('fetched')
        console.log(data)

        return data
        
    } catch (error) {
        console.error("getPostsByCountry error:", error)

        return []
    }
    
}