import { RedditTopic } from "@/types/topic.types"

export type SentimentSortType = "none" | "positive" | "negative"

export function sortTopicsBySentiment(
  topics: RedditTopic[],
  sortType: SentimentSortType
): RedditTopic[] {
  if (sortType === "none") {
    return topics
  }

  const sorted = [...topics].sort((a, b) => {
    const sentimentA = a.sentiment_values.average_compound
    const sentimentB = b.sentiment_values.average_compound

    if (sortType === "positive") {
      // Sort descending (most positive first)
      return sentimentB - sentimentA
    } else {
      // Sort ascending (most negative first)
      return sentimentA - sentimentB
    }
  })

  return sorted
}