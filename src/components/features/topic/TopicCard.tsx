import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicCardProps } from "@/types/topic.types";

export default function TopicCard({ topic } : TopicCardProps) {
    const v = topic.velocity ?? 0
    const sign = v > 0 ? "↑" : v < 0 ? "↓" : "→"
    const pct = Math.round(Math.abs(v) * 100)
    const badgeClass =
    v > 0
        ? "text-green-700 border-green-200"
        : v < 0
        ? "text-red-700 border-red-200"
        : "text-gray-600 border-gray-200"
                
    return(
        <Card>
            <CardHeader className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <CardTitle>
                    <a 
                        href={`/topic/${encodeURIComponent(topic.name)}`}
                        className="font-medium hover:underline">
                        {topic.name}    
                    </a>
                </CardTitle>
                <span
                    className={`text-xs rounded px-2 py-0.5 border ${badgeClass}`}
                    >
                    {pct}% {sign}
                </span>
            </CardHeader>
            <CardContent>
                Something
            </CardContent>
            <CardFooter className="text-xs text-gray-500">
                {topic.posts} posts • {topic.score} net score
            </CardFooter>
        </Card>
        
    )
}