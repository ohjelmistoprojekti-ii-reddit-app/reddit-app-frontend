"use client"

import { SentimentChartProps } from "@/types/topic.types"
import { Pie, PieChart, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
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
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function SentimentChart({ data }: SentimentChartProps) {
    return (
        <ChartContainer
            config={chartConfig}
            className="w-full aspect-square"
            >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie 
                  data={data} 
                  dataKey="value" 
                  nameKey="name" 
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  cx="50%"
                  cy="50%"
                >
                  {data?.map((entry) => (
                    <Cell 
                      key={entry.name} 
                      fill={chartConfig[entry.name as keyof typeof chartConfig].color} />
                  ))}
                </Pie>
                <ChartLegend 
                    className="flex flex-wrap gap-2 justify-center mt-4" 
                    content={<ChartLegendContent nameKey="name" />}
                />
            </PieChart>
        </ChartContainer>
    )
}