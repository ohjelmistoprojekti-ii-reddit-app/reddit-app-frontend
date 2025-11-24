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

    const removeWWW = (url: string) => {
        const u = new URL(url);
        u.hostname = u.hostname.replace(/^www\./, "");
        return u.toString();
    }

    const showMoreContent = post.content && post.content.length > 240;
    const mediaAvailable = post.content_link && post.link && removeWWW(post.content_link) !== post.link;

    return(
         <Card className="py-10 px-6 w-full max-w-3xl">
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pt-3 border-t">
                    {post.link && (
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Open on Reddit
                        </a>
                    )}
                </div>
                <div 
                    className="grid lg:grid-cols-2 md:grid-cols-1 place-items-start lg:place-items-center p-6 gap-6 bg-muted rounded-lg overflow-visible">
                    <div className="flex flex-col items-center gap-4 w-full max-w-full">
                        <PostScoreStatBox title="score" content={post.score} icon={TrendingUp}/>
                        <SentimentStatBox compoundValue={post.sentiment_values.average_compound}/>
                    </div>
                    <div className="w-full max-w-[250px] h-[250px] mx-auto">
                        <SentimentChart data={chartData}/>
                    </div>
                </div>
            </CardContent>
            <DialogCommentSection
                comments={post.comments}
                open={showComments}
                setOpen={setShowComments}
            />
        </Card>
    )
}