"use client"

import { SentimentChartProps } from "@/types/topic.types"
import { Pie, PieChart, Cell } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A donut chart"

const chartConfig = {
  positive: {
    label: "Positive",
    color: "var(--chart-2)",
  },
  neutral: {
    label: "Neutral",
    color: "var(--chart-3)",
  },
  negative: {
    label: "Negative",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function SentimentChart({ data }: SentimentChartProps) {
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
            >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={60}>
                  {data?.map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={chartConfig[entry.name as keyof typeof chartConfig].color} />
                  ))}
                </Pie>
                <ChartLegend 
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center" 
                    content={<ChartLegendContent nameKey="name" />}
                />
            </PieChart>
        </ChartContainer>
    )
}