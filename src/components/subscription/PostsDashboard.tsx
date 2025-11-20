import SubscriptionPost from "./SubscriptionPost"
import { PostsSubscriptionData } from "@/types/subscription.types"

export default function PostsDashboard({ data }: { data: PostsSubscriptionData }) {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10 w-full">
            {data.posts.map((post) => (
                <SubscriptionPost key={post.id} post={post} />
            ))}
        </div>
    )
}