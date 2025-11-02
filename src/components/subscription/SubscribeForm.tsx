"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

function SubredditNotFoundMessage() {
    return(
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-lg font-bold mb-4 text-red-500">Subreddit was not found</h2>
            <p>Try to search for a Subreddit with preferably 1000+ weekly contributions</p>
        </div>
    )
}

export default function SubscribeForm() {
    const [subreddit, setSubreddit] = useState("");
    const [analysisType, setAnalysisType] = useState("topics");
    const [loading, setLoading] = useState(false);
    const [subredditNotFound, setSubredditNotFound] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const parsedSubreddit = subreddit.replace(/\s+/g, " ").trim().toLowerCase();

            const token = localStorage.getItem("access_token");

            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            const res = await fetch(`http://127.0.0.1:5000/subscriptions/current-user/add/${parsedSubreddit}/${analysisType}`, {
                method: "POST",
                headers
            })

            if (res.status === 404) setSubredditNotFound(true);

            if (!res.ok) throw new Error("Failed to subscribe to subreddit");

            toast.success('Successfully subscribed to Subreddit');
            setSubreddit("");
            setAnalysisType("topics");
            setSubredditNotFound(false);

        } catch (error) {
            toast.error("Error subscribing to Subreddit");
        } finally {
            setLoading(false);
        }
    }

    return(
        <form 
            className="flex flex-col w-full gap-8 p-8 rounded-xl bg-muted"
            onSubmit={handleSubmit}
        >
            <div className="space-y-2">
                <Label htmlFor="subreddit">Subreddit name</Label>
                <Input 
                    id="subreddit"
                    placeholder="Enter subreddit..."
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                    required
                />
                {subredditNotFound && <p className="text-red-500">Subreddit not found</p>}
            </div>

            <div className="space-y-2">
                <Label className="mb-4">Analysis type</Label>
                <RadioGroup
                    value={analysisType}
                    onValueChange={setAnalysisType}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="topics" id="topics" />
                        <Label htmlFor="topics">Topics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="posts" id="posts" />
                        <Label htmlFor="posts">Posts</Label>
                    </div>
                </RadioGroup>
            </div>
            
            <Button type="submit" disabled={loading}>
                 {loading ? "Subscribing..." : "Subscribe"}
            </Button>
            {subredditNotFound && <SubredditNotFoundMessage />}
        </form>
    )
}