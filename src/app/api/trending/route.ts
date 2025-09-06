import { NextResponse } from "next/server";

// Demo data with user reactions (ups/downs).
// Justification in the comments for each topic.
const DEMO_TOPICS = [
  { name: "nextjs",     posts: 124, ups: 860, downs: 120 },  
  { name: "typescript", posts: 98,  ups: 400, downs: 380 },  
  { name: "tailwindcss",posts: 86,  ups: 300, downs: 520 },  
  { name: "react",      posts: 210, ups: 1900, downs: 600 },
  { name: "webdev",     posts: 65,  ups: 120, downs: 100 },
];

export async function GET() {
  const EPS = 0.05; // 5% neutrality threshold

  const withScores = DEMO_TOPICS.map(t => {
    const total = Math.max(1, (t.ups ?? 0) + (t.downs ?? 0));
    const net   = (t.ups ?? 0) - (t.downs ?? 0); // Reddit-like "score"
    let velocity = net / total;

    // Suppress noise: treat "neutral" as around zero
    if (Math.abs(velocity) < EPS) velocity = 0;

    const sentiment =
      velocity > 0 ? "positive" :
      velocity < 0 ? "negative" :
      "neutral";

    return {
      name: t.name,
      posts: t.posts,
      velocity,
      score: net,
      sentiment,
    };
  })
  // By default, sort by score in descending order (as Reddit hotness surrogate)
  .sort((a, b) => b.score - a.score);

  return NextResponse.json({ topics: withScores });
}
