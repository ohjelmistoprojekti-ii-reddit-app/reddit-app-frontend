"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { getPostNumbers, PostNumbersPoint } from "@/lib/api/getPostNumbers"

type Props = {
  subreddit: string
  days?: number
}

export default function PostNumbersLineChart({ subreddit, days = 7 }: Props) {
  const [data, setData] = React.useState<PostNumbersPoint[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    setError(null)
    setData(null)
    getPostNumbers(subreddit, days)
      .then(d => mounted && setData(d))
      .catch(e => mounted && setError(e.message || "Failed to load"))
    return () => { mounted = false }
  }, [subreddit, days])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of posts (last {days} days)</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-sm text-red-500">Error: {error}</div>}
        {!data && !error && <div className="h-32 animate-pulse rounded-lg bg-muted" />}
        {data && data.length > 0 && (
          <ChartContainer config={{ posts: { label: "Posts" } }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data} margin={{ left: 12, right: 12, top: 8, bottom: 0 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis allowDecimals={false} width={40} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent labelKey="day" />} />
                <Line dataKey="posts" type="monotone" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
        {data && data.length === 0 && !error && <div className="text-sm text-muted-foreground">No data</div>}
      </CardContent>
    </Card>
  )
}
