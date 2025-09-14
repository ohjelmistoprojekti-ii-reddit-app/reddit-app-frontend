import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicCardProps } from "@/types/topic.types";
import { DynamicIcon } from 'lucide-react/dynamic';

export default function TopicCard({ topic } : TopicCardProps) {
    // Velocity, up/down/flat sign, pct and badge class commented out for until decided what to eventually display in TopicCard

    // const v = topic.velocity ?? 0
    const c = topic.sentiment_values.average_compound
    // const sign = v > 0 ? "↑" : v < 0 ? "↓" : "→"
    // const pct = Math.round(Math.abs(v) * 100)
    // const badgeClass =
    // v > 0
    //     ? "text-green-700 border-green-200"
    //     : v < 0
    //     ? "text-red-700 border-red-200"
    //     : "text-gray-600 border-gray-200"
    const smileyIcon =
    c >= 0.05
        ? "smile"
        : c <= -0.05
        ? "frown"
        : "meh"
    const compoundDisplayText =
    c >= 0.05
        ? "positive"
        : c <= -0.05
        ? "negative"
        : "neutral"

    return(
        <Card>
            <CardHeader className="flex gap-4 justify-between space-y-0 pb-2">
                <CardTitle className="text-l">
                    {topic.topic.map(name => 
                        <p key={name}>{name}</p>
                    )}
                </CardTitle>
                <div className="flex flex-col items-center">
                    <DynamicIcon name={smileyIcon}/>
                    <span className="text-xs text-gray-500 mt-2">
                        {topic.sentiment_values.average_compound}
                    </span>
                    <span className="text-xs text-gray-500">
                        {compoundDisplayText}
                    </span>
                </div>
                
            </CardHeader>
            <CardContent className="text-sm">
                Positive: {topic.sentiment_values.average_pos} • 
                Neutral: {topic.sentiment_values.average_neu} • 
                Negative: {topic.sentiment_values.average_neg}
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <div className="text-xs text-gray-500">
                    {topic.num_posts} posts • {topic.sentiment_values.comment_count} comments
                </div>
                {/* <span
                    className={`text-xs rounded px-2 py-0.5 border ${badgeClass}`}
                    >
                    {pct} % {sign}
                </span> */}
            </CardFooter>
        </Card>
        
    )
}