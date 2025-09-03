import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TopicCard() {
    return(
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Hello</CardTitle>
            </CardHeader>
            <CardContent>Hello world</CardContent>
        </Card>
    )
}