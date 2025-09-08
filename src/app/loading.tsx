import LoadingTopicCard from "@/components/features/topic/LoadingTopicCard"

export default function LoadingPage() {
    return(
        <div className="flex flex-col items-center w-full p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-10 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
                <LoadingTopicCard key={i} />
                ))}
            </div>
        </div>
    )
}