import { sortTopicsBySentiment } from "@/lib/helpers/sortTopicsBySentiment";
import { RedditTopic } from "@/types/topic.types";
import { describe, it, expect } from "vitest";

describe('sortTopicsBySentiment', () => {
    const topics: Partial<RedditTopic>[] = [
        { topic_id: 1, sentiment_values: { 
            average_compound: 0.2, average_neg: 10.0, average_neu: 75.0, average_pos: 15.0, comment_count: 50 }},
        { topic_id: 2, sentiment_values: { 
            average_compound: -0.3,  average_neg: 10.0, average_neu: 75.0, average_pos: 15.0, comment_count: 5 }},
        { topic_id: 3, sentiment_values: 
            { average_compound: 0.5, average_neg: 10.0, average_neu: 75.0, average_pos: 15.0, comment_count: 5 }},
        { topic_id: 4, sentiment_values: 
            { average_compound: -0.1, average_neg: 10.0, average_neu: 75.0, average_pos: 15.0, comment_count: 5 }},
    ];
    
    

    it('should return topics unchanged when sortType is "none"', () => {
        const result = sortTopicsBySentiment(topics as RedditTopic[], "none");
        expect(result).toEqual(topics);
    });

    it('should sort topics by positive sentiment', () => {
        const result = sortTopicsBySentiment(topics as RedditTopic[], "positive");
        expect(result.map(t => t.topic_id)).toEqual([3, 1, 4, 2]);
    });

    it('should sort topics by negative sentiment', () => {
        const result = sortTopicsBySentiment(topics as RedditTopic[], "negative");
        expect(result.map(t => t.topic_id)).toEqual([2, 4, 1, 3]);
    });
});