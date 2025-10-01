export type MapDialogProps = {
    subredditName: string
    posts: CountryTopPost[]
}

export type MapDialogContentProps= {
    posts: CountryTopPost[]
}

type CommentSentimentValues = {
    sentiment_compound: number,
    sentiment_neg: number,
    sentiment_neu: number,
    sentiment_pos: number,
}

export type CountryTopPost = {
    post_title: string
    comment_original: string
    comment_eng: string
    post_score: 1470
    sentiment_values: CommentSentimentValues
}