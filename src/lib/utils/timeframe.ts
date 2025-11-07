type TimeframeOption = {
  value: string
  label: string
  days: number
}

export const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { value: "3d", label: "Last 3 days", days: 3 },
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "14d", label: "Last 2 weeks", days: 14 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "60d", label: "Last 2 months", days: 60 },
  { value: "90d", label: "Last 3 months", days: 90 },
]

export function getTimeframeDays(timeframe?: string): number {
  const option = TIMEFRAME_OPTIONS.find((opt) => opt.value === timeframe)
  return option?.days ?? 7
}