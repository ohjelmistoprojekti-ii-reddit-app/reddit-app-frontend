import TrendingTopics from "@/components/features/topic/TrendingTopics";
import FilterableGrid from "@/components/features/topic/FilterableGrid";
import { getTopics } from "@/lib/api/getTopics";

export default async function Home() {
  const topics = await getTopics();

  return (
    <div className="flex flex-col items-center w-full p-10">
      {/* <TrendingTopics /> */}
      <FilterableGrid topics={topics}/>
    </div>
  );
}
