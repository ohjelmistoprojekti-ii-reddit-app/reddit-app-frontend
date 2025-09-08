import { NextResponse } from "next/server";

// Demo data with user reactions (ups/downs).
// Justification in the comments for each topic.
const DEMO_TOPICS = [
  { id: 1, 
    name: "nextjs",     
    posts: 124, 
    ups: 860, 
    downs: 120, 
    sentiment_scores: { neg: 0.0, neu: 0.417, pos: 0.583, compound: 0.8393, sentiment: "positive" }
  },  
  { id: 2, 
    name: "typescript", 
    posts: 98,  
    ups: 400, 
    downs: 380,
    sentiment_scores: { neg: 0.12, neu: 0.76, pos: 0.12, compound: 0.0, sentiment: "neutral" }
  },  
  { id: 3, 
    name: "tailwindcss",
    posts: 86,  
    ups: 300, 
    downs: 520,
    sentiment_scores: {  neg: 0.30, neu: 0.60, pos: 0.10, compound: -0.35, sentiment: "negative" }
  },  
  { id: 4, 
    name: "react",      
    posts: 210, 
    ups: 1900, 
    downs: 600,
    sentiment_scores: {  neg: 0.0, neu: 0.417, pos: 0.583, compound: 0.8393, sentiment: "positive" }
  },
  { id: 5, 
    name: "webdev",     
    posts: 65,  
    ups: 120, 
    downs: 100,
    sentiment_scores: {  neg: 0.10, neu: 0.70, pos: 0.20, compound: 0.12, sentiment: "positive" }
  },
];

export async function GET() {
  const EPS = 0.05; // 5% neutrality threshold

  const withScores = DEMO_TOPICS.map(t => {
    const total = Math.max(1, (t.ups ?? 0) + (t.downs ?? 0));
    const net   = (t.ups ?? 0) - (t.downs ?? 0); // Reddit-like "score"
    let velocity = net / total;

    // Suppress noise: treat "neutral" as around zero
    if (Math.abs(velocity) < EPS) velocity = 0;

    // const sentiment =
    //   velocity > 0 ? "positive" :
    //   velocity < 0 ? "negative" :
    //   "neutral";

    return {
      id: t.id,
      name: t.name,
      posts: t.posts,
      velocity,
      score: net,
      sentiment_scores: t.sentiment_scores,
    };
  })
  // By default, sort by score in descending order (as Reddit hotness surrogate)
  .sort((a, b) => b.score - a.score);

  return NextResponse.json({ topics: withScores });
}
