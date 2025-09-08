"use client";

import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { SentimentFilterProps } from "@/types/topic.types"

export default function TopicFilter({ filter, setFilter}: SentimentFilterProps) {
    return(
        <Select
            value={filter}
            onValueChange={value => setFilter(value as typeof filter)}    
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sentiment" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sentiments</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}