export type MapDialogProps = {
    subredditName: string
    posts: CountryTopPost[]
}

export type MapDialogContentProps = {
    posts: CountryTopPost[]
}

export type MapDialogPostProps = {
    post: CountryTopPost

}

type CommentSentimentValues = {
    average_compound: number,
    average_neg: number,
    average_neu: number,
    average_pos: number,
}

export type CountryTopPost = {
    title: string
    title_eng: string
    content: string
    content_eng: string
    comments: string[]
    comments_eng: string[]
    score: 1470
    sentiment_values: CommentSentimentValues
}

export type CommentSectionProps = {
    comments: string[]
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}