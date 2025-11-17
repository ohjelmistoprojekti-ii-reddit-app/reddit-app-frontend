"use client"

import getSubscriptionsForCurrentUser from "@/lib/api/getSubscriptionsForCurrentUser";
import SubscriptionDashboard from "./SubscriptionDashboard";
import Loader from "./Loader";
import { Card, CardContent } from "@/components/ui/card";
import UnsubscribeButton from "./UnsubscribeButton";
import { CircleCheckBig } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function SubscriptionSection() {

    const router = useRouter();

    const { data, loading, error, notFound } = getSubscriptionsForCurrentUser();

    if(notFound) router.replace("/subscribe");

    if(data === null || loading) return <Loader />

    if(error) return <p>Error: {error}</p>

    return(
        <div className="flex flex-col items-center gap-6 mx-auto p-6">
            <Card className="flex items-center w-full max-w-xl shadow-lg">
                <CardContent className="flex flex-col items-center p-6 space-y-4">
                    <CircleCheckBig className="text-muted-foreground w-16 h-16"/>
                    <h2>You are subscribed to</h2>
                    <h1 className="text-2xl font-bold mb-4 text-primary">{`r/${data[0].subreddit}`}</h1>
                    <p>{`Analysis type: ${data[0].analysis_type}`}</p>
                    <UnsubscribeButton />
                </CardContent>
            </Card>
            <SubscriptionDashboard />
        </div>
    )
        
    
}