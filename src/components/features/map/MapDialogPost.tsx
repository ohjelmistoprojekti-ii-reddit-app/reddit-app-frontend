import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapDialogPostProps } from "@/types/map.types";
import { RefreshCcwDot, TrendingUp } from "lucide-react";
import SentimentStatBox from "./SentimentStatBox";
import PostScoreStatBox from "./PostScoreStatBox";
import SentimentChart from "../topic/SentimentChart";
import DialogCommentSection from "./DialogCommentSection";
import { useState } from "react";


export default function MapDialogPost({ post }: MapDialogPostProps) {

    const [showTranslation, setShowTranslation] = useState<boolean>(true)
    const [showComments, setShowComments] = useState<boolean>(false)

    const chartData = [
        { name: "positive", value: post.sentiment_values.average_pos },
        { name: "neutral", value: post.sentiment_values.average_neu },
        { name: "negative", value: post.sentiment_values.average_neg },
    ];

    return(
        <Card className="py-10 px-6">
            <CardHeader className="flex flex-col">
                <CardTitle className="text-xl mb-2">
                    {showTranslation ? post.title_eng : post.title}
                </CardTitle>
                <div className="flex items-center justify-center gap-2">
                    <button 
                        onClick={() => setShowTranslation(!showTranslation)}
                        className="hover:text-orange-700"
                    ><RefreshCcwDot />
                    </button>
                    <p className="text-xs text-gray-500">{showTranslation ? "see original" : "see translation"}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    {showTranslation ? post.content_eng : post.content}
                </div>
                <div 
                    className="grid lg:grid-cols-2 md:grid-cols-1 place-items-center p-6 gap-6 bg-muted rounded-lg">
                    <div className="flex flex-col items-center gap-4">
                        <PostScoreStatBox title="score" content={post.score} icon={TrendingUp}/>
                        <SentimentStatBox compoundValue={post.sentiment_values.average_compound}/>
                    </div>
                    <div className="w-[250px] h-[250px]">
                        <SentimentChart data={chartData}/>
                    </div>
                </div>
                <DialogCommentSection
                    comments={showTranslation ? post.comments_eng : post.comments}
                    open={showComments}
                    setOpen={setShowComments}
                />
            </CardContent>
        </Card>
                    
    )
}