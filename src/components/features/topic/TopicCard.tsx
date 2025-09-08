import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicCardProps } from "@/types/topic.types";
import { DynamicIcon } from 'lucide-react/dynamic';
import { Smile, Meh, Frown } from 'lucide-react';

export default function TopicCard({ topic } : TopicCardProps) {
    const v = topic.velocity ?? 0
    const s = topic.sentiment_scores.sentiment
    const sign = v > 0 ? "↑" : v < 0 ? "↓" : "→"
    const pct = Math.round(Math.abs(v) * 100)
    const badgeClass =
    v > 0
        ? "text-green-700 border-green-200"
        : v < 0
        ? "text-red-700 border-red-200"
        : "text-gray-600 border-gray-200"
    const smileyIcon =
    s === "positive"
        ? "smile"
        : s === "neutral"
        ? "meh"
        : "frown"

    return(
        <Card>
            <CardHeader className="flex gap-4 justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">
                    <a 
                        href={`/topic/${encodeURIComponent(topic.name)}`}
                        className="font-medium hover:underline">
                        {topic.name}    
                    </a>
                </CardTitle>
                <div className="flex flex-col items-center">
                    <DynamicIcon name={smileyIcon}/>
                    <span className="text-xs text-gray-500 mt-2">
                        {(topic.sentiment_scores.compound * 100).toFixed(0)} %
                    </span>
                    <span className="text-xs text-gray-500">
                        {s}
                    </span>
                </div>
                
            </CardHeader>
            <CardContent className="text-sm">
                Positive: {topic.sentiment_scores.pos} • Neutral: {topic.sentiment_scores.neu} • Negative: {topic.sentiment_scores.neg}
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <div className="text-xs text-gray-500">
                    {topic.posts} posts • {topic.score} net score
                </div>
                <span
                    className={`text-xs rounded px-2 py-0.5 border ${badgeClass}`}
                    >
                    {pct} % {sign}
                </span>
            </CardFooter>
        </Card>
        
    )
}