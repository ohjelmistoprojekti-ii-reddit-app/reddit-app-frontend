"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export default function SubscribeForm({ onStatus }: {
    onStatus: (status: "success" |"notFound" | "error", msg: string) => void
}) {
    const [subreddit, setSubreddit] = useState("");
    const [analysisType, setAnalysisType] = useState("topics");
    const [loading, setLoading] = useState(false);

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

            const res = await fetch(`${BASE_URL}/api/subscriptions/current-user/add/${parsedSubreddit}/${analysisType}`, {
                method: "POST",
                headers
            })

            if (res.status === 404) {
                onStatus("notFound", "Subreddit was not found");
                toast.error("Error subscribing to Subreddit");
                setSubreddit("");
                return
            };

            if (!res.ok) {
                const body = await res.json();
                onStatus("error", body.error || "There was an error.");
                toast.error(`Error: ${body.error}`);
                return
            }

            onStatus("success", "Successfully subscribed to Subreddit");
            toast.success("Subscribed to Subreddit");
            setSubreddit("");
            setAnalysisType("topics");

        } catch (error) {
            onStatus("error", `There was an error`);
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
        </form>
    )
}