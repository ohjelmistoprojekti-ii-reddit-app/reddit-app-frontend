"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrendingUp } from "lucide-react"
import DialogCommentSection from "../features/map/DialogCommentSection"
import PostScoreStatBox from "../features/map/PostScoreStatBox"
import SentimentStatBox from "../features/map/SentimentStatBox"
import SentimentChart from "../features/topic/SentimentChart"
import { PostsProps } from "@/types/subscription.types"
import { trimPostContent } from "@/lib/utils"
import PostMediaPreview from "./PostMediaPreview"


export default function SubscriptionPost({ post }: PostsProps) {

    const [showComments, setShowComments] = useState<boolean>(false)
    const [expandedContent, setExpandedContent] = useState<boolean>(false)

     const chartData = [
        { name: "positive", value: post.sentiment_values.average_pos },
        { name: "neutral", value: post.sentiment_values.average_neu },
        { name: "negative", value: post.sentiment_values.average_neg },
    ];

    const showMoreContent = post.content && post.content.length > 240;
    const mediaAvailable = post.content_link && post.link && post.content_link !== post.link;

    return(
         <Card className="py-10 px-6">
            <CardHeader className="flex flex-col">
                <CardTitle className="text-xl mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>                                                                                                
                </CardTitle>
                {mediaAvailable && 
                    <PostMediaPreview 
                        contentLink={post.content_link}
                        title={post.title}
                />} 
            </CardHeader>                                                                               
            <CardContent>                              
               {post.content && (
                <div className="text-gray-800 leading-relaxed mb-3">
                    <div className="whitespace-pre-wrap break-words text-sm">
                    {expandedContent ? post.content : trimPostContent(post.content)}
                    </div>
                    {showMoreContent && (
                    <button
                        className="mt-2 text-orange-600 underline text-xs"
                        onClick={() => setExpandedContent(v => !v)}
                    >
                        {expandedContent ? "Show less" : "Show more"}
                    </button>
                    )}
                </div>
                )}
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
                    comments={post.comments}
                    open={showComments}
                    setOpen={setShowComments}
                />
            </CardContent>
        </Card>
    )
}