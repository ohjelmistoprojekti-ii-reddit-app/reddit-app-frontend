"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { TIMEFRAME_OPTIONS } from "@/lib/utils/timeframe"

type Props = {
  selected?: string
}

export default function TimeframeSelect({ selected = "7d" }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("timeframe", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select timeframe" />
      </SelectTrigger>
      <SelectContent>
        {TIMEFRAME_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}