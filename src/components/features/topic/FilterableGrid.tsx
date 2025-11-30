"use client";

import { useState } from "react";
import TopicFilter from "./TopicFilter";
import TopicsGrid from "./TopicsGrid";
import SentimentSortSelect from "./SentimentSortSelect";
import { TopicsGridProps, SentimentFilterType } from "@/types/topic.types";
import { getSentimentLabel } from "@/lib/helpers/getSentimentLabel";
import { sortTopicsBySentiment, SentimentSortType } from "@/lib/helpers/sortTopicsBySentiment";
import TopicDateInfo from "./TopicDateInfo";

export default function FilterableGrid({ topics } : TopicsGridProps) {
  const [filter, setFilter] = useState<SentimentFilterType>("all");
  const [sortType, setSortType] = useState<SentimentSortType>("none");

  // First filter by sentiment
  const filteredTopics = topics?.filter(t => (filter === "all" ? true : getSentimentLabel(t.sentiment_values.average_compound) === filter)) ?? null;
  
  // Then sort the filtered results
  const sortedAndFilteredTopics = filteredTopics ? sortTopicsBySentiment(filteredTopics, sortType) : null;

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <TopicFilter filter={filter} setFilter={setFilter}/>
        <SentimentSortSelect sortType={sortType} setSortType={setSortType} />
      </div>
      <TopicsGrid topics={sortedAndFilteredTopics}/>
      <TopicDateInfo topics={topics} />
    </>
  );
}