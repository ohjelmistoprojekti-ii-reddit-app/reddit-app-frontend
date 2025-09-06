import TrendingTopics from "@/components/features/topic/TrendingTopics";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold">Hello world</h1>
      <TrendingTopics />
    </div>
  );
}
