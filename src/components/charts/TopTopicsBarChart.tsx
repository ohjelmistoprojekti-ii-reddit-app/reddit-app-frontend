"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import { getTopTopics, TopTopic } from "@/lib/api/getTopTopics"

type Props = {
  subreddit: string
  days?: number
  limit?: number
  palette?: string[] // optionaalinen oma paletti
}

const DEFAULT_PALETTE = ["#4F46E5","#22C55E","#EF4444","#F59E0B","#3B82F6","#8B5CF6","#EC4899"]

export default function TopTopicsBarChart({ subreddit, days = 7, limit = 7, palette = DEFAULT_PALETTE }: Props) {
  const [data, setData] = React.useState<TopTopic[] | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    setError(null)
    setData(null)
    getTopTopics(subreddit, days, limit)
      .then(d => mounted && setData(d))
      .catch(e => mounted && setError(e.message || "Failed to load"))
    return () => { mounted = false }
  }, [subreddit, days, limit])

  const chartData = React.useMemo(
    () => (data ?? []).map(t => ({ name: t.topic, count: t.count })),
    [data]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most popular topics</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-sm text-red-500">Error: {error}</div>}
        {!data && !error && <div className="h-32 animate-pulse rounded-lg bg-muted" />}
        {data && data.length > 0 && (
          <ChartContainer config={{ count: { label: "Posts" } }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} margin={{ left: 12, right: 12, top: 8, bottom: 0 }}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} interval={0} height={60} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} width={40} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="count">
                  {chartData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={palette[i % palette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
        {data && data.length === 0 && !error && <div className="text-sm text-muted-foreground">No data</div>}
      </CardContent>
    </Card>
  )
}
