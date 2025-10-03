"use client"

import { useRouter } from "next/navigation"
import { 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogClose, 
    DialogDescription, 
    DialogHeader, 
    DialogFooter 
} from "@/components/ui/dialog"
import MapDialogContent from "./MapDialogContent";
import { Button } from "@/components/ui/button"
import { MapDialogProps } from "@/types/map.types";

export default function MapDialog({ subredditName, posts }: MapDialogProps) {
    const router = useRouter()
    return(
        <Dialog 
            defaultOpen
            onOpenChange={() => router.back()}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex">
                    <DialogTitle className="text-xl self-center">
                        Top Reddit posts in r/{subredditName}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        Top posts and comments per country listed in dialog box
                    </DialogDescription>
                </DialogHeader>
                <MapDialogContent posts={posts}/>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}