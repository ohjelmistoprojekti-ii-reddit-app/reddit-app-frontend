"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SentimentSortType } from "@/lib/helpers/sortTopicsBySentiment"

type SortOption = {
  value: SentimentSortType
  label: string
}

const SORT_OPTIONS: SortOption[] = [
  { value: "none", label: "No sorting" },
  { value: "positive", label: "Most positive first" },
  { value: "negative", label: "Most negative first" },
]

type Props = {
  sortType: SentimentSortType
  setSortType: (sortType: SentimentSortType) => void
}

export default function SentimentSortSelect({ sortType, setSortType }: Props) {
  return (
    <Select value={sortType} onValueChange={setSortType}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by sentiment" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}