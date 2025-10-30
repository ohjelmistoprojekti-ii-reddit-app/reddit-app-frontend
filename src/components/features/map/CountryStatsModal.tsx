"use client";
import { useState, useMemo } from "react";
import type { CountryTopPost } from "@/types/map.types";
import Modal from "./Modal";
import SentimentChart from "../topic/SentimentChart";
import SentimentStatBox from "./SentimentStatBox";
import PostScoreStatBox from "./PostScoreStatBox";
import PostCard from "./PostCard";
import { getSentimentLabel } from "@/lib/helpers/getSentimentLabel";
import { TrendingUp } from "lucide-react";

interface Props {
  open: boolean;
  countryName: string;
  posts: CountryTopPost[];
  onClose: () => void;
}

export default function CountryStatsModal({ open, onClose, countryName, posts }: Props) {
  const [view, setView] = useState<"stats" | "posts">("stats");
  const items = useMemo(() => posts.slice(0, 3), [posts]);
  const [postIndex, setPostIndex] = useState(0);

  // Calculate average stats from all posts
  const avgStats = useMemo(() => {
    if (!items.length) return null;
    
    const totalScore = items.reduce((sum, p) => sum + p.score, 0);
    const avgScore = Math.round(totalScore / items.length);
    
    const avgCompound = items.reduce((sum, p) => 
      sum + p.sentiment_values.average_compound, 0) / items.length;
    
    const avgPos = items.reduce((sum, p) => 
      sum + p.sentiment_values.average_pos, 0) / items.length;
    const avgNeu = items.reduce((sum, p) => 
      sum + p.sentiment_values.average_neu, 0) / items.length;
    const avgNeg = items.reduce((sum, p) => 
      sum + p.sentiment_values.average_neg, 0) / items.length;

    return {
      score: avgScore,
      compound: avgCompound,
      chartData: [
        { name: "positive", value: avgPos },
        { name: "neutral", value: avgNeu },
        { name: "negative", value: avgNeg },
      ]
    };
  }, [items]);

  const prev = () => setPostIndex(i => (i - 1 + items.length) % items.length);
  const next = () => setPostIndex(i => (i + 1) % items.length);

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="min-h-[500px]">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
            Trending topics in
          </p>
          <h2 className="text-3xl font-bold">r/{countryName}</h2>
        </div>

        {/* Stats View */}
        {view === "stats" && avgStats && (
          <div className="space-y-6">
            {/* Popular Posts Section */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Popular posts today</h3>
              
              {/* First post title preview */}
              <div className="bg-white rounded-xl p-4 mb-4">
                <p className="text-sm font-medium mb-2 line-clamp-2">
                  {items[0]?.title || "No title available"}
                </p>
                <button 
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => setView("posts")}
                >
                  See original
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <PostScoreStatBox 
                  title="score" 
                  content={avgStats.score} 
                  icon={TrendingUp}
                />
                <SentimentStatBox compoundValue={avgStats.compound} />
              </div>

              {/* Sentiment Chart */}
              <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                <div className="w-56 h-56">
                  <SentimentChart data={avgStats.chartData} />
                </div>
              </div>

              {/* Comments indicator */}
              <button 
                className="w-full mt-4 text-center text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2"
                onClick={() => setView("posts")}
              >
                <span>💬</span>
                <span>Comments ({items[0]?.comments?.length || 0})</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors"
                onClick={onClose}
              >
                Previous
              </button>
              <button
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setView("posts")}
              >
                Next
              </button>
            </div>

            <button
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {/* Posts View */}
        {view === "posts" && items.length > 0 && (
          <div className="space-y-4">
            <button
              className="text-sm text-gray-500 hover:text-gray-700 mb-2"
              onClick={() => setView("stats")}
            >
              ← Back to overview
            </button>
            <PostCard 
              post={items[postIndex]} 
              index={postIndex}
              showNavigation={items.length > 1}
              onPrev={prev}
              onNext={next}
              currentIndex={postIndex}
              totalPosts={items.length}
            />
            
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors"
                onClick={() => setView("stats")}
              >
                Previous
              </button>
              <button
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors"
                onClick={() => {
                  if (postIndex < items.length - 1) {
                    next();
                  } else {
                    onClose();
                  }
                }}
              >
                Next
              </button>
            </div>

            <button
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {items.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            For this country posts are not available
          </div>
        )}
      </div>
    </Modal>
  );
}