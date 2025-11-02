import SubscriptionPost from "./SubscriptionPost"
import { PostsSubscriptionData } from "@/types/subscription.types"

export default function PostsDashboard({ data }: { data: PostsSubscriptionData }) {
    return(
        <>
            {data.posts.map((post) => (
                <SubscriptionPost key={post.id} post={post} />
            ))}
        </>
    )
}