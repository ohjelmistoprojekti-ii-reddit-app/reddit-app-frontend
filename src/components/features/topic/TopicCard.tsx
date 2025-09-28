import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicCardProps } from "@/types/topic.types";
import { DynamicIcon } from 'lucide-react/dynamic';
import SentimentChart from "./SentimentChart";

export default function TopicCard({ topic } : TopicCardProps) {
    
    const chartData = [
        { name: "positive", value: topic.sentiment_values.average_pos, fill: "var(--color-positive)" },
        { name: "neutral", value: topic.sentiment_values.average_neu, fill: "var(--color-neutral)" },
        { name: "negative", value: topic.sentiment_values.average_neg, fill: "var(--color-negative)" },
    ];

    const c = topic.sentiment_values.average_compound
    
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
                {/* Positive: {topic.sentiment_values.average_pos} • 
                Neutral: {topic.sentiment_values.average_neu} • 
                Negative: {topic.sentiment_values.average_neg} */}
                <SentimentChart data={chartData}/>
            </CardContent>
            <CardFooter className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <div className="text-xs text-gray-500">
                    {topic.num_posts} posts • {topic.sentiment_values.comment_count} comments
                </div>
            </CardFooter>
        </Card>
        
    )
}