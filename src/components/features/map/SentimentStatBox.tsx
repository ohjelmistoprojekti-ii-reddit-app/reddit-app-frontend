import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { DynamicIcon } from "lucide-react/dynamic"

export default function SentimentStatBox({ compoundValue }: { compoundValue: number}) {
    const smileyIcon =
    compoundValue >= 0.05
        ? "smile"
        : compoundValue <= -0.05
        ? "frown"
        : "meh"
    const compoundDisplayText =
    compoundValue >= 0.05
        ? "positive"
        : compoundValue <= -0.05
        ? "negative"
        : "neutral"

    return(
         <Card className="grid grid-cols-2 rounded-2xl p-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-accent">
                <DynamicIcon name={smileyIcon} size={48}/>
            </div>
            <div className="flex flex-col items-center">
                <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                    {compoundDisplayText}
                </CardTitle>
                <CardContent className="text-2xl font-bold text-foreground mt-1">
                    {compoundValue}
                </CardContent>
            </div>
        </Card>
    )
}