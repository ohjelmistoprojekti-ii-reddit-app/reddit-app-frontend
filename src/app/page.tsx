import FilterableGrid from "@/components/features/topic/FilterableGrid";
import { getLatestTopicsDb } from "@/lib/api/getLatestTopicsDb";

// Tweak for subreddit, type of posts, number of posts limit
export default async function Home() {
  const topics = await getLatestTopicsDb("programming");

  return (
    <div className="flex flex-col items-center w-full p-10">
      <FilterableGrid topics={topics}/>
    </div>
  );
}
