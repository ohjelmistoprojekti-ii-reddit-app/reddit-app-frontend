"use client"

import { MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CommentSectionProps } from "@/types/map.types";


export default function DialogCommentSection({ comments, open, setOpen }: CommentSectionProps) {
    return(
        <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="flex w-full flex-col mt-4 gap-2"
            >
            <div className="flex items-center">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                        <MessageCircle />
                        <span className="sr-only">Toggle comments</span>
                    </Button>
                </CollapsibleTrigger>
                <div className="text-md font-bold">
                    {`Comments (${comments.length})`}
                </div>
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
                {comments.map((comment, i) => (
                    <Card key={i} className="bg-muted ml-10">
                        <CardContent>{comment}</CardContent>
                    </Card>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}