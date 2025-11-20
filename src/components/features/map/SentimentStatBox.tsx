import { Card, CardTitle } from "@/components/ui/card"
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
        ? "Positive"
        : compoundValue <= -0.05
        ? "Negative"
        : "Neutral"

    // Color based on sentiment
    const bgColor = compoundValue >= 0.05 
        ? "bg-green-100"
        : compoundValue <= -0.05
        ? "bg-red-100"
        : "bg-amber-100"

    const iconColor = compoundValue >= 0.05 
        ? "text-green-600"
        : compoundValue <= -0.05
        ? "text-red-600"
        : "text-amber-600"

    return(
         <Card className="flex items-center justify-center rounded-2xl p-6 gap-4">
            <div className={`flex size-20 items-center justify-center rounded-full ${bgColor}`}>
                <DynamicIcon name={smileyIcon} size={40} className={iconColor}/>
            </div>
            <div className="flex flex-col items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                    Overall Sentiment
                </CardTitle>
                <div className="text-2xl font-bold text-foreground mt-1">
                    {compoundDisplayText}
                </div>
            </div>
        </Card>
    )
}