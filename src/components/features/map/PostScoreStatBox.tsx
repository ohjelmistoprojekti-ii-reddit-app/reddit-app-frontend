import { Card, CardTitle, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

type StatCardProps = {
  title: string
  content: React.ReactNode
  icon: LucideIcon
}

const PostScoreStatBox = ({ title, content, icon: Icon }: StatCardProps) => {
  return (
    <Card className="grid grid-cols-2 rounded-2xl p-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-accent">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <div className="flex flex-col items-center">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          {title}
        </CardTitle>
        <CardContent className="text-2xl font-bold text-foreground mt-1">
          {content}
        </CardContent>
      </div>
    </Card>
  )
}

export default PostScoreStatBox