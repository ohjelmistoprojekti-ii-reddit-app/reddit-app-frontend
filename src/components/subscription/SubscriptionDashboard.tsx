import getSubscriptionData from "@/lib/api/getSubscriptionData"
import Loader from "./Loader";
import TopicsGrid from "../features/topic/TopicsGrid";
import PostsDashboard from "./PostsDashboard";

export default function SubscriptionDashboard() {

    const { data, loading, error } = getSubscriptionData();
    
    if(data === null || loading) return <Loader />
    
    if(error) return <p>Error: {error}</p>

    switch (data.type) {
        case "topics":
            
            return(
                <div className="w-full max-w-6xl mx-auto">
                   <TopicsGrid topics={data.data}/> 
                </div>
                
            )
    
        case "posts":

            return (
                <>
                    {data.data.map((subscriptionData, i) => (
                        <PostsDashboard key={i} data={subscriptionData} />
                    ))}
                </>
            )
        default:
            return <p>Unknown response type</p>
    }
}