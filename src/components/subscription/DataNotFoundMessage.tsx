import { TriangleAlert } from 'lucide-react';

export default function DataNotFoundMessage() {
    return(
        <main className="min-h-[70vh] flex justify-center px-6 mt-10">
            <div className="flex flex-col items-center max-w-xl w-full text-center">
                <TriangleAlert className="text-muted-foreground w-12 h-12 md:w-14 md:h-14"/>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-6">
                Subreddit analysis not available
                </h1>
                <p className="mt-3 text-gray-600">
                    Please note that Subreddit analysis results may take up to 24 hours after a fresh subscription
                </p>
            </div>
        </main>
    );
}