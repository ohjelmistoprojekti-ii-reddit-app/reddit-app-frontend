"use client"

import useFetchSubscriptionsForCurrentUser from "@/hooks/useFetchSubscriptionsForCurrentUser";
import SubscriptionDashboard from "./SubscriptionDashboard";
import Loader from "./Loader";
import { Card, CardContent } from "@/components/ui/card";
import UnsubscribeButton from "./UnsubscribeButton";
import ErrorMessage from "./ErrorMessage";
import { CircleCheckBig } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubscriptionSection() {

    const router = useRouter();

    const { data, loading, error, notFound } = useFetchSubscriptionsForCurrentUser();

    useEffect(() => {
        if(notFound) {
            router.replace("/subscribe");
        }
    }, [notFound, router])

    if(notFound) return <Loader />;

    if(loading) return <Loader />;

    if(error) return <ErrorMessage msg={error} />;

    if(!data || data.length === 0) return <ErrorMessage msg="No data found" />;

    return(
        <div className="min-h-[70vh] flex flex-col items-center gap-4 md:gap-6 mx-auto p-4 md:p-6">
            <Card className="flex items-center w-full max-w-xl shadow-lg">
                <CardContent className="flex flex-col items-center p-4 md:p-6 space-y-4 w-full">
                    <CircleCheckBig className="text-muted-foreground w-12 h-12 md:w-16 md:h-16"/>
                    <h2 className="text-base md:text-lg">You are subscribed to</h2>
                    <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-primary text-center break-words">{`r/${data[0].subreddit}`}</h1>
                    <p className="text-sm md:text-base text-center">{`Analysis type: ${data[0].analysis_type}`}</p>
                    <UnsubscribeButton />
                </CardContent>
            </Card>
            <div className="w-full">
                <SubscriptionDashboard />
            </div>
        </div>
    )
        
    
}