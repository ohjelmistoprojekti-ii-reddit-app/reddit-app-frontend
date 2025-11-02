import { Card, CardContent } from "@/components/ui/card";
import { Info } from 'lucide-react';
import SubscribeForm from "@/components/subscription/SubscribeForm";

export default function NewSubscriptionPage() {
    return(
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <Card className="flex items-center w-full max-w-xl shadow-lg">
                <CardContent className="flex flex-col items-center p-6 space-y-4">
                    <Info className="text-muted-foreground w-16 h-16"/>
                    <p>You are not subscribed to any Subreddit analysis</p>
                    <h1 className="text-2xl font-bold mb-4 text-primary">Subscribe</h1>
                    <SubscribeForm />
                </CardContent>
            </Card>
        </div>
    )
}