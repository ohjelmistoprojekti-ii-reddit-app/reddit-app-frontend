"use client";

import { useState } from "react";
import TopicFilter from "./TopicFilter";
import TopicsGrid from "./TopicsGrid";
import { TopicsGridProps, SentimentFilterType } from "@/types/topic.types";
import { getSentimentLabel } from "@/lib/helpers/getSentimentLabel";

export default function FilterableGrid({ topics } : TopicsGridProps) {
  const [filter, setFilter] = useState<SentimentFilterType>("all");

  const filteredTopics = topics?.filter(t => (filter === "all" ? true : getSentimentLabel(t.sentiment_values.average_compound) === filter)) ?? null
  

  return (
    <>
      <TopicFilter filter={filter} setFilter={setFilter}/>
      <TopicsGrid topics={filteredTopics}/>
    </>
  );
}