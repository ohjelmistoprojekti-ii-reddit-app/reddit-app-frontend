import { MapDialogContentProps } from "@/types/map.types"
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapDialogContent({ posts }: MapDialogContentProps) {

    if(!posts?.length) return <p className="text-sm text-muted-foreground">No posts found</p>

    return(
        <section className="py-6">
            <div className="container">
                <div className="flex flex-col">
                    {posts?.map((post, i) => (
                        <Card key={i} className="flex flex-col">
                            <CardHeader className="flex flex-col">
                                <CardTitle>{post.post_title}</CardTitle>
                                <div>Score: {post.post_score}</div>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <Card className="flex flex-col bg-muted">
                                    <CardHeader>
                                       <CardTitle>Top comment</CardTitle> 
                                    </CardHeader>
                                    <CardContent>
                                        {post.comment_original}
                                    </CardContent>
                                </Card>
                                <Card className="flex flex-col bg-muted">
                                    <CardHeader>
                                       <CardTitle>App translation</CardTitle> 
                                    </CardHeader>
                                    <CardContent>
                                        {post.comment_eng}
                                    </CardContent>
                                </Card>
                            </CardContent>
                            <Separator className="mt-4 mb-2"/>
                            <CardFooter className="flex justify-evenly">
                                <div>{`Positive: ${post.sentiment_values.sentiment_pos}`}</div>
                                <div>{`Neutral: ${post.sentiment_values.sentiment_neu}`}</div>
                                <div>{`Negative: ${post.sentiment_values.sentiment_neg}`}</div>
                                <div>{`Compound: ${post.sentiment_values.sentiment_compound}`}</div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}