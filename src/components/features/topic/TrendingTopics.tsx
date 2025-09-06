"use client"

import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {useEffect, useState} from "react";

type Topic = {
  name: string;
  posts: number;
  // Now velocity is in the range [-1..1]: <0 — downs dominate, >0 — ups dominate.
  velocity: number; // Reddit-like net score: ups - downs; may be negative.
  score: number;
  sentiment: "positive" | "negative" | "neutral";
};

export default function TrendingTopics() {
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative" | "neutral">("all");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/trending", { cache: "no-store" });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        setTopics(data.topics as Topic[]);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to load trending topics");
        }
      }
    };
    run();
  }, []);

    const filteredTopics = topics?.filter(t => (filter === "all" ? true : t.sentiment === filter)) ?? null

  return (
    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Trending topics</CardTitle>
        <select
            value={filter}
            onChange={e => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
            <option value="neutral">Neutral</option>
          </select>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-sm text-red-600 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        {!topics && !error && (
          <ul className="animate-pulse space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="h-6 bg-gray-200/60 rounded" />
            ))}
          </ul>
        )}
        {filteredTopics && (
          <ul className="divide-y divide-gray-200">
            {filteredTopics.map((t, idx) => {
              const v = t.velocity ?? 0
              const sign = v > 0 ? "↑" : v < 0 ? "↓" : "→"
              const pct = Math.round(Math.abs(v) * 100)
              const badgeClass =
                v > 0
                  ? "text-green-700 border-green-200"
                  : v < 0
                  ? "text-red-700 border-red-200"
                  : "text-gray-600 border-gray-200"

              return (
                <li key={t.name} className="flex items-center gap-4 py-3">
                  <span className="w-6 text-right font-semibold">{idx + 1}.</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/topic/${encodeURIComponent(t.name)}`}
                        className="font-medium hover:underline"
                      >
                        {t.name}
                      </a>
                      <span
                        className={`text-xs rounded px-2 py-0.5 border ${badgeClass}`}
                      >
                        {pct}% {sign}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {t.posts} posts • score {t.score}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
