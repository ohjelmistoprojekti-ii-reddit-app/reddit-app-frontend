import { getPostsByCountry } from "@/lib/api/getPostsByCountry"
import MapDialog from "@/components/features/map/MapDialog"

export default async function MapDialogPage(
    { searchParams } : { searchParams: Promise<{ country: string }>}) {

    const subredditName = (await searchParams).country

    if (!subredditName) { 
        return null

    } // if no country received as a parameter return null

    const posts = await getPostsByCountry(subredditName); // fetch from REST API

    return(
        <MapDialog 
            subredditName={subredditName}
            posts={posts}
        />
    )
}