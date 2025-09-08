import TopicCard from "./TopicCard";
import { TopicsGridProps } from "@/types/topic.types";

export default function TopicsGrid({ topics } : TopicsGridProps) {
    
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-10 w-full">
            {topics?.map((t) => (
                <TopicCard 
                    key={t.id}
                    topic={t}
                />
            ))}
        </div>
    )
}

