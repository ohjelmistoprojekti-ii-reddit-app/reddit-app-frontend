export type TopicsGridProps = {
  topics: RedditTopic[];
}

export type TopicCardProps = {
  topic: RedditTopic;
}

export type SentimentFilterType = "all" | "positive" | "negative" | "neutral";

export type SentimentFilterProps = {
  filter: SentimentFilterType;
  setFilter: React.Dispatch<React.SetStateAction<SentimentFilterType>>;
}

type Post = {
  comments: string[];
  content: string;
  id: string;
  num_comments: number;
  score: number;
  title: string;
  upvote_ratio: number;
}

export type SentimentValues = {
  average_compound: number;
  average_neg: number;
  average_neu: number;
  average_pos: number;
  comment_count: number;
}

export type RedditTopic = {
  _id: string;
  num_posts: number;
  posts: Post[];
  sentiment_values: SentimentValues;
  topic: string[];
}

type SentimentChartData = {
  name: string;
  value: number;
}

export type SentimentChartProps = {
  data?: SentimentChartData[];
}