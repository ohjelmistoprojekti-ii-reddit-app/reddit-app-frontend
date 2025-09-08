"use client";

import { useState } from "react";
import TopicFilter from "./TopicFilter";
import TopicsGrid from "./TopicsGrid";
import { TopicsGridProps, SentimentFilterType } from "@/types/topic.types";

export default function FilterableGrid({ topics } : TopicsGridProps) {
  const [filter, setFilter] = useState<SentimentFilterType>("all");

  const filteredTopics = topics?.filter(t => (filter === "all" ? true : t.sentiment_scores.sentiment === filter)) ?? null

  return (
    <>
      <TopicFilter filter={filter} setFilter={setFilter}/>
      <TopicsGrid topics={filteredTopics}/>
    </>
  );
}