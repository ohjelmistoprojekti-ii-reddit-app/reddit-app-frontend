"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, CheckCircle2Icon, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import SubscribeForm from "@/components/subscription/SubscribeForm";
import { useState } from "react";
import Link from "next/link";

export default function NewSubscriptionPage() {
    const [statusType, setStatusType] = useState<"success" | "notFound" | "error" | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    return(
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-xl mx-auto shadow-lg">
                <CardContent className="flex flex-col items-center p-6 space-y-4">
                    {!statusType && <NotSubscribedMessage />}
                    {statusType === "success" && <SubscribeSuccessMessage />}
                    {statusType === "notFound" && <SubredditNotFoundMessage />}
                    {statusType === "error" && <ErrorMessage msg={message} />}
                    <div className="w-full max-w-md mx-auto">
                        <SubscribeForm 
                        onStatus={(statusType, message) => {
                            setStatusType(statusType);
                            setMessage(message);
                        }}
                    />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


function SubredditNotFoundMessage() {
    return(
        <div className="flex flex-col items-center">
            <AlertCircleIcon className="text-red-500 w-10 h-10"/>
            <Alert className="flex flex-col items-center gap-4 border-none">
                <AlertTitle className="text-red-500">Subreddit was not found</AlertTitle>
                <AlertDescription className="flex flex-col items-center gap-2">
                    <p>Try searching for a Subreddit with</p>
                </AlertDescription>
                <ul className="list-disc list-inside text-center space-y-2">
                    <li>Preferably 1000+ weekly contributions</li>
                </ul>
            </Alert>
        </div>

    );
};

function ErrorMessage({ msg }: { msg: string | null}) {
    return(
        <div className="flex flex-col items-center">
            <AlertCircleIcon className="text-red-500 w-10 h-10"/>
            <Alert className="flex flex-col items-center gap-4 border-none">
                <AlertTitle>There was an error</AlertTitle>
                <AlertDescription>
                    <p>{msg}</p>
                </AlertDescription>
            </Alert>
        </div>
    );
};

function NotSubscribedMessage() {
    return(
        <div className="flex flex-col items-center">
            <Info className="text-muted-foreground w-10 h-10" />
            <Alert className="flex flex-col items-center gap-4 border-none">
                <AlertTitle>You are not subscribed to any Subreddit analysis</AlertTitle>
                <AlertDescription>Subscribe</AlertDescription>
            </Alert>
        </div>
    );
};

function SubscribeSuccessMessage() {
    return(
        <div className="flex flex-col items-center">
            <CheckCircle2Icon className="text-muted-foreground w-10 h-10" />
            <Alert className="flex flex-col items-center gap-4 border-none">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                    Successfully subscribed to a Subreddit analysis
                </AlertDescription>
                <ul className="list-disc list-inside text-center space-y-2">
                    <li>You'll find your analysis in the {" "} 
                        <Link 
                            href="/subscription"
                            className="text-blue-600 hover:underline"
                        >
                            Subscription page
                        </Link>
                    </li>
                    <li>Analysis results may take up to 24 hours after fresh subscription</li>
                </ul>
            </Alert>
        </div>
    )
}