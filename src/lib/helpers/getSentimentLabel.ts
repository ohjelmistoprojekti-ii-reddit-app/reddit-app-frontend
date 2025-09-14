import { SentimentFilterType } from "@/types/topic.types";


export const getSentimentLabel = (compound: number): SentimentFilterType =>
    compound >= 0.05 ? "positive" :
    compound <= -0.05 ? "negative" :
    "neutral";  

