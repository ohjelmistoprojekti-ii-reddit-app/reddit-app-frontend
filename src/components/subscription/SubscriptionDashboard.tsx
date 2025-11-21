import useFetchSubscriptionData from "@/hooks/useFetchSubscriptionData";
import Loader from "./Loader";
import TopicsGrid from "../features/topic/TopicsGrid";
import PostsDashboard from "./PostsDashboard";
import DataNotFoundMessage from "./DataNotFoundMessage";
import ErrorMessage from "./ErrorMessage";

export default function SubscriptionDashboard() {

    const { data, loading, error, notFound } = useFetchSubscriptionData();
    
    if(notFound) return <DataNotFoundMessage />
    
    if(loading) return <Loader />
    
    if(error) return <ErrorMessage msg={error}/>

    if(!data) return <ErrorMessage msg="No data found"/>

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