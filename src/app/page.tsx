import FilterableGrid from "@/components/features/topic/FilterableGrid";
import { getLatestTopicsDb } from "@/lib/api/getLatestTopicsDb";
import SubredditSelect from "@/components/features/topic/SubredditSelect";
import TimeframeSelect from "@/components/features/topic/TimeFrameSelect";
import { getTimeframeDays } from "@/lib/utils/timeframe";
import EmptyState from "@/components/ui/empty-state";
import PostNumbersLineChart from "@/components/charts/PostNumbersLineChart";
import TopTopicsBarChart from "@/components/charts/TopTopicsBarChart";


export default async function Home(
  { searchParams }: { searchParams: Promise<{ 
    subreddit?: string | string[], 
    category?: string | string[], 
    timeframe?: string | string[]
  }> }
) {
  const params = await searchParams;

  const raw =
    (typeof params.subreddit === "string" && params.subreddit) ||
    (typeof params.category === "string" && params.category) ||
    "programming";

  const subreddit = raw;

  const timeframe = 
    (typeof params.timeframe === "string" && params.timeframe) || 
    "7d";
  
  const days = getTimeframeDays(timeframe);

  let topics = [] as Awaited<ReturnType<typeof getLatestTopicsDb>>;
  let error: string | null = null;

  try {
    topics = await getLatestTopicsDb(subreddit);
    if (!Array.isArray(topics) || topics.length === 0) {
      error = `Posts for "${subreddit}" not found. Try another one!`;
    }
  } catch {
    error = "Post are not availaible. Try later.";
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">
          Trending Topics - {subreddit.charAt(0).toUpperCase() + subreddit.slice(1)}
        </h1>
        <SubredditSelect selected={subreddit} />
      </div>

      {error ? (
        <EmptyState message={error} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium">Analytics</h2>
            <TimeframeSelect selected={timeframe} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PostNumbersLineChart subreddit={subreddit} days={days} />
            <TopTopicsBarChart subreddit={subreddit} days={days} limit={7} />
          </div>
          
          <FilterableGrid topics={topics} />
        </>
      )}
    </div>
  );
}