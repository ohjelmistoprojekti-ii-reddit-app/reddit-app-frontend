import { SentimentValues as TopicSentimentValues } from "@/types/topic.types";
import { CommentSentimentValues as PostSentimentValues } from "@/types/map.types";
import { RedditTopic } from "@/types/topic.types";

export type TopicsSubscriptionData = {
    topic_id: string
    topic: string[]
    label: string
    subreddit: string
    summary: string
    num_posts: number
    sentiment_values: TopicSentimentValues
}

export type TopicCardProps = {
    topic: TopicsSubscriptionData
}

export type PostsProps = {
    post: Post
}

export type TopicsSubcriptionResponse = {
    type: "topics"
    data: RedditTopic[]
}

export type Post = {
    id: string
    title: string
    content: string
    content_link: string
    link: string
    comments: string[]
    num_comments: number
    score: number
    upvote_ratio: number
    sentiment_values: PostSentimentValues
}

export type PostsSubscriptionData = {
    subreddit: string
    posts: Post[]
}

export type PostsSubscriptionReponse = {
    type: "posts"
    data: PostsSubscriptionData[]
}