import React from "react";
import { RedditTopic } from "@/types/topic.types";

// Show date when topics were last analyzed
export default function TopicDateInfo({ topics }: { topics: RedditTopic[] | null }) {
  if (!topics || topics.length === 0) {
    return null;
  }

  const analyzedDate = new Date(topics[0].timestamp);
  const formattedDate = analyzedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="text-xs text-gray-500 mt-2 mb-6 text-center">
      Last analyzed on {formattedDate}
    </div>
  );
}