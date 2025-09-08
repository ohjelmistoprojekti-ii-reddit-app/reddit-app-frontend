import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function LoadingTopicCard() {
    return(
        <Card className="w-full animate-pulse">
            <CardHeader className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <CardTitle>
                <div className="h-5 w-28 bg-muted rounded-md" /> {/* Fake topic name */}
                </CardTitle>
                <span className="h-5 w-12 bg-muted rounded-md" /> {/* Fake badge */}
            </CardHeader>
            <CardContent>
                <div className="h-20 w-full bg-muted rounded-md" /> {/* Fake content */}
            </CardContent>

            <CardFooter className="text-xs text-gray-500 flex gap-2">
                <div className="h-3 w-20 bg-muted rounded-md" /> {/* Fake posts */}
                <div className="h-3 w-24 bg-muted rounded-md" /> {/* Fake score */}
            </CardFooter>
        </Card>
    )
}