"use client"

import { MapDialogContentProps } from "@/types/map.types"
import MapDialogPost from "./MapDialogPost";

export default function MapDialogContent({ posts }: MapDialogContentProps) {

    if(!posts?.length) return <p className="text-sm text-muted-foreground">No posts found</p>

    return(
        <section className="py-6">
            <div className="container">
                <div className="flex flex-col gap-4">
                    {posts.map((post, i) => (
                        <MapDialogPost
                            key={i} 
                            post={post}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}