export type Topic = {
  id: number;
  name: string;
  posts: number;
  // Now velocity is in the range [-1..1]: <0 — downs dominate, >0 — ups dominate.
  velocity: number; // Reddit-like net score: ups - downs; may be negative.
  score: number;
  sentiment_scores: {neg: number, neu: number, pos: number, compound: number, sentiment: "positive" | "negative" | "neutral"}
  sentiment: "positive" | "negative" | "neutral";
};

export type TopicsGridProps = {
  topics: Topic[];
}

export type TopicCardProps = {
  topic: Topic;
}

export type SentimentFilterType = "all" | "positive" | "negative" | "neutral";

export type SentimentFilterProps = {
  filter: SentimentFilterType;
  setFilter: React.Dispatch<React.SetStateAction<SentimentFilterType>>;
}