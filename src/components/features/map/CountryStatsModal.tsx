"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { CountryTopPost } from "@/types/map.types";
import Modal from "./Modal";
import SentimentChart from "../topic/SentimentChart";
import SentimentStatBox from "./SentimentStatBox";
import PostScoreStatBox from "./PostScoreStatBox";
import PostCard from "./PostCard";
import { TrendingUp, Lock } from "lucide-react";
import { isAuthenticated } from "@/lib/utils/authUtils";

interface Props {
  open: boolean;
  countryName: string;
  posts: CountryTopPost[];
  onClose: () => void;
}

export default function CountryStatsModal({ 
  open, 
  onClose, 
  countryName, 
  posts
}: Props) {
  const [view, setView] = useState<"stats" | "posts">("stats");
  const items = useMemo(() => posts.slice(0, 3), [posts]);
  const [postIndex, setPostIndex] = useState(0);
  const router = useRouter();
  const isLoggedIn = isAuthenticated();

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

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="min-h-[400px] sm:min-h-[500px]">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1">
            Trending topics in
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">r/{countryName}</h2>
        </div>

        {/* Stats View */}
        {view === "stats" && avgStats && items.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            {/* Popular Posts Section */}
            <div className="bg-orange-50 rounded-2xl p-4 sm:p-6">
                <h1 className="text-center font-bold text-xl sm:text-2xl -mt-2 sm:-mt-4 mb-4">
                  Average analysis in country
                </h1>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                <PostScoreStatBox 
                  title="score" 
                  content={avgStats.score} 
                  icon={TrendingUp}
                />
                <SentimentStatBox compoundValue={avgStats.compound} />
              </div>

              {/* Sentiment Chart */}
              <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56">
                  <SentimentChart data={avgStats.chartData} />
                </div>
              </div>

              {/* Comments indicator */}
              <button 
                className="w-full mt-3 sm:mt-4 text-center text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2"
                onClick={() => setView("posts")}
              >
                <span>💬</span>
                <span>Top Posts ({items[0]?.comments?.length || 0})</span>
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
          <div className="space-y-3 sm:space-y-4">
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
            
            <button
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {/* Empty State - Login Required */}
        {items.length === 0 && !isLoggedIn && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full mb-4">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-sm mx-auto">
              You need to be logged in to view trending topics from r/{countryName}
            </p>
            <button 
              onClick={handleLoginRedirect}
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm sm:text-base"
            >
              Log in to continue
            </button>
          </div>
        )}

        {/* Empty State - No Data (when logged in) */}
        {items.length === 0 && isLoggedIn && (
          <div className="text-center text-gray-500 py-8 sm:py-12 px-4">
            <p className="text-base sm:text-lg mb-2">No posts available</p>
            <p className="text-sm">
              Posts from r/{countryName} are not currently available.
              <br />
              Please try again later.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}