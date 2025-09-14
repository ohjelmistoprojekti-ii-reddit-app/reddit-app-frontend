import FilterableGrid from "@/components/features/topic/FilterableGrid";
// import { getTopics } from "@/lib/api/getTopics";
import { getTopics } from "@/lib/api/getTopics";

// Tweak for subreddit, type of posts, number of posts limit
export default async function Home() {
  const topics = await getTopics("programming", "hot", 100);

  return (
    <div className="flex flex-col items-center w-full p-10">
      <FilterableGrid topics={topics}/>
    </div>
  );
}
